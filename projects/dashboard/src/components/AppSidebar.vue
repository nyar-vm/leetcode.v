<script setup lang="ts">
import { ArrowLeftRight, Gauge, LayoutDashboard, Server, Table2 } from "@lucide/vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

import AppIcon from "./AppIcon.vue";
import ThemeToggle from "./ThemeToggle.vue";

const route = useRoute();

const navItems = [
    { to: "/", label: "概览", icon: LayoutDashboard, exact: true },
    { to: "/benchmarks", label: "全量对比", icon: Table2, exact: true },
    { to: "/benchmarks/ts-v", label: "V / TS 对比", icon: ArrowLeftRight, exact: true },
    { to: "/environment", label: "语言环境", icon: Server, exact: true },
];

const activePath = computed(() => route.path);

function isActive(item: { to: string; exact?: boolean }) {
    if (item.exact) {
        return activePath.value === item.to;
    }
    return activePath.value === item.to || activePath.value.startsWith(`${item.to}/`);
}
</script>

<template>
    <aside class="sidebar">
        <div class="brand">
            <div class="brand-mark">
                <AppIcon :icon="Gauge" :size="22" :stroke-width="2.25" />
            </div>
            <div>
                <p class="brand-title">LeetCode Bench</p>
                <p class="brand-sub">Python · TS · V (wasm)</p>
            </div>
        </div>

        <nav class="nav">
            <RouterLink
                v-for="item in navItems"
                :key="item.to"
                :to="item.to"
                class="nav-link"
                :class="{ active: isActive(item) }"
            >
                <AppIcon class="nav-icon" :icon="item.icon" :size="18" />
                <span>{{ item.label }}</span>
            </RouterLink>
        </nav>

        <div class="sidebar-foot">
            <ThemeToggle />
        </div>
    </aside>
</template>
