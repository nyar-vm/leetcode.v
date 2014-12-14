<script setup lang="ts">
defineProps<{
    html: string;
}>();
</script>

<template>
    <div class="markdown-body" v-html="html" />
</template>
