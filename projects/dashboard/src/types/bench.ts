export type BenchRow = {
    id: string;
    title: string;
    questionId?: number;
    difficulty?: string;
    tags?: string[];
    tsRuntimeMs: number | null;
    vCompileMs: number | null;
    vRuntimeMs: number | null;
    legionRoute: string | null;
    benchTarget: string;
    error: string | null;
};

export type BenchReport = {
    generatedAt: string;
    ready: boolean;
    benchTarget: string;
    catalogTotal?: number;
    rows: BenchRow[];
};

export type EnrichedBenchRow = BenchRow & {
    questionId: number;
    difficulty: string;
    tags: string[];
};

export type Difficulty = "Easy" | "Medium" | "Hard";

export type BenchStatus = "all" | "ok" | "error" | "v-faster" | "ts-faster" | "missing";

export type SortKey = "title" | "tsRuntimeMs" | "vRuntimeMs" | "ratio" | "difficulty";

export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

export type BenchFilters = {
    query: string;
    difficulties: Difficulty[];
    tags: string[];
    status: BenchStatus;
    sort: SortKey;
    sortDesc: boolean;
    page: number;
    pageSize: number;
};
