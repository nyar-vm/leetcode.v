import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import {
    DEFAULT_PAGE_SIZE,
    PAGE_SIZE_OPTIONS,
    type BenchFilters,
    type BenchStatus,
    type Difficulty,
    type EnrichedBenchRow,
    type SortKey,
} from "../types/bench";

const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];
const SORT_KEYS: SortKey[] = ["title", "tsRuntimeMs", "vRuntimeMs", "ratio", "difficulty"];

function parseList(value: unknown): string[] {
    if (typeof value !== "string" || !value.trim()) {
        return [];
    }
    return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function parseDifficulty(value: unknown): Difficulty[] {
    return parseList(value).filter((item): item is Difficulty =>
        DIFFICULTIES.includes(item as Difficulty),
    );
}

function parseStatus(value: unknown): BenchStatus {
    const allowed: BenchStatus[] = ["all", "ok", "error", "v-faster", "ts-faster", "missing"];
    if (typeof value === "string" && allowed.includes(value as BenchStatus)) {
        return value as BenchStatus;
    }
    return "all";
}

function parseSort(value: unknown): SortKey {
    if (typeof value === "string" && SORT_KEYS.includes(value as SortKey)) {
        return value as SortKey;
    }
    return "title";
}

function parsePage(value: unknown): number {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 1) {
        return 1;
    }
    return Math.floor(parsed);
}

function parsePageSize(value: unknown): number {
    const parsed = Number(value);
    if (PAGE_SIZE_OPTIONS.includes(parsed as (typeof PAGE_SIZE_OPTIONS)[number])) {
        return parsed;
    }
    return DEFAULT_PAGE_SIZE;
}

function runtimeRatio(row: EnrichedBenchRow): number | null {
    if (row.tsRuntimeMs === null || row.vRuntimeMs === null || row.vRuntimeMs === 0) {
        return null;
    }
    return row.tsRuntimeMs / row.vRuntimeMs;
}

function matchesStatus(row: EnrichedBenchRow, status: BenchStatus): boolean {
    switch (status) {
        case "all":
            return true;
        case "ok":
            return row.error === null;
        case "error":
            return row.error !== null;
        case "missing":
            return row.tsRuntimeMs === null || row.vRuntimeMs === null;
        case "v-faster": {
            const ratio = runtimeRatio(row);
            return ratio !== null && ratio < 1;
        }
        case "ts-faster": {
            const ratio = runtimeRatio(row);
            return ratio !== null && ratio > 1;
        }
        default:
            return true;
    }
}

function difficultyRank(difficulty: string): number {
    switch (difficulty) {
        case "Easy":
            return 0;
        case "Medium":
            return 1;
        case "Hard":
            return 2;
        default:
            return 3;
    }
}

function sortRows(rows: EnrichedBenchRow[], sort: SortKey, sortDesc: boolean): EnrichedBenchRow[] {
    const sorted = [...rows].sort((left, right) => {
        let cmp = 0;
        switch (sort) {
            case "title":
                cmp = left.title.localeCompare(right.title);
                break;
            case "difficulty":
                cmp = difficultyRank(left.difficulty) - difficultyRank(right.difficulty);
                break;
            case "tsRuntimeMs":
                cmp = (left.tsRuntimeMs ?? -1) - (right.tsRuntimeMs ?? -1);
                break;
            case "vRuntimeMs":
                cmp = (left.vRuntimeMs ?? -1) - (right.vRuntimeMs ?? -1);
                break;
            case "ratio": {
                const leftRatio = runtimeRatio(left) ?? -1;
                const rightRatio = runtimeRatio(right) ?? -1;
                cmp = leftRatio - rightRatio;
                break;
            }
        }
        return sortDesc ? -cmp : cmp;
    });
    return sorted;
}

export function filtersFromRoute(route: ReturnType<typeof useRoute>): BenchFilters {
    return {
        query: typeof route.query.q === "string" ? route.query.q : "",
        difficulties: parseDifficulty(route.query.difficulty),
        tags: parseList(route.query.tag),
        status: parseStatus(route.query.status),
        sort: parseSort(route.query.sort),
        sortDesc: route.query.desc === "1",
        page: parsePage(route.query.page),
        pageSize: parsePageSize(route.query.size),
    };
}

export function useBenchFilters(rows: () => EnrichedBenchRow[]) {
    const route = useRoute();
    const router = useRouter();

    const filters = computed(() => filtersFromRoute(route));

    function updateQuery(patch: Partial<Record<string, string | undefined>>) {
        router.replace({
            query: {
                ...route.query,
                ...patch,
            },
        });
    }

    function resetPagePatch(): { page: undefined } {
        return { page: undefined };
    }

    function setQuery(value: string) {
        updateQuery({ q: value || undefined, ...resetPagePatch() });
    }

    function toggleDifficulty(difficulty: Difficulty) {
        const current = new Set(filters.value.difficulties);
        if (current.has(difficulty)) {
            current.delete(difficulty);
        } else {
            current.add(difficulty);
        }
        const next = [...current];
        updateQuery({ difficulty: next.length ? next.join(",") : undefined, ...resetPagePatch() });
    }

    function toggleTag(tag: string) {
        const current = new Set(filters.value.tags);
        if (current.has(tag)) {
            current.delete(tag);
        } else {
            current.add(tag);
        }
        const next = [...current];
        updateQuery({ tag: next.length ? next.join(",") : undefined, ...resetPagePatch() });
    }

    function setStatus(status: BenchStatus) {
        updateQuery({ status: status === "all" ? undefined : status, ...resetPagePatch() });
    }

    function setSort(sort: SortKey) {
        if (filters.value.sort === sort) {
            updateQuery({ desc: filters.value.sortDesc ? undefined : "1", ...resetPagePatch() });
            return;
        }
        updateQuery({ sort, desc: undefined, ...resetPagePatch() });
    }

    function setPage(page: number) {
        const next = Math.max(1, page);
        updateQuery({ page: next <= 1 ? undefined : String(next) });
    }

    function setPageSize(pageSize: number) {
        updateQuery({
            size: pageSize === DEFAULT_PAGE_SIZE ? undefined : String(pageSize),
            ...resetPagePatch(),
        });
    }

    function clearFilters() {
        router.replace({ query: {} });
    }

    const filteredRows = computed(() => {
        const query = filters.value.query.trim().toLowerCase();
        let result = rows().filter((row) => {
            if (query) {
                const haystack = `${row.title} ${row.id}`.toLowerCase();
                if (!haystack.includes(query)) {
                    return false;
                }
            }
            if (
                filters.value.difficulties.length > 0 &&
                !filters.value.difficulties.includes(row.difficulty as Difficulty)
            ) {
                return false;
            }
            if (filters.value.tags.length > 0 && !filters.value.tags.some((tag) => row.tags.includes(tag))) {
                return false;
            }
            return matchesStatus(row, filters.value.status);
        });
        return sortRows(result, filters.value.sort, filters.value.sortDesc);
    });

    const pagination = computed(() => {
        const total = filteredRows.value.length;
        const pageSize = filters.value.pageSize;
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        const page = Math.min(filters.value.page, totalPages);
        const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
        const end = Math.min(page * pageSize, total);
        return { total, pageSize, totalPages, page, start, end };
    });

    const paginatedRows = computed(() => {
        const { page, pageSize } = pagination.value;
        const offset = (page - 1) * pageSize;
        return filteredRows.value.slice(offset, offset + pageSize);
    });

    const activeFilterCount = computed(() => {
        let count = 0;
        if (filters.value.query.trim()) count += 1;
        if (filters.value.difficulties.length) count += 1;
        if (filters.value.tags.length) count += 1;
        if (filters.value.status !== "all") count += 1;
        return count;
    });

    watch(
        () => [filteredRows.value.length, filters.value.page, filters.value.pageSize] as const,
        () => {
            if (filters.value.page > pagination.value.totalPages) {
                setPage(pagination.value.totalPages);
            }
        },
    );

    return {
        filters,
        filteredRows,
        paginatedRows,
        pagination,
        activeFilterCount,
        setQuery,
        toggleDifficulty,
        toggleTag,
        setStatus,
        setSort,
        setPage,
        setPageSize,
        clearFilters,
    };
}
