import type {
    BenchReport,
    BenchRow,
    PythonBenchEnvironment,
    TypeScriptBenchEnvironment,
    ValkyrieBenchEnvironment,
} from "../types/bench";

type PythonBenchRow = {
    id: string;
    title: string;
    questionId: number;
    difficulty: string;
    tags: string[];
    runtimeMs: number | null;
    error: string | null;
};

type TypeScriptBenchRow = {
    id: string;
    title: string;
    questionId: number;
    difficulty: string;
    tags: string[];
    runtimeMs: number | null;
    error: string | null;
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
};

type PythonBenchReport = {
    language: "python";
    generatedAt: string;
    ready: boolean;
    catalogTotal: number;
    environment?: PythonBenchEnvironment;
    rows: PythonBenchRow[];
};

type TypeScriptBenchReport = {
    language: "typescript";
    generatedAt: string;
    ready: boolean;
    catalogTotal: number;
    environment?: TypeScriptBenchEnvironment;
    rows: TypeScriptBenchRow[];
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

function mergeRowErrors(row: BenchRow): void {
    row.error = mergeErrors(mergeErrors(row.pyError, row.tsError), row.vError);
}

export function mergeLanguageBenchReports(
    python: PythonBenchReport | null,
    typescript: TypeScriptBenchReport | null,
    valkyrie: ValkyrieBenchReport | null,
): BenchReport | null {
    if (!python && !typescript && !valkyrie) {
        return null;
    }

    const byId = new Map<string, BenchRow>();

    for (const row of python?.rows ?? []) {
        byId.set(row.id, {
            id: row.id,
            title: row.title,
            questionId: row.questionId,
            difficulty: row.difficulty,
            tags: row.tags,
            pyRuntimeMs: row.runtimeMs,
            tsRuntimeMs: null,
            vCompileMs: null,
            vRuntimeMs: null,
            legionRoute: null,
            benchTarget: valkyrie?.benchTarget ?? "node",
            pyError: row.error,
            tsError: null,
            vError: null,
            error: row.error,
        });
    }

    for (const row of typescript?.rows ?? []) {
        const existing = byId.get(row.id);
        if (existing) {
            existing.tsRuntimeMs = row.runtimeMs;
            existing.tsError = row.error;
            mergeRowErrors(existing);
            continue;
        }

        byId.set(row.id, {
            id: row.id,
            title: row.title,
            questionId: row.questionId,
            difficulty: row.difficulty,
            tags: row.tags,
            pyRuntimeMs: null,
            tsRuntimeMs: row.runtimeMs,
            vCompileMs: null,
            vRuntimeMs: null,
            legionRoute: null,
            benchTarget: valkyrie?.benchTarget ?? "node",
            pyError: null,
            tsError: row.error,
            vError: null,
            error: row.error,
        });
    }

    for (const row of valkyrie?.rows ?? []) {
        const existing = byId.get(row.id);
        if (existing) {
            existing.vCompileMs = row.compileMs;
            existing.vRuntimeMs = row.runtimeMs;
            existing.legionRoute = row.legionRoute;
            existing.benchTarget = row.benchTarget;
            existing.vError = row.error;
            mergeRowErrors(existing);
            continue;
        }

        byId.set(row.id, {
            id: row.id,
            title: row.title,
            questionId: row.questionId,
            difficulty: row.difficulty,
            tags: row.tags,
            pyRuntimeMs: null,
            tsRuntimeMs: null,
            vCompileMs: row.compileMs,
            vRuntimeMs: row.runtimeMs,
            legionRoute: row.legionRoute,
            benchTarget: row.benchTarget,
            pyError: null,
            tsError: null,
            vError: row.error,
            error: row.error,
        });
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
        generatedAt: latestIso(python?.generatedAt, typescript?.generatedAt, valkyrie?.generatedAt),
        ready: Boolean(python?.ready || typescript?.ready || valkyrie?.ready),
        benchTarget: valkyrie?.benchTarget ?? "node",
        catalogTotal: python?.catalogTotal ?? typescript?.catalogTotal ?? valkyrie?.catalogTotal,
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
            valkyrie: valkyrie
                ? {
                      generatedAt: valkyrie.generatedAt,
                      ready: valkyrie.ready,
                      rowCount: valkyrie.rows.length,
                      benchTarget: valkyrie.benchTarget,
                  }
                : null,
        },
        environments: {
            python: python?.environment ?? null,
            typescript: typescript?.environment ?? null,
            valkyrie: valkyrie?.environment ?? null,
        },
    };
}

/** 旧版合并快照缺 Python 字段时补齐。 */
export function normalizeLegacyBenchRow(row: Partial<BenchRow> & Pick<BenchRow, "id" | "title">): BenchRow {
    return {
        id: row.id,
        title: row.title,
        questionId: row.questionId,
        difficulty: row.difficulty,
        tags: row.tags,
        pyRuntimeMs: row.pyRuntimeMs ?? null,
        tsRuntimeMs: row.tsRuntimeMs ?? null,
        vCompileMs: row.vCompileMs ?? null,
        vRuntimeMs: row.vRuntimeMs ?? null,
        legionRoute: row.legionRoute ?? null,
        benchTarget: row.benchTarget ?? "node",
        pyError: row.pyError ?? null,
        tsError: row.tsError ?? null,
        vError: row.vError ?? null,
        error: row.error ?? null,
    };
}

export function normalizeLegacyBenchReport(report: BenchReport): BenchReport {
    return {
        ...report,
        rows: report.rows.map((row) => normalizeLegacyBenchRow(row)),
        sources: {
            python: report.sources?.python ?? null,
            typescript: report.sources?.typescript ?? null,
            valkyrie: report.sources?.valkyrie ?? null,
        },
        environments: {
            python: report.environments?.python ?? null,
            typescript: report.environments?.typescript ?? null,
            valkyrie: report.environments?.valkyrie ?? null,
        },
    };
}
