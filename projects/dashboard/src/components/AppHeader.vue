<script setup lang="ts">
import { AlertCircle, CheckCircle2 } from "@lucide/vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

import { useBenchReport } from "../composables/useBenchReport";
import { enrichBenchRow } from "../composables/useProblemCatalog";
import { formatDate } from "../utils/format";
import AppIcon from "./AppIcon.vue";

const route = useRoute();
const { report, statusText } = useBenchReport();

const pageTitle = computed(() => {
    if (route.name === "problem") {
        const id = String(route.params.id);
        const row = report.value?.rows.find((item) => item.id === id);
        return row ? enrichBenchRow(row).title : id;
    }
    return typeof route.meta.title === "string" ? route.meta.title : "看板";
});

const pageSubtitle = computed(() =>
    typeof route.meta.subtitle === "string" ? route.meta.subtitle : "",
);
</script>

<template>
    <header class="app-header">
        <div class="app-header-main">
            <h1 class="page-title">{{ pageTitle }}</h1>
            <p v-if="pageSubtitle" class="page-subtitle">{{ pageSubtitle }}</p>
            <p class="status-line">
                {{ statusText }}
                <template v-if="report?.generatedAt"> · {{ formatDate(report.generatedAt) }}</template>
            </p>
        </div>

        <div class="app-header-actions">
            <div class="status-pill" :class="{ ready: report?.ready }">
                <AppIcon
                    :icon="report?.ready ? CheckCircle2 : AlertCircle"
                    :size="16"
                    :stroke-width="2.25"
                />
                <span>{{ report?.ready ? "快照就绪" : "快照未就绪" }}</span>
            </div>
        </div>
    </header>
</template>
