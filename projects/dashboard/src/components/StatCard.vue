<script setup lang="ts">
defineProps<{
    label: string;
    value: string | number;
    hint?: string;
    tone?: "default" | "success" | "warning" | "danger";
}>();
</script>

<template>
    <article class="stat-card" :class="tone ?? 'default'">
        <p class="stat-label">{{ label }}</p>
        <p class="stat-value">{{ value }}</p>
        <p v-if="hint" class="stat-hint">{{ hint }}</p>
    </article>
</template>
