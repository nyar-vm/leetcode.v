import { PROBLEMS } from "../catalog.ts";
import type { TypeScriptBenchReport } from "./bench-types.ts";
import { benchProblemsForLanguage, metaForProblem, writeLanguageBenchReport } from "./bench-shared.ts";
import { collectTypeScriptBenchEnvironment } from "./bench-env.ts";
import { benchTsProblem } from "./ts-bench.ts";

export async function runTypeScriptBenchmarks(): Promise<TypeScriptBenchReport> {
    const problems = benchProblemsForLanguage("typescript");
    const rows = problems.map((problem) => {
        const meta = metaForProblem(problem);
        let runtimeMs: number | null = null;
        let error: string | null = null;

        try {
            runtimeMs = benchTsProblem(problem);
        } catch (err) {
            error = String(err);
        }

        return {
            id: problem.id,
            ...meta,
            runtimeMs,
            error,
        };
    });

    return {
        language: "typescript",
        generatedAt: new Date().toISOString(),
        ready: true,
        catalogTotal: PROBLEMS.length,
        environment: collectTypeScriptBenchEnvironment(),
        rows,
    };
}

export async function benchTypeScriptMain(): Promise<string> {
    const report = await runTypeScriptBenchmarks();
    const outPath = writeLanguageBenchReport("typescript", report);
    console.log(JSON.stringify(report, null, 2));
    console.log(`\n已写入 ${outPath}`);
    return outPath;
}

const invokedDirectly = process.argv[1]?.includes("bench-typescript");
if (invokedDirectly) {
    benchTypeScriptMain().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
