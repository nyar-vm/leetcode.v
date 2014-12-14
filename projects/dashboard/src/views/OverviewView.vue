<script setup lang="ts">
import {
    ArrowRight,
    CheckCircle2,
    LayoutList,
    Sparkles,
    Target,
    Trophy,
    Users,
    XCircle,
} from "@lucide/vue";
import { computed, defineAsyncComponent } from "vue";

import AppIcon from "../components/AppIcon.vue";
import EmptyState from "../components/EmptyState.vue";
import LanguageScoreboard from "../components/LanguageScoreboard.vue";
import StatCard from "../components/StatCard.vue";
import { useBenchReport } from "../composables/useBenchReport";
import { enrichBenchRows } from "../composables/useProblemCatalog";
import { formatMs } from "../utils/format";
import {
    comparableRowCount,
    computeLanguageStats,
    leadingLanguage,
    RUNTIME_LANGUAGES,
} from "../utils/languageStats";

const OverviewCharts = defineAsyncComponent(() => import("../components/OverviewCharts.vue"));

const { report, rowCount, errorCount, okCount } = useBenchReport();

const rows = computed(() => enrichBenchRows(report.value?.rows ?? []));
const languageStats = computed(() => computeLanguageStats(rows.value));
const comparableCount = computed(() => comparableRowCount(rows.value));
const leader = computed(() => leadingLanguage(languageStats.value));

const leaderLabel = computed(() => {
    if (!leader.value) {
        return "—";
    }
    return `${leader.value.label} · ${leader.value.winCount}`;
});
</script>

<template>
    <EmptyState
        v-if="!report"
        title="暂无基准快照"
        description="看板合并 benchmark-python.json、benchmark-typescript.json 与 benchmark-valkyrie.json。本地可先跑 pnpm bench，再刷新页面。"
    />

    <template v-else>
        <section class="stat-grid">
            <StatCard label="题目数" :value="rowCount" hint="当前批次" :icon="LayoutList" />
            <StatCard label="通过" :value="okCount" tone="success" hint="无 error 字段" :icon="CheckCircle2" />
            <StatCard label="失败" :value="errorCount" tone="danger" hint="含编译或运行错误" :icon="XCircle" />
            <StatCard
                label="可竞技样本"
                :value="comparableCount"
                hint="至少两种语言有有效计时"
                :icon="Users"
            />
            <StatCard
                label="领跑语言"
                :value="leaderLabel"
                tone="success"
                hint="第一名次数最多"
                :icon="Trophy"
            />
            <StatCard label="Target" :value="report.benchTarget" hint="Valkyrie bench 目标" :icon="Target" />
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
                    <p class="row-meta">{{ row.id }}</p>
                    <div class="sample-metrics">
                        <span
                            v-for="language in RUNTIME_LANGUAGES"
                            :key="language.id"
                            class="sample-metric"
                            :style="{ '--lang-color': language.color }"
                        >
                            {{ language.label }} {{ formatMs(language.readRuntime(row)) }}
                        </span>
                    </div>
                </article>
            </div>
        </section>
    </template>
</template>
