<script setup lang="ts">
import { onMounted } from "vue";

import AppSidebar from "./components/AppSidebar.vue";
import { provideBenchReport } from "./composables/useBenchReport";

const { loadCached } = provideBenchReport();

onMounted(loadCached);
</script>

<template>
    <div class="app-shell">
        <AppSidebar />
        <main class="main">
            <RouterView />
        </main>
    </div>
</template>
