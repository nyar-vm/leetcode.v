<script setup lang="ts">
import { ArrowDown, ArrowUp, ArrowUpDown } from "@lucide/vue";

import type { EnrichedBenchRow, SortKey } from "../types/bench";
import { formatMs, ratioLabel, runtimeRatio } from "../utils/format";
import AppIcon from "./AppIcon.vue";
import DifficultyBadge from "./DifficultyBadge.vue";

const props = defineProps<{
    rows: EnrichedBenchRow[];
    sort: SortKey;
    sortDesc: boolean;
}>();

const emit = defineEmits<{
    sort: [key: SortKey];
}>();

const columns: { key: SortKey; label: string; align?: "right" }[] = [
    { key: "id", label: "题目" },
    { key: "difficulty", label: "难度" },
    { key: "pyRuntimeMs", label: "Python (ms)", align: "right" },
    { key: "tsRuntimeMs", label: "TS (ms)", align: "right" },
    { key: "vRuntimeMs", label: "V (wasm) (ms)", align: "right" },
    { key: "ratio", label: "TS / V", align: "right" },
];

function sortIcon(key: SortKey) {
    if (props.sort !== key) {
        return ArrowUpDown;
    }
    return props.sortDesc ? ArrowDown : ArrowUp;
}

function ratioClass(row: EnrichedBenchRow): string {
    const ratio = runtimeRatio(row);
    if (ratio === null) return "";
    if (ratio < 1) return "v-win";
    if (ratio > 1) return "ts-win";
    return "";
}
</script>

<template>
    <div class="table-shell">
        <table>
            <thead>
                <tr>
                    <th
                        v-for="column in columns"
                        :key="column.key"
                        :class="{ num: column.align === 'right', sortable: true, active: sort === column.key }"
                        @click="emit('sort', column.key)"
                    >
                        <span class="th-label">{{ column.label }}</span>
                        <AppIcon class="sort-icon" :icon="sortIcon(column.key)" :size="13" />
                    </th>
                    <th>备注</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="rows.length === 0">
                    <td colspan="7" class="empty-cell">没有匹配的题目，试试放宽筛选条件。</td>
                </tr>
                <tr v-for="row in rows" :key="row.id">
                    <td>
                        <RouterLink class="row-link" :to="`/problems/${row.id}`">
                            <strong>{{ row.title }}</strong>
                        </RouterLink>
                        <div class="row-meta">
                            <span>#{{ row.questionId || "—" }}</span>
                            <span>{{ row.id }}</span>
                        </div>
                    </td>
                    <td>
                        <DifficultyBadge :difficulty="row.difficulty" />
                    </td>
                    <td class="num">{{ formatMs(row.pyRuntimeMs) }}</td>
                    <td class="num">{{ formatMs(row.tsRuntimeMs) }}</td>
                    <td class="num">
                        <div>{{ formatMs(row.vRuntimeMs) }}</div>
                        <div class="row-meta">编译 {{ formatMs(row.vCompileMs) }}</div>
                    </td>
                    <td class="num ratio" :class="ratioClass(row)">{{ ratioLabel(row) }}</td>
                    <td>
                        <div v-if="row.legionRoute || row.benchTarget" class="row-meta">
                            <span v-if="row.legionRoute">route {{ row.legionRoute }}</span>
                            <span v-if="row.benchTarget">target {{ row.benchTarget }}</span>
                        </div>
                        <details v-if="row.error" class="error-details">
                            <summary>查看错误详情</summary>
                            <div class="error">{{ row.error }}</div>
                        </details>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
