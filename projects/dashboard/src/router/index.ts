import { createRouter, createWebHistory } from "vue-router";

import BenchmarksFullView from "../views/BenchmarksFullView.vue";
import BenchmarksTsVView from "../views/BenchmarksTsVView.vue";
import LanguageEnvironmentView from "../views/LanguageEnvironmentView.vue";
import OverviewView from "../views/OverviewView.vue";
import ProblemDetailView from "../views/ProblemDetailView.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "overview",
            component: OverviewView,
            meta: {
                title: "概览",
                subtitle: "Python、TypeScript、V Wasm 多语言综合成绩与 log 耗时分布",
            },
        },
        {
            path: "/benchmarks",
            name: "benchmarks-full",
            component: BenchmarksFullView,
            meta: {
                title: "全量对比",
                subtitle: "Python、TypeScript、V 编译与 Wasm 运行时间同表竞技，支持筛选与下钻。",
            },
        },
        {
            path: "/benchmarks/ts-v",
            name: "benchmarks-ts-v",
            component: BenchmarksTsVView,
            meta: {
                title: "V / TypeScript 对比",
                subtitle: "聚焦 TS 与 V Wasm 运行时间、比值与编译耗时。",
            },
        },
        {
            path: "/environment",
            name: "environment",
            component: LanguageEnvironmentView,
            meta: {
                title: "语言环境",
                subtitle: "各语言工具链版本、外部 harness 计时参数与跑测宿主信息。",
            },
        },
        {
            path: "/problems/:id",
            name: "problem",
            component: ProblemDetailView,
            meta: {
                title: "题目详情",
                subtitle: "单题基准详情与 LeetCode 外链",
            },
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
