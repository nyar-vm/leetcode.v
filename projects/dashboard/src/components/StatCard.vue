<script setup lang="ts">
import type { Component } from "vue";

import AppIcon from "./AppIcon.vue";

defineProps<{
    label: string;
    value: string | number;
    hint?: string;
    tone?: "default" | "success" | "warning" | "danger";
    icon?: Component;
}>();
</script>

<template>
    <article class="stat-card" :class="tone ?? 'default'">
        <div class="stat-head">
            <AppIcon v-if="icon" class="stat-icon" :icon="icon" :size="17" />
            <p class="stat-label">{{ label }}</p>
        </div>
        <p class="stat-value">{{ value }}</p>
        <p v-if="hint" class="stat-hint">{{ hint }}</p>
    </article>
</template>
