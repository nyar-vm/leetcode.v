<script setup lang="ts">
defineProps<{
    difficulty: string;
}>();
</script>

<template>
    <span class="badge" :class="difficulty.toLowerCase()">{{ difficulty }}</span>
</template>
