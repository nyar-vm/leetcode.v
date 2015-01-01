import { computed, inject, provide, ref, type InjectionKey } from "vue";

import {
    benchmarkLegacyUrl,
    benchmarkPythonUrl,
    benchmarkTypeScriptUrl,
    benchmarkValkyrieUrl,
} from "../config";
import type { BenchReport } from "../types/bench";
import { mergeLanguageBenchReports, normalizeLegacyBenchReport } from "./mergeBenchReports";

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

function createBenchReport() {
    const report = ref<BenchReport | null>(null);

    const rowCount = computed(() => report.value?.rows.length ?? 0);
    const errorCount = computed(
        () => report.value?.rows.filter((row) => row.error !== null).length ?? 0,
    );
    const okCount = computed(() => rowCount.value - errorCount.value);

    async function loadCached() {
        const [python, typescript, valkyrie] = await Promise.all([
            fetchJson(benchmarkPythonUrl),
            fetchJson(benchmarkTypeScriptUrl),
            fetchJson(benchmarkValkyrieUrl),
        ]);

        const merged = mergeLanguageBenchReports(python, typescript, valkyrie);
        if (merged) {
            report.value = merged;
            return;
        }

        const legacy = await fetchJson<BenchReport>(benchmarkLegacyUrl);
        if (legacy) {
            report.value = normalizeLegacyBenchReport(legacy);
        }
    }

    return {
        report,
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
