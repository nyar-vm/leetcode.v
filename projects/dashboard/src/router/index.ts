import { createRouter, createWebHistory } from "vue-router";

import BenchmarksView from "../views/BenchmarksView.vue";
import OverviewView from "../views/OverviewView.vue";
import ProblemDetailView from "../views/ProblemDetailView.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "overview",
            component: OverviewView,
            meta: { title: "概览" },
        },
        {
            path: "/benchmarks",
            name: "benchmarks",
            component: BenchmarksView,
            meta: { title: "基准对比" },
        },
        {
            path: "/problems/:id",
            name: "problem",
            component: ProblemDetailView,
            meta: { title: "题目详情" },
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: "/",
        },
    ],
    scrollBehavior() {
        return { top: 0 };
    },
});

router.afterEach((to) => {
    const label = typeof to.meta.title === "string" ? to.meta.title : "看板";
    document.title = `${label} · LeetCode Bench`;
});
