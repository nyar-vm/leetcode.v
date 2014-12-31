<script setup lang="ts">
import type { EChartsOption } from "echarts";
import { computed } from "vue";
import VChart from "vue-echarts";

import { registerEcharts } from "../charts/register";

registerEcharts();

const props = withDefaults(
    defineProps<{
        option: EChartsOption | null;
        height?: string;
    }>(),
    {
        height: "280px",
    },
);

const style = computed(() => ({ height: props.height, width: "100%" }));
</script>

<template>
    <div class="echart-wrap">
        <div v-if="!option" class="echart-empty muted">暂无可用数据</div>
        <VChart v-else class="echart-canvas" :option="option" autoresize :style="style" />
    </div>
</template>
