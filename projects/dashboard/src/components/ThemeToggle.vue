<script setup lang="ts">
import { Moon, Sun } from "@lucide/vue";
import { computed } from "vue";

import { useTheme } from "../composables/useTheme";
import AppIcon from "./AppIcon.vue";

const { theme, toggleTheme } = useTheme();

const label = computed(() => (theme.value === "dark" ? "浅色模式" : "深色模式"));
const icon = computed(() => (theme.value === "dark" ? Sun : Moon));
</script>

<template>
    <button class="theme-toggle btn ghost icon-btn" type="button" @click="toggleTheme">
        <AppIcon :icon="icon" :size="16" />
        <span>{{ label }}</span>
    </button>
</template>
