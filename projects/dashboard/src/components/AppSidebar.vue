<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const navItems = [
    { to: "/", label: "概览", icon: "◈" },
    { to: "/benchmarks", label: "基准对比", icon: "▤" },
];

const activePath = computed(() => route.path);
</script>

<template>
    <aside class="sidebar">
        <div class="brand">
            <div class="brand-mark">V</div>
            <div>
                <p class="brand-title">LeetCode Bench</p>
                <p class="brand-sub">TypeScript vs Valkyrie</p>
            </div>
        </div>

        <nav class="nav">
            <RouterLink
                v-for="item in navItems"
                :key="item.to"
                :to="item.to"
                class="nav-link"
                :class="{ active: activePath === item.to || activePath.startsWith(`${item.to}/`) }"
            >
                <span class="nav-icon" aria-hidden="true">{{ item.icon }}</span>
                <span>{{ item.label }}</span>
            </RouterLink>
        </nav>

        <div class="sidebar-foot">
            <p>完备性矩阵外部基准</p>
            <p class="muted">静态快照 · TypeScript vs Wasm</p>
        </div>
    </aside>
</template>
