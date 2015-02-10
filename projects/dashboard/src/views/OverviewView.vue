<script setup lang="ts">
import { ArrowRight, Cog, LayoutList, Sparkles, Timer, Trophy, Users, XCircle } from '@lucide/vue';
import { computed, defineAsyncComponent } from 'vue';

import AppIcon from '../components/AppIcon.vue';
import EmptyState from '../components/EmptyState.vue';
import LanguageScoreboard from '../components/LanguageScoreboard.vue';
import StatCard from '../components/StatCard.vue';
import { useBenchReport } from '../composables/useBenchReport';
import { enrichBenchRows } from '../composables/useProblemCatalog';
import { formatMs } from '../utils/format';
import {
    comparableRowCount,
    computeLanguageStats,
    leadingLanguage,
    RUNTIME_RANK_LABELS,
    sumCompileMs,
    sumRuntimeMs,
    topRuntimesForRow,
} from '../utils/languageStats';

const OverviewCharts = defineAsyncComponent(() => import('../components/OverviewCharts.vue'));

const { report, rowCount, errorCount } = useBenchReport();

const rows = computed(() => enrichBenchRows(report.value?.rows ?? []));
const languageStats = computed(() => computeLanguageStats(rows.value));
const comparableCount = computed(() => comparableRowCount(rows.value));
const leader = computed(() => leadingLanguage(languageStats.value));
const compileDuration = computed(() => {
    const ms = sumCompileMs(rows.value);
    return ms === null ? '—' : `${formatMs(ms)} ms`;
});
const runtimeDuration = computed(() => {
    const ms = sumRuntimeMs(rows.value);
    return ms === null ? '—' : `${formatMs(ms)} ms`;
});

const leaderLabel = computed(() => {
    if (!leader.value) {
        return '—';
    }
    return `${leader.value.label} · ${leader.value.winCount}`;
});
</script>

<template>
    <EmptyState
        v-if="!report"
        title="暂无数据"
        description="请先运行 pnpm bench 生成基准结果，然后刷新页面。"
    />

    <template v-else>
        <section class="stat-grid">
            <StatCard label="题目数量" :value="rowCount" hint="当前批次" :icon="LayoutList" />
            <StatCard
                label="错误数量"
                :value="errorCount"
                tone="danger"
                hint="含编译或运行错误"
                :icon="XCircle"
            />
            <StatCard
                label="有效对比"
                :value="comparableCount"
                hint="至少两种语言有有效计时"
                :icon="Users"
            />
            <StatCard label="编译时长" :value="compileDuration" hint="V 编译总和" :icon="Cog" />
            <StatCard label="运行时长" :value="runtimeDuration" hint="全语言运行总和" :icon="Timer" />
            <StatCard
                label="最佳语言"
                :value="leaderLabel"
                tone="success"
                hint="胜场最多"
                :icon="Trophy"
            />
        </section>

        <LanguageScoreboard :rows="rows" />

        <OverviewCharts :rows="rows" />

        <section class="panel">
            <div class="panel-head">
                <h2 class="panel-title">
                    <AppIcon :icon="Sparkles" :size="18" />
                    <span>样本预览</span>
                </h2>
                <RouterLink class="text-link icon-link" to="/benchmarks">
                    <span>打开全量对比</span>
                    <AppIcon :icon="ArrowRight" :size="14" />
                </RouterLink>
            </div>
            <div class="sample-grid">
                <article v-for="row in rows.slice(0, 6)" :key="row.id" class="sample-card">
                    <RouterLink :to="`/problems/${row.id}`" class="sample-title">{{ row.title }}</RouterLink>
                    <p class="row-meta sample-slug">{{ row.id }}</p>
                    <div v-if="topRuntimesForRow(row).length" class="sample-metrics">
                        <span
                            v-for="item in topRuntimesForRow(row)"
                            :key="item.id"
                            class="sample-metric"
                            :class="`sample-metric--rank-${item.rank}`"
                            :style="{ '--lang-color': item.color }"
                        >
                            <span class="sample-metric-rank">{{ RUNTIME_RANK_LABELS[item.rank] }}</span>
                            <span class="sample-metric-label">{{ item.label }}</span>
                            <strong>{{ formatMs(item.ms) }}</strong>
                        </span>
                    </div>
                    <p v-else class="muted sample-empty">暂无有效运行数据</p>
                </article>
            </div>
        </section>
    </template>
</template>
