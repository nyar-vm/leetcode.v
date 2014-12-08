<script setup lang="ts">
import { computed } from "vue";

import {
    difficultyBreakdown,
    ratioBars,
    scatterPoints,
    statusBreakdown,
    tsRuntimeBars,
} from "../charts/data";
import {
    difficultyBarSpec,
    ratioBarSpec,
    scatterSpec,
    statusDonutSpec,
    tsRuntimeBarSpec,
} from "../charts/specs";
import type { EnrichedBenchRow } from "../types/bench";
import VegaChart from "./VegaChart.vue";

const props = defineProps<{
    rows: EnrichedBenchRow[];
}>();

const statusSpec = computed(() => statusDonutSpec(statusBreakdown(props.rows)));
const difficultySpec = computed(() => difficultyBarSpec(difficultyBreakdown(props.rows)));
const scatterChartSpec = computed(() => scatterSpec(scatterPoints(props.rows)));
const tsRuntimeSpec = computed(() => tsRuntimeBarSpec(tsRuntimeBars(props.rows)));
const ratioSpec = computed(() => ratioBarSpec(ratioBars(props.rows)));
</script>

<template>
    <section class="chart-section">
        <div class="panel-head">
            <h2>可视化</h2>
        </div>

        <div class="chart-grid">
            <article class="panel chart-panel compact">
                <VegaChart :spec="statusSpec" />
            </article>
            <article class="panel chart-panel">
                <VegaChart :spec="difficultySpec" />
            </article>
            <article v-if="scatterChartSpec" class="panel chart-panel wide">
                <VegaChart :spec="scatterChartSpec" />
            </article>
            <article v-if="tsRuntimeSpec" class="panel chart-panel wide">
                <VegaChart :spec="tsRuntimeSpec" />
            </article>
            <article v-if="ratioSpec" class="panel chart-panel wide">
                <VegaChart :spec="ratioSpec" />
            </article>
        </div>
    </section>
</template>
