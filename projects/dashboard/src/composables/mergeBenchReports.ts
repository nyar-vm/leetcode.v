import type {
    BenchReport,
    BenchRow,
    MatlabSxoBenchEnvironment,
    PythonBenchEnvironment,
    TypeScriptBenchEnvironment,
    TypeScriptBunBenchEnvironment,
    ValkyrieBenchEnvironment,
    WolframSxoBenchEnvironment,
} from "../types/bench";

type RuntimeBenchRow = {
    id: string;
    title: string;
    questionId: number;
    difficulty: string;
    tags: string[];
    runtimeMs: number | null;
    error: string | null;
    runId?: string;
    sourceCurrent?: boolean;
};

type ValkyrieBenchRow = {
    id: string;
    title: string;
    questionId: number;
    difficulty: string;
    tags: string[];
    compileMs: number | null;
    runtimeMs: number | null;
    legionRoute: string | null;
    benchTarget: string;
    error: string | null;
    runId?: string;
    sourceCurrent?: boolean;
};

type PythonBenchReport = {
    language: "python";
    generatedAt: string;
    ready: boolean;
    catalogTotal: number;
    environment?: PythonBenchEnvironment;
    rows: RuntimeBenchRow[];
};

type TypeScriptBenchReport = {
    language: "typescript";
    generatedAt: string;
    ready: boolean;
    catalogTotal: number;
    environment?: TypeScriptBenchEnvironment;
    rows: RuntimeBenchRow[];
};

type TypeScriptBunBenchReport = {
    language: "typescript-bun";
    generatedAt: string;
    ready: boolean;
    catalogTotal: number;
    environment?: TypeScriptBunBenchEnvironment;
    rows: RuntimeBenchRow[];
};

type ValkyrieBenchReport = {
    language: "valkyrie";
    generatedAt: string;
    ready: boolean;
    benchTarget: string;
    catalogTotal: number;
    environment?: ValkyrieBenchEnvironment;
    rows: ValkyrieBenchRow[];
};

type WolframSxoBenchReport = {
    language: "wolfram-sxo";
    generatedAt: string;
    ready: boolean;
    catalogTotal: number;
    environment?: WolframSxoBenchEnvironment;
    rows: RuntimeBenchRow[];
};

type MatlabSxoBenchReport = {
    language: "matlab-sxo";
    generatedAt: string;
    ready: boolean;
    catalogTotal: number;
    environment?: MatlabSxoBenchEnvironment;
    rows: RuntimeBenchRow[];
};

function mergeErrors(left: string | null | undefined, right: string | null | undefined): string | null {
    const a = left ?? null;
    const b = right ?? null;
    if (a && b) {
        return `${a}; ${b}`;
    }
    return a ?? b;
}

function latestIso(...dates: (string | undefined)[]): string {
    const valid = dates.filter((value): value is string => Boolean(value));
    if (valid.length === 0) {
        return new Date(0).toISOString();
    }
    return valid.sort().at(-1) ?? new Date(0).toISOString();
}

function baseBenchRow(
    row: {
        id: string;
        title: string;
        questionId: number;
        difficulty: string;
        tags: string[];
        error: string | null;
        sourceCurrent?: boolean;
    },
    benchTarget: string,
): BenchRow {
    return {
        id: row.id,
        title: row.title,
        questionId: row.questionId,
        difficulty: row.difficulty,
        tags: row.tags,
        pyRuntimeMs: null,
        tsRuntimeMs: null,
        tbRuntimeMs: null,
        vCompileMs: null,
        vRuntimeMs: null,
        wlRuntimeMs: null,
        mlRuntimeMs: null,
        legionRoute: null,
        benchTarget,
        pyError: null,
        tsError: null,
        tbError: null,
        vError: null,
        wlError: null,
        mlError: null,
        error: row.error,
        benchmarkStale: row.sourceCurrent === false,
    };
}

function markStale(row: BenchRow, sourceCurrent?: boolean): void {
    if (sourceCurrent === false) {
        row.benchmarkStale = true;
    }
}

function mergeRowErrors(row: BenchRow): void {
    row.error = mergeErrors(
        mergeErrors(mergeErrors(mergeErrors(row.pyError, row.tsError), row.tbError), row.vError),
        mergeErrors(row.wlError, row.mlError),
    );
}

export function mergeLanguageBenchReports(
    python: PythonBenchReport | null,
    typescript: TypeScriptBenchReport | null,
    valkyrie: ValkyrieBenchReport | null,
    wolframSxo: WolframSxoBenchReport | null = null,
    matlabSxo: MatlabSxoBenchReport | null = null,
    typescriptBun: TypeScriptBunBenchReport | null = null,
): BenchReport | null {
    if (!python && !typescript && !valkyrie && !wolframSxo && !matlabSxo && !typescriptBun) {
        return null;
    }

    const benchTarget = valkyrie?.benchTarget ?? "node";
    const byId = new Map<string, BenchRow>();

    for (const row of python?.rows ?? []) {
        const base = baseBenchRow(row, benchTarget);
        base.pyRuntimeMs = row.runtimeMs;
        base.pyError = row.error;
        base.error = row.error;
        markStale(base, row.sourceCurrent);
        byId.set(row.id, base);
    }

    for (const row of typescript?.rows ?? []) {
        const existing = byId.get(row.id);
        if (existing) {
            existing.tsRuntimeMs = row.runtimeMs;
            existing.tsError = row.error;
            markStale(existing, row.sourceCurrent);
            mergeRowErrors(existing);
            continue;
        }
        const base = baseBenchRow(row, benchTarget);
        base.tsRuntimeMs = row.runtimeMs;
        base.tsError = row.error;
        base.error = row.error;
        markStale(base, row.sourceCurrent);
        byId.set(row.id, base);
    }

    for (const row of typescriptBun?.rows ?? []) {
        const existing = byId.get(row.id);
        if (existing) {
            existing.tbRuntimeMs = row.runtimeMs;
            existing.tbError = row.error;
            markStale(existing, row.sourceCurrent);
            mergeRowErrors(existing);
            continue;
        }
        const base = baseBenchRow(row, benchTarget);
        base.tbRuntimeMs = row.runtimeMs;
        base.tbError = row.error;
        base.error = row.error;
        markStale(base, row.sourceCurrent);
        byId.set(row.id, base);
    }

    for (const row of valkyrie?.rows ?? []) {
        const existing = byId.get(row.id);
        if (existing) {
            existing.vCompileMs = row.compileMs;
            existing.vRuntimeMs = row.runtimeMs;
            existing.legionRoute = row.legionRoute;
            existing.benchTarget = row.benchTarget;
            existing.vError = row.error;
            markStale(existing, row.sourceCurrent);
            mergeRowErrors(existing);
            continue;
        }
        const base = baseBenchRow(row, row.benchTarget);
        base.vCompileMs = row.compileMs;
        base.vRuntimeMs = row.runtimeMs;
        base.legionRoute = row.legionRoute;
        base.vError = row.error;
        base.error = row.error;
        markStale(base, row.sourceCurrent);
        byId.set(row.id, base);
    }

    for (const row of wolframSxo?.rows ?? []) {
        const existing = byId.get(row.id);
        if (existing) {
            existing.wlRuntimeMs = row.runtimeMs;
            existing.wlError = row.error;
            markStale(existing, row.sourceCurrent);
            mergeRowErrors(existing);
            continue;
        }
        const base = baseBenchRow(row, benchTarget);
        base.wlRuntimeMs = row.runtimeMs;
        base.wlError = row.error;
        base.error = row.error;
        markStale(base, row.sourceCurrent);
        byId.set(row.id, base);
    }

    for (const row of matlabSxo?.rows ?? []) {
        const existing = byId.get(row.id);
        if (existing) {
            existing.mlRuntimeMs = row.runtimeMs;
            existing.mlError = row.error;
            markStale(existing, row.sourceCurrent);
            mergeRowErrors(existing);
            continue;
        }
        const base = baseBenchRow(row, benchTarget);
        base.mlRuntimeMs = row.runtimeMs;
        base.mlError = row.error;
        base.error = row.error;
        markStale(base, row.sourceCurrent);
        byId.set(row.id, base);
    }

    const rows = [...byId.values()].sort((left, right) => {
        const leftQ = left.questionId ?? 0;
        const rightQ = right.questionId ?? 0;
        if (leftQ !== rightQ) {
            return leftQ - rightQ;
        }
        return left.id.localeCompare(right.id);
    });

    return {
        generatedAt: latestIso(
            python?.generatedAt,
            typescript?.generatedAt,
            valkyrie?.generatedAt,
            wolframSxo?.generatedAt,
            matlabSxo?.generatedAt,
            typescriptBun?.generatedAt,
        ),
        ready: Boolean(python?.ready || typescript?.ready || valkyrie?.ready || wolframSxo?.ready || matlabSxo?.ready || typescriptBun?.ready),
        benchTarget,
        catalogTotal:
            python?.catalogTotal ??
            typescript?.catalogTotal ??
            valkyrie?.catalogTotal ??
            wolframSxo?.catalogTotal ??
            matlabSxo?.catalogTotal ??
            typescriptBun?.catalogTotal,
        rows,
        sources: {
            python: python
                ? {
                      generatedAt: python.generatedAt,
                      ready: python.ready,
                      rowCount: python.rows.length,
                  }
                : null,
            typescript: typescript
                ? {
                      generatedAt: typescript.generatedAt,
                      ready: typescript.ready,
                      rowCount: typescript.rows.length,
                  }
                : null,
            typescriptBun: typescriptBun
                ? {
                      generatedAt: typescriptBun.generatedAt,
                      ready: typescriptBun.ready,
                      rowCount: typescriptBun.rows.length,
                  }
                : null,
            valkyrie: valkyrie
                ? {
                      generatedAt: valkyrie.generatedAt,
                      ready: valkyrie.ready,
                      rowCount: valkyrie.rows.length,
                      benchTarget: valkyrie.benchTarget,
                  }
                : null,
            wolframSxo: wolframSxo
                ? {
                      generatedAt: wolframSxo.generatedAt,
                      ready: wolframSxo.ready,
                      rowCount: wolframSxo.rows.length,
                  }
                : null,
            matlabSxo: matlabSxo
                ? {
                      generatedAt: matlabSxo.generatedAt,
                      ready: matlabSxo.ready,
                      rowCount: matlabSxo.rows.length,
                  }
                : null,
        },
        environments: {
            python: python?.environment ?? null,
            typescript: typescript?.environment ?? null,
            typescriptBun: typescriptBun?.environment ?? null,
            valkyrie: valkyrie?.environment ?? null,
            wolframSxo: wolframSxo?.environment ?? null,
            matlabSxo: matlabSxo?.environment ?? null,
        },
    };
}

/** 旧版合并快照缺字段时补齐。 */
export function normalizeLegacyBenchRow(row: Partial<BenchRow> & Pick<BenchRow, "id" | "title">): BenchRow {
    return {
        id: row.id,
        title: row.title,
        questionId: row.questionId,
        difficulty: row.difficulty,
        tags: row.tags,
        pyRuntimeMs: row.pyRuntimeMs ?? null,
        tsRuntimeMs: row.tsRuntimeMs ?? null,
        tbRuntimeMs: row.tbRuntimeMs ?? null,
        vCompileMs: row.vCompileMs ?? null,
        vRuntimeMs: row.vRuntimeMs ?? null,
        wlRuntimeMs: row.wlRuntimeMs ?? null,
        mlRuntimeMs: row.mlRuntimeMs ?? null,
        legionRoute: row.legionRoute ?? null,
        benchTarget: row.benchTarget ?? "node",
        pyError: row.pyError ?? null,
        tsError: row.tsError ?? null,
        tbError: row.tbError ?? null,
        vError: row.vError ?? null,
        wlError: row.wlError ?? null,
        mlError: row.mlError ?? null,
        error: row.error ?? null,
        benchmarkStale: row.benchmarkStale ?? false,
    };
}

export function normalizeLegacyBenchReport(report: BenchReport): BenchReport {
    return {
        ...report,
        rows: report.rows.map((row) => normalizeLegacyBenchRow(row)),
        sources: {
            python: report.sources?.python ?? null,
            typescript: report.sources?.typescript ?? null,
            typescriptBun: report.sources?.typescriptBun ?? null,
            valkyrie: report.sources?.valkyrie ?? null,
            wolframSxo: report.sources?.wolframSxo ?? null,
            matlabSxo: report.sources?.matlabSxo ?? null,
        },
        environments: {
            python: report.environments?.python ?? null,
            typescript: report.environments?.typescript ?? null,
            typescriptBun: report.environments?.typescriptBun ?? null,
            valkyrie: report.environments?.valkyrie ?? null,
            wolframSxo: report.environments?.wolframSxo ?? null,
            matlabSxo: report.environments?.matlabSxo ?? null,
        },
    };
}
