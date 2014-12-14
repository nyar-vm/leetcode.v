<script setup lang="ts">
import { computed } from "vue";

import BenchTable from "../components/BenchTable.vue";
import EmptyState from "../components/EmptyState.vue";
import FilterPanel from "../components/FilterPanel.vue";
import TablePagination from "../components/TablePagination.vue";
import { useBenchReport } from "../composables/useBenchReport";
import { useBenchFilters } from "../composables/useBenchFilters";
import { allTags, enrichBenchRows } from "../composables/useProblemCatalog";

const { report } = useBenchReport();

const enrichedRows = computed(() => enrichBenchRows(report.value?.rows ?? []));
const availableTags = computed(() => allTags(enrichedRows.value));

const {
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
} = useBenchFilters(() => enrichedRows.value, "ts-v");
</script>

<template>
    <EmptyState
        v-if="!report"
        title="暂无基准快照"
        description="快照就绪后，可在此聚焦 TypeScript 与 Valkyrie Wasm 运行时间对比。"
    />

    <div v-else class="benchmark-layout">
        <FilterPanel
            variant="ts-v"
            :query="filters.query"
            :difficulties="['Easy', 'Medium', 'Hard']"
            :selected-difficulties="filters.difficulties"
            :tags="availableTags"
            :selected-tags="filters.tags"
            :status="filters.status"
            :result-count="filteredRows.length"
            :total-count="enrichedRows.length"
            :active-filter-count="activeFilterCount"
            @update:query="setQuery"
            @toggle-difficulty="toggleDifficulty"
            @toggle-tag="toggleTag"
            @set-status="setStatus"
            @clear="clearFilters"
        />

        <div class="table-stack">
            <BenchTable
                :rows="paginatedRows"
                :sort="filters.sort"
                :sort-desc="filters.sortDesc"
                @sort="setSort"
            />
            <TablePagination
                :page="pagination.page"
                :page-size="pagination.pageSize"
                :total="pagination.total"
                :total-pages="pagination.totalPages"
                :start="pagination.start"
                :end="pagination.end"
                @update:page="setPage"
                @update:page-size="setPageSize"
            />
        </div>
    </div>
</template>
