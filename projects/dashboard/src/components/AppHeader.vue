<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import { useBenchReport } from "../composables/useBenchReport";
import { enrichBenchRow } from "../composables/useProblemCatalog";

const route = useRoute();
const { report } = useBenchReport();

const pageTitle = computed(() => {
    if (route.name === "problem") {
        const id = String(route.params.id);
        const row = report.value?.rows.find((item) => item.id === id);
        return row ? enrichBenchRow(row).title : id;
    }
    return typeof route.meta.title === "string" ? route.meta.title : "看板";
});

const pageSubtitle = computed(() => (typeof route.meta.subtitle === "string" ? route.meta.subtitle : ""));
</script>

<template>
    <header class="app-header">
        <div class="app-header-main">
            <h1 class="page-title">{{ pageTitle }}</h1>
            <p v-if="pageSubtitle" class="page-subtitle">{{ pageSubtitle }}</p>
        </div>
    </header>
</template>
