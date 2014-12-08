<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";

import AppTopBar from "../components/AppTopBar.vue";
import EmptyState from "../components/EmptyState.vue";
import StatCard from "../components/StatCard.vue";

const OverviewCharts = defineAsyncComponent(() => import("../components/OverviewCharts.vue"));
import { useBenchReport } from "../composables/useBenchReport";
import { enrichBenchRows } from "../composables/useProblemCatalog";
import { formatMs, runtimeRatio } from "../utils/format";

const { report, rowCount, errorCount, okCount } = useBenchReport();

const rows = computed(() => enrichBenchRows(report.value?.rows ?? []));

const avgRatio = computed(() => {
    const ratios = rows.value
        .map((row) => runtimeRatio(row))
        .filter((value): value is number => value !== null);
    if (!ratios.length) return "—";
    const avg = ratios.reduce((sum, value) => sum + value, 0) / ratios.length;
    return `${avg.toFixed(2)}×`;
});

const vFasterCount = computed(
    () => rows.value.filter((row) => (runtimeRatio(row) ?? 0) < 1).length,
);

const leaders = computed(() =>
    [...rows.value]
        .filter((row) => runtimeRatio(row) !== null)
        .sort((left, right) => (runtimeRatio(left) ?? 0) - (runtimeRatio(right) ?? 0))
        .slice(0, 5),
);

const laggards = computed(() =>
    [...rows.value]
        .filter((row) => runtimeRatio(row) !== null)
        .sort((left, right) => (runtimeRatio(right) ?? 0) - (runtimeRatio(left) ?? 0))
        .slice(0, 5),
);
</script>

<template>
    <AppTopBar>
        <template #title>概览</template>
        <template #subtitle>外部基准快照与 TypeScript / Valkyrie Wasm 对比摘要</template>
    </AppTopBar>

    <EmptyState
        v-if="!report"
        title="暂无基准快照"
        description="发布构建应包含 benchmark-results.json。本地开发请先执行 pnpm bench，再刷新页面。"
    />

    <template v-else>
        <section class="stat-grid">
            <StatCard label="题目数" :value="rowCount" hint="当前批次" />
            <StatCard label="通过" :value="okCount" tone="success" hint="无 error 字段" />
            <StatCard label="失败" :value="errorCount" tone="danger" hint="含编译或运行错误" />
            <StatCard label="平均 TS/V" :value="avgRatio" hint="越小表示 V 越快" />
            <StatCard label="V 更快" :value="vFasterCount" tone="success" hint="ratio &lt; 1" />
            <StatCard label="Target" :value="report.benchTarget" hint="legion bench 目标" />
        </section>

        <OverviewCharts :rows="rows" />

        <section class="split-panels">
            <article class="panel">
                <div class="panel-head">
                    <h2>V 领先</h2>
                    <RouterLink class="text-link" to="/benchmarks?status=v-faster">查看全部</RouterLink>
                </div>
                <ul class="leader-list">
                    <li v-for="row in leaders" :key="row.id">
                        <RouterLink :to="`/problems/${row.id}`">{{ row.title }}</RouterLink>
                        <span class="ratio v-win">{{ (runtimeRatio(row) ?? 0).toFixed(2) }}×</span>
                    </li>
                    <li v-if="!leaders.length" class="muted">暂无可用计时数据</li>
                </ul>
            </article>

            <article class="panel">
                <div class="panel-head">
                    <h2>TS 领先</h2>
                    <RouterLink class="text-link" to="/benchmarks?status=ts-faster">查看全部</RouterLink>
                </div>
                <ul class="leader-list">
                    <li v-for="row in laggards" :key="row.id">
                        <RouterLink :to="`/problems/${row.id}`">{{ row.title }}</RouterLink>
                        <span class="ratio ts-win">{{ (runtimeRatio(row) ?? 0).toFixed(2) }}×</span>
                    </li>
                    <li v-if="!laggards.length" class="muted">暂无可用计时数据</li>
                </ul>
            </article>
        </section>

        <section class="panel">
            <div class="panel-head">
                <h2>最近样本</h2>
                <RouterLink class="text-link" to="/benchmarks">打开完整表格</RouterLink>
            </div>
            <div class="sample-grid">
                <article v-for="row in rows.slice(0, 6)" :key="row.id" class="sample-card">
                    <RouterLink :to="`/problems/${row.id}`" class="sample-title">{{ row.title }}</RouterLink>
                    <p class="row-meta">{{ row.id }}</p>
                    <div class="sample-metrics">
                        <span>TS {{ formatMs(row.tsRuntimeMs) }}</span>
                        <span>V {{ formatMs(row.vRuntimeMs) }}</span>
                    </div>
                </article>
            </div>
        </section>
    </template>
</template>
