<script setup lang="ts">
import { BarChart3 } from '@lucide/vue';
import { computed } from 'vue';

import { languageLogSamples, languageWinCounts, statusBreakdown } from '../charts/data';
import { languageWinBarOption, statusDonutOption } from '../charts/specs';
import { useTheme } from '../composables/useTheme';
import type { EnrichedBenchRow } from '../types/bench';
import { RUNTIME_LANGUAGES } from '../utils/languageStats';
import AppIcon from './AppIcon.vue';
import EChart from './EChart.vue';

const { theme } = useTheme();
const props = defineProps<{ rows: EnrichedBenchRow[] }>();

const statusOption = computed(() => statusDonutOption(statusBreakdown(props.rows), theme.value));
const winOption = computed(() => languageWinBarOption(languageWinCounts(props.rows), theme.value));
const samples = computed(() => languageLogSamples(props.rows));

const domain = computed(() => {
    const values = samples.value.map((sample) => Math.log10(sample.runtimeMs));
    const min = Math.floor(Math.min(...values, -1));
    const max = Math.ceil(Math.max(...values, 1));
    return { min, max: Math.max(max, min + 1) };
});

const ticks = computed(() =>
    Array.from({ length: domain.value.max - domain.value.min + 1 }, (_, index) => {
        const power = domain.value.min + index;
        return {
            label: `${10 ** power} ms`,
            left: `${(index / (domain.value.max - domain.value.min)) * 100}%`,
        };
    }),
);

function position(ms: number): string {
    const { min, max } = domain.value;
    return `${((Math.log10(ms) - min) / (max - min)) * 100}%`;
}

function median(values: number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function mean(values: number[]): number {
    return values.reduce((sum, value) => sum + value, 0) / values.length;
}

const lanes = computed(() =>
    RUNTIME_LANGUAGES.map((language) => {
        const points = samples.value.filter((sample) => sample.language === language.label);
        const runtimes = points.map((point) => point.runtimeMs);
        return {
            ...language,
            points,
            medianMs: runtimes.length ? median(runtimes) : null,
            meanMs: runtimes.length ? mean(runtimes) : null,
        };
    }),
);
</script>

<template>
    <section class="chart-section">
        <div class="panel-head">
            <h2 class="panel-title">
                <AppIcon :icon="BarChart3" :size="18" />
                <span>多语言可视化</span>
            </h2>
            <p class="muted chart-note">每个点代表一道题的运行耗时。</p>
        </div>

        <div class="chart-blocks">
            <div class="chart-block">
                <h3 class="chart-block-title">批次概览</h3>
                <div class="chart-grid-summary">
                    <article class="panel chart-panel chart-panel-donut">
                        <EChart :option="statusOption" height="280px" />
                    </article>
                    <article v-if="winOption" class="panel chart-panel chart-panel-bar">
                        <EChart :option="winOption" height="280px" />
                    </article>
                </div>
            </div>

            <div class="chart-block">
                <div class="panel-head distribution-head">
                    <div>
                        <h3 class="chart-block-title">运行耗时分布</h3>
                        <p class="muted chart-note">横轴为对数刻度，等间距表示耗时相差 10 倍。</p>
                    </div>
                    <div class="distribution-keys">
                        <span class="muted distribution-key"><i class="key-median"></i> 中位数</span>
                        <span class="muted distribution-key"><i class="key-mean"></i> 平均数</span>
                    </div>
                </div>
                <article class="panel distribution-panel">
                    <div v-if="samples.length" class="log-plot">
                        <div v-for="lane in lanes" :key="lane.id" class="log-lane">
                            <div class="log-lane-label">
                                <span class="lang-chip" :style="{ '--lang-color': lane.color }">{{ lane.label }}</span>
                                <small>{{ lane.points.length }} 个样本</small>
                            </div>
                            <div class="log-track">
                                <span v-for="tick in ticks" :key="tick.label" class="log-gridline" :style="{ left: tick.left }"></span>
                                <span
                                    v-if="lane.meanMs !== null"
                                    class="log-mean"
                                    :style="{ left: position(lane.meanMs), '--lang-color': lane.color }"
                                    :title="`平均数 ${lane.meanMs.toPrecision(3)} ms`"
                                ></span>
                                <span
                                    v-if="lane.medianMs !== null"
                                    class="log-median"
                                    :style="{ left: position(lane.medianMs), '--lang-color': lane.color }"
                                    :title="`中位数 ${lane.medianMs.toPrecision(3)} ms`"
                                ></span>
                                <span
                                    v-for="point in lane.points"
                                    :key="point.id"
                                    class="log-point"
                                    :style="{ left: position(point.runtimeMs), top: `${50 + point.jitter * 2}%`, '--lang-color': lane.color }"
                                    :title="`${point.title} · ${point.runtimeMs.toPrecision(3)} ms`"
                                ></span>
                                <span v-if="!lane.points.length" class="log-no-data">暂无运行计时</span>
                            </div>
                            <div class="log-lane-value">
                                <span>中位 {{ lane.medianMs === null ? "—" : `${lane.medianMs.toPrecision(3)} ms` }}</span>
                                <span class="muted">平均 {{ lane.meanMs === null ? "—" : `${lane.meanMs.toPrecision(3)} ms` }}</span>
                            </div>
                        </div>
                        <div class="log-axis">
                            <span v-for="tick in ticks" :key="tick.label" :style="{ left: tick.left }">{{ tick.label }}</span>
                        </div>
                    </div>
                    <p v-else class="muted log-empty">当前批次暂无有效运行耗时。</p>
                </article>
            </div>
        </div>
    </section>
</template>
