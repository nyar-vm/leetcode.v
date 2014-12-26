<script setup lang="ts">
import { Trophy } from "@lucide/vue";
import { computed } from "vue";

import type { EnrichedBenchRow } from "../types/bench";
import { formatMs } from "../utils/format";
import {
    computeLanguageStats,
    formatLogMs,
    leadingLanguage,
} from "../utils/languageStats";
import AppIcon from "./AppIcon.vue";

const props = defineProps<{
    rows: EnrichedBenchRow[];
}>();

const stats = computed(() => computeLanguageStats(props.rows));
const leader = computed(() => leadingLanguage(stats.value));
</script>

<template>
    <section class="panel scoreboard-panel">
        <div class="panel-head">
            <h2 class="panel-title">
                <AppIcon :icon="Trophy" :size="18" />
                <span>语言综合成绩</span>
            </h2>
            <p v-if="leader" class="muted leader-hint">
                第一名最多：<strong>{{ leader.label }}</strong>（{{ leader.winCount }} 题）
            </p>
            <p v-else class="muted leader-hint">暂无足够多语言样本决出最佳语言</p>
        </div>

        <div class="table-shell scoreboard-table">
            <table>
                <thead>
                    <tr>
                        <th>语言</th>
                        <th class="num">有效样本</th>
                        <th class="num">第一名</th>
                        <th class="num">平均 log(ms)</th>
                        <th class="num">中位 log(ms)</th>
                        <th class="num">几何均值 (ms)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in stats" :key="item.id">
                        <td>
                            <span class="lang-chip" :style="{ '--lang-color': item.color }">{{ item.label }}</span>
                        </td>
                        <td class="num">{{ item.sampleCount }}</td>
                        <td class="num" :class="{ 'tone-success': leader?.id === item.id }">{{ item.winCount }}</td>
                        <td class="num">{{ formatLogMs(item.avgLogMs) }}</td>
                        <td class="num">{{ formatLogMs(item.medianLogMs) }}</td>
                        <td class="num">{{ item.geoMeanMs === null ? "—" : formatMs(item.geoMeanMs) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>
