<script setup lang="ts">
import { onMounted } from "vue";

import AppHeader from "./components/AppHeader.vue";
import AppSidebar from "./components/AppSidebar.vue";
import { provideBenchReport } from "./composables/useBenchReport";
import { provideTheme } from "./composables/useTheme";

provideTheme();
const { loadCached } = provideBenchReport();

onMounted(loadCached);
</script>

<template>
    <div class="app-shell">
        <AppSidebar />
        <div class="content-shell">
            <AppHeader />
            <main class="main">
                <RouterView />
            </main>
        </div>
    </div>
</template>
