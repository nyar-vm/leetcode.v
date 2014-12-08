<script setup lang="ts">
import { useBenchReport } from "../composables/useBenchReport";
import { formatDate } from "../utils/format";

const { isLocalDev, loading, report, statusText, runBench } = useBenchReport();
</script>

<template>
    <header class="topbar">
        <div>
            <h1 class="page-title">
                <slot name="title" />
            </h1>
            <p v-if="$slots.subtitle" class="page-subtitle">
                <slot name="subtitle" />
            </p>
        </div>

        <div class="topbar-actions">
            <div class="status-pill" :class="{ ready: report?.ready }">
                <span class="dot" />
                <span>{{ report?.ready ? "快照就绪" : "快照未就绪" }}</span>
            </div>
            <button v-if="isLocalDev" class="btn primary" :disabled="loading" @click="runBench">
                {{ loading ? "运行中…" : "本地重跑基准" }}
            </button>
        </div>
    </header>

    <p class="status-line">
        {{ statusText }}
        <template v-if="report?.generatedAt"> · {{ formatDate(report.generatedAt) }}</template>
        <template v-if="!isLocalDev"> · 静态发布</template>
    </p>
</template>
