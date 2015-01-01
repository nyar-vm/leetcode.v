<script setup lang="ts">
import { Filter, Search, SlidersHorizontal, Tag, X } from "@lucide/vue";

import { computed } from "vue";

import type { BenchFilterMode, BenchStatus, Difficulty } from "../types/bench";
import AppIcon from "./AppIcon.vue";

const props = withDefaults(
    defineProps<{
        variant?: BenchFilterMode;
        query: string;
        difficulties: Difficulty[];
        selectedDifficulties: Difficulty[];
        tags: string[];
        selectedTags: string[];
        status: BenchStatus;
        resultCount: number;
        totalCount: number;
        activeFilterCount: number;
    }>(),
    {
        variant: "ts-v",
    },
);

const emit = defineEmits<{
    "update:query": [value: string];
    toggleDifficulty: [value: Difficulty];
    toggleTag: [value: string];
    setStatus: [value: BenchStatus];
    clear: [];
}>();

const difficultyOptions: Difficulty[] = ["Easy", "Medium", "Hard"];

const statusOptions = computed(() => {
    if (props.variant === "full") {
        return [
            { value: "all" as BenchStatus, label: "全部" },
            { value: "ok" as BenchStatus, label: "无错误" },
            { value: "error" as BenchStatus, label: "有错误" },
            { value: "missing" as BenchStatus, label: "缺计时" },
        ];
    }
    return [
        { value: "all" as BenchStatus, label: "全部" },
        { value: "ok" as BenchStatus, label: "无错误" },
        { value: "error" as BenchStatus, label: "有错误" },
        { value: "v-faster" as BenchStatus, label: "V 更快" },
        { value: "ts-faster" as BenchStatus, label: "TS 更快" },
        { value: "missing" as BenchStatus, label: "缺数据" },
    ];
});
</script>

<template>
    <section class="filter-panel">
        <div class="filter-head">
            <div>
                <h2 class="panel-title">
                    <AppIcon :icon="SlidersHorizontal" :size="17" />
                    <span>筛选</span>
                </h2>
                <p class="muted">结果 {{ resultCount }} / {{ totalCount }}</p>
            </div>
            <button v-if="activeFilterCount > 0" class="btn ghost icon-btn" @click="emit('clear')">
                <AppIcon :icon="X" :size="15" />
                <span>清除 {{ activeFilterCount }} 项</span>
            </button>
        </div>

        <label class="field">
            <span class="field-label">
                <AppIcon :icon="Search" :size="14" />
                <span>搜索题目</span>
            </span>
            <input
                :value="query"
                type="search"
                placeholder="标题或 slug…"
                @input="emit('update:query', ($event.target as HTMLInputElement).value)"
            />
        </label>

        <div class="field">
            <span class="field-label">
                <AppIcon :icon="Filter" :size="14" />
                <span>难度</span>
            </span>
            <div class="chip-row">
                <button
                    v-for="difficulty in difficultyOptions"
                    :key="difficulty"
                    class="chip"
                    :class="{ active: selectedDifficulties.includes(difficulty) }"
                    @click="emit('toggleDifficulty', difficulty)"
                >
                    {{ difficulty }}
                </button>
            </div>
        </div>

        <div v-if="tags.length" class="field">
            <span class="field-label">
                <AppIcon :icon="Tag" :size="14" />
                <span>标签</span>
            </span>
            <div class="chip-row wrap">
                <button
                    v-for="tag in tags"
                    :key="tag"
                    class="chip tag"
                    :class="{ active: selectedTags.includes(tag) }"
                    @click="emit('toggleTag', tag)"
                >
                    {{ tag }}
                </button>
            </div>
        </div>

        <label class="field">
            <span class="field-label">
                <AppIcon :icon="Filter" :size="14" />
                <span>状态</span>
            </span>
            <select :value="status" @change="emit('setStatus', ($event.target as HTMLSelectElement).value as BenchStatus)">
                <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </label>
    </section>
</template>
