<script setup lang="ts">
import type { BenchStatus, Difficulty } from "../types/bench";

defineProps<{
    query: string;
    difficulties: Difficulty[];
    selectedDifficulties: Difficulty[];
    tags: string[];
    selectedTags: string[];
    status: BenchStatus;
    resultCount: number;
    totalCount: number;
    activeFilterCount: number;
}>();

const emit = defineEmits<{
    "update:query": [value: string];
    toggleDifficulty: [value: Difficulty];
    toggleTag: [value: string];
    setStatus: [value: BenchStatus];
    clear: [];
}>();

const difficultyOptions: Difficulty[] = ["Easy", "Medium", "Hard"];

const statusOptions: { value: BenchStatus; label: string }[] = [
    { value: "all", label: "全部" },
    { value: "ok", label: "无错误" },
    { value: "error", label: "有错误" },
    { value: "v-faster", label: "V 更快" },
    { value: "ts-faster", label: "TS 更快" },
    { value: "missing", label: "缺数据" },
];
</script>

<template>
    <section class="filter-panel">
        <div class="filter-head">
            <div>
                <h2>筛选</h2>
                <p class="muted">结果 {{ resultCount }} / {{ totalCount }}</p>
            </div>
            <button v-if="activeFilterCount > 0" class="btn ghost" @click="emit('clear')">
                清除 {{ activeFilterCount }} 项
            </button>
        </div>

        <label class="field">
            <span class="field-label">搜索题目</span>
            <input
                :value="query"
                type="search"
                placeholder="标题或 slug…"
                @input="emit('update:query', ($event.target as HTMLInputElement).value)"
            />
        </label>

        <div class="field">
            <span class="field-label">难度</span>
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
            <span class="field-label">标签</span>
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
            <span class="field-label">状态</span>
            <select :value="status" @change="emit('setStatus', ($event.target as HTMLSelectElement).value as BenchStatus)">
                <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </label>
    </section>
</template>
