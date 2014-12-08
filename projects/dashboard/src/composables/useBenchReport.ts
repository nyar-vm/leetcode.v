import { computed, inject, provide, ref, type InjectionKey } from "vue";

import { benchmarkDataUrl, isLocalDev } from "../config";
import type { BenchReport } from "../types/bench";

const benchReportKey: InjectionKey<ReturnType<typeof createBenchReport>> = Symbol("benchReport");

function createBenchReport() {
    const loading = ref(false);
    const report = ref<BenchReport | null>(null);
    const statusText = ref("加载基准快照…");

    const rowCount = computed(() => report.value?.rows.length ?? 0);
    const errorCount = computed(
        () => report.value?.rows.filter((row) => row.error !== null).length ?? 0,
    );
    const okCount = computed(() => rowCount.value - errorCount.value);

    function applyReport(next: BenchReport) {
        report.value = next;
        statusText.value = `快照 ${next.generatedAt} · ${next.rows.length} 题 · target ${next.benchTarget}`;
    }

    async function loadCached() {
        try {
            const res = await fetch(benchmarkDataUrl);
            if (res.ok) {
                applyReport((await res.json()) as BenchReport);
            } else {
                statusText.value = "未找到基准快照";
            }
        } catch {
            statusText.value = "无法加载基准快照";
        }
    }

    async function runBench() {
        if (!isLocalDev) {
            return;
        }
        loading.value = true;
        statusText.value = "本地运行基准中…";
        try {
            const res = await fetch("/api/bench");
            if (!res.ok) {
                throw new Error(await res.text());
            }
            applyReport((await res.json()) as BenchReport);
        } catch (err) {
            statusText.value = `本地基准失败：${String(err)}`;
        } finally {
            loading.value = false;
        }
    }

    return {
        isLocalDev,
        loading,
        report,
        statusText,
        rowCount,
        errorCount,
        okCount,
        loadCached,
        runBench,
    };
}

export function provideBenchReport() {
    const state = createBenchReport();
    provide(benchReportKey, state);
    return state;
}

export function useBenchReport() {
    const state = inject(benchReportKey);
    if (!state) {
        throw new Error("useBenchReport must be used inside provideBenchReport");
    }
    return state;
}
