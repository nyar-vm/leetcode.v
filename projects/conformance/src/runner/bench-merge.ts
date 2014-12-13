import type { PythonBenchReport, TypeScriptBenchReport, ValkyrieBenchReport } from "./bench-types.ts";
import { mergeErrors } from "./bench-shared.ts";

export type BenchRow = {
    id: string;
    title: string;
    questionId: number;
    difficulty: string;
    tags: string[];
    pyRuntimeMs: number | null;
    tsRuntimeMs: number | null;
    vCompileMs: number | null;
    vRuntimeMs: number | null;
    legionRoute: string | null;
    benchTarget: string;
    pyError: string | null;
    tsError: string | null;
    vError: string | null;
    error: string | null;
};

export type MergedBenchReport = {
    generatedAt: string;
    ready: boolean;
    benchTarget: string;
    catalogTotal?: number;
    rows: BenchRow[];
    sources: {
        python: {
            generatedAt: string;
            ready: boolean;
            rowCount: number;
        } | null;
        typescript: {
            generatedAt: string;
            ready: boolean;
            rowCount: number;
        } | null;
        valkyrie: {
            generatedAt: string;
            ready: boolean;
            rowCount: number;
            benchTarget: string;
        } | null;
    };
};

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
): MergedBenchReport | null {
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
        if (left.questionId !== right.questionId) {
            return left.questionId - right.questionId;
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
    };
}
