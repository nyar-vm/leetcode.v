import { computed, inject, provide, ref, type InjectionKey } from "vue";

import {
    benchmarkLegacyUrl,
    benchmarkPythonUrl,
    benchmarkTypeScriptUrl,
    benchmarkValkyrieUrl,
} from "../config";
import type { BenchReport } from "../types/bench";
import {
    mergeLanguageBenchReports,
    normalizeLegacyBenchReport,
} from "./mergeBenchReports";

const benchReportKey: InjectionKey<ReturnType<typeof createBenchReport>> = Symbol("benchReport");

async function fetchJson<T>(url: string): Promise<T | null> {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            return null;
        }
        return (await res.json()) as T;
    } catch {
        return null;
    }
}

function formatSourceSummary(report: BenchReport): string {
    const parts: string[] = [];
    const py = report.sources?.python;
    const ts = report.sources?.typescript;
    const v = report.sources?.valkyrie;
    if (py) {
        parts.push(`Py ${py.rowCount}`);
    }
    if (ts) {
        parts.push(`TS ${ts.rowCount}`);
    }
    if (v) {
        parts.push(`V ${v.rowCount}`);
    }
    if (parts.length === 0) {
        return `${report.rows.length} 题`;
    }
    return `${report.rows.length} 题 · ${parts.join(" · ")}`;
}

function createBenchReport() {
    const report = ref<BenchReport | null>(null);
    const statusText = ref("加载基准快照…");

    const rowCount = computed(() => report.value?.rows.length ?? 0);
    const errorCount = computed(
        () => report.value?.rows.filter((row) => row.error !== null).length ?? 0,
    );
    const okCount = computed(() => rowCount.value - errorCount.value);

    function applyReport(next: BenchReport) {
        report.value = next;
        statusText.value = `快照 ${next.generatedAt} · ${formatSourceSummary(next)} · target ${next.benchTarget}`;
    }

    async function loadCached() {
        const [python, typescript, valkyrie] = await Promise.all([
            fetchJson(benchmarkPythonUrl),
            fetchJson(benchmarkTypeScriptUrl),
            fetchJson(benchmarkValkyrieUrl),
        ]);

        const merged = mergeLanguageBenchReports(python, typescript, valkyrie);
        if (merged) {
            applyReport(merged);
            return;
        }

        const legacy = await fetchJson<BenchReport>(benchmarkLegacyUrl);
        if (legacy) {
            applyReport(normalizeLegacyBenchReport(legacy));
            return;
        }

        statusText.value = "未找到基准快照（请先跑 pnpm bench 或单语言 bench:python / bench:typescript / bench:valkyrie）";
    }

    return {
        report,
        statusText,
        rowCount,
        errorCount,
        okCount,
        loadCached,
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
