<script setup lang="ts">
import { ChevronLeft, ChevronRight, Rows3 } from '@lucide/vue';
import { computed } from 'vue';

import { PAGE_SIZE_OPTIONS } from '../types/bench';
import AppIcon from './AppIcon.vue';

const props = defineProps<{
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    start: number;
    end: number;
}>();

const emit = defineEmits<{
    'update:page': [value: number];
    'update:pageSize': [value: number];
}>();

const pageItems = computed(() => {
    const { page, totalPages } = props;
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const items = new Set<number>([1, totalPages, page]);
    if (page > 1) items.add(page - 1);
    if (page < totalPages) items.add(page + 1);
    if (page > 2) items.add(page - 2);
    if (page < totalPages - 1) items.add(page + 2);

    const sorted = [...items].sort((left, right) => left - right);
    const result: Array<number | 'gap'> = [];
    for (let index = 0; index < sorted.length; index += 1) {
        const current = sorted[index];
        const previous = sorted[index - 1];
        if (index > 0 && current - previous > 1) {
            result.push('gap');
        }
        result.push(current);
    }
    return result;
});
</script>

<template>
    <nav v-if="total > 0" class="table-pagination" aria-label="表格分页">
        <p class="pagination-summary muted">
            <AppIcon :icon="Rows3" :size="15" />
            <span>显示 {{ start }}–{{ end }} / {{ total }}</span>
        </p>

        <div class="pagination-controls">
            <label class="page-size">
                <span class="muted">每页</span>
                <select
                    :value="pageSize"
                    @change="emit('update:pageSize', Number(($event.target as HTMLSelectElement).value))"
                >
                    <option v-for="size in PAGE_SIZE_OPTIONS" :key="size" :value="size">
                        {{ size }}
                    </option>
                </select>
            </label>

            <button class="btn ghost icon-btn" :disabled="page <= 1" @click="emit('update:page', page - 1)">
                <AppIcon :icon="ChevronLeft" :size="16" />
                <span>上一页</span>
            </button>

            <div class="page-list">
                <template v-for="(item, index) in pageItems" :key="`${item}-${index}`">
                    <span v-if="item === 'gap'" class="page-gap">…</span>
                    <button
                        v-else
                        class="page-btn"
                        :class="{ active: item === page }"
                        @click="emit('update:page', item)"
                    >
                        {{ item }}
                    </button>
                </template>
            </div>

            <button
                class="btn ghost icon-btn"
                :disabled="page >= totalPages"
                @click="emit('update:page', page + 1)"
            >
                <span>下一页</span>
                <AppIcon :icon="ChevronRight" :size="16" />
            </button>
        </div>
    </nav>
</template>
