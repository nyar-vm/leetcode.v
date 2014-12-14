<script setup lang="ts">
import { BarChart3 } from "@lucide/vue";
import { computed } from "vue";

import { languageLogSamples, languageWinCounts, statusBreakdown } from "../charts/data";
import {
    languageEcdfSpec,
    languageViolinSpec,
    languageWinBarSpec,
    statusDonutSpec,
} from "../charts/specs";
import { useTheme } from "../composables/useTheme";
import type { EnrichedBenchRow } from "../types/bench";
import AppIcon from "./AppIcon.vue";
import VegaChart from "./VegaChart.vue";

const { theme } = useTheme();

const props = defineProps<{
    rows: EnrichedBenchRow[];
}>();

const statusSpec = computed(() => statusDonutSpec(statusBreakdown(props.rows), theme.value));
const winSpec = computed(() => languageWinBarSpec(languageWinCounts(props.rows), theme.value));
const samples = computed(() => languageLogSamples(props.rows));
const violinSpec = computed(() => languageViolinSpec(samples.value, theme.value));
const ecdfSpec = computed(() => languageEcdfSpec(samples.value, theme.value));
</script>

<template>
    <section class="chart-section">
        <div class="panel-head">
            <h2 class="panel-title">
                <AppIcon :icon="BarChart3" :size="18" />
                <span>多语言可视化</span>
            </h2>
            <p class="muted chart-note">Violin 看密度形状，ECDF 看「快于某耗时的题目占比」；圆点为单题样本</p>
        </div>

        <div class="chart-grid-overview">
            <article class="panel chart-panel chart-panel-donut">
                <VegaChart :spec="statusSpec" />
            </article>
            <article v-if="winSpec" class="panel chart-panel chart-panel-bar">
                <VegaChart :spec="winSpec" />
            </article>
            <article v-if="violinSpec" class="panel chart-panel chart-panel-violin">
                <VegaChart :spec="violinSpec" />
            </article>
            <article v-if="ecdfSpec" class="panel chart-panel chart-panel-ecdf">
                <VegaChart :spec="ecdfSpec" />
            </article>
        </div>
    </section>
</template>
