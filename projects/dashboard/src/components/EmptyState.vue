<script setup lang="ts">
import { Database } from "@lucide/vue";

import AppIcon from "./AppIcon.vue";

defineProps<{
    title: string;
    description: string;
}>();
</script>

<template>
    <section class="empty-state">
        <div class="empty-icon-wrap">
            <AppIcon :icon="Database" :size="28" :stroke-width="1.75" />
        </div>
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
    </section>
</template>
