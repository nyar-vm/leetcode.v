<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

type BenchRow = {
    id: string;
    title: string;
    tsRuntimeMs: number | null;
    vCompileMs: number | null;
    vRuntimeMs: number | null;
    legionRoute: string | null;
    benchTarget: string;
    error: string | null;
};

type BenchReport = {
    generatedAt: string;
    ready: boolean;
    benchTarget: string;
    rows: BenchRow[];
};

const loading = ref(false);
const report = ref<BenchReport | null>(null);
const statusText = ref("加载缓存结果…");

function formatMs(value: number | null): string {
    if (value === null || Number.isNaN(value)) {
        return "—";
    }
    return value < 1 ? value.toFixed(3) : value.toFixed(2);
}

function ratio(row: BenchRow): string {
    if (row.tsRuntimeMs === null || row.vRuntimeMs === null || row.vRuntimeMs === 0) {
        return "—";
    }
    return `${(row.tsRuntimeMs / row.vRuntimeMs).toFixed(2)}×`;
}

const rows = computed(() => report.value?.rows ?? []);

async function loadCached() {
    try {
        const res = await fetch("/benchmark-results.json");
        if (res.ok) {
            report.value = (await res.json()) as BenchReport;
            statusText.value = `缓存于 ${report.value.generatedAt} · target ${report.value.benchTarget}`;
        }
    } catch {
        statusText.value = "无缓存，请点击运行基准";
    }
}

async function runBench() {
    loading.value = true;
    statusText.value = "运行中（TS 参考解 + legion bench → Wasm）…";
    try {
        const res = await fetch("/api/bench");
        if (!res.ok) {
            throw new Error(await res.text());
        }
        report.value = (await res.json()) as BenchReport;
        statusText.value = `完成于 ${report.value.generatedAt} · legion ${report.value.ready ? "就绪" : "未就绪"} · target ${report.value.benchTarget}`;
    } catch (err) {
        statusText.value = `失败：${String(err)}`;
    } finally {
        loading.value = false;
    }
}

onMounted(loadCached);
</script>

<template>
    <header>
        <h1>LeetCode 完备性 · TypeScript vs Valkyrie Wasm</h1>
        <p class="subtitle">
            TS：同算法参考解 median 毫秒（Node）。V：<code>legion bench -t node</code> = 编译为 Wasm + Wasm 运行
            <code>[benchmark]</code> 的 median。
        </p>
    </header>

    <div class="toolbar">
        <button :disabled="loading" @click="runBench">{{ loading ? "运行中…" : "重新运行基准" }}</button>
        <span class="status">{{ statusText }}</span>
    </div>

    <table v-if="rows.length">
        <thead>
            <tr>
                <th>题目</th>
                <th>TS 参考解 (ms)</th>
                <th>V 编译→Wasm (ms)</th>
                <th>V Wasm 运行 (ms)</th>
                <th>TS / V</th>
                <th>备注</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in rows" :key="row.id">
                <td>
                    <strong>{{ row.title }}</strong>
                    <div class="status">{{ row.id }}</div>
                </td>
                <td class="num">{{ formatMs(row.tsRuntimeMs) }}</td>
                <td class="num">{{ formatMs(row.vCompileMs) }}</td>
                <td class="num">{{ formatMs(row.vRuntimeMs) }}</td>
                <td class="num ratio">{{ ratio(row) }}</td>
                <td>
                    <span v-if="row.legionRoute" class="status">route: {{ row.legionRoute }}</span>
                    <span v-if="row.benchTarget" class="status">target: {{ row.benchTarget }}</span>
                    <div v-if="row.error" class="error">{{ row.error }}</div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
