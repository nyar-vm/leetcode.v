import { PROBLEMS } from "../catalog.ts";
import type { TypeScriptBunBenchReport } from "./bench-types.ts";
import {
    benchProblemsForLanguage,
    metaForProblem,
    writeLanguageBenchReport,
} from "./bench-shared.ts";
import { collectTypeScriptBunBenchEnvironment } from "./bench-env.ts";
import { benchBunProblem } from "./bun-bench.ts";
import { bunRunnerReady } from "./bun-bridge.ts";

export async function runTypeScriptBunBenchmarks(): Promise<TypeScriptBunBenchReport> {
    const problems = benchProblemsForLanguage("typescript-bun");
    const rows = [];
    for (const problem of problems) {
        const meta = metaForProblem(problem);
        let runtimeMs: number | null = null;
        let error: string | null = null;

        try {
            runtimeMs = benchBunProblem(problem);
        } catch (err) {
            error = String(err);
        }

        rows.push({
            id: problem.id,
            ...meta,
            runtimeMs,
            error,
        });
    }

    return {
        language: "typescript-bun",
        generatedAt: new Date().toISOString(),
        ready: bunRunnerReady(),
        catalogTotal: PROBLEMS.length,
        environment: collectTypeScriptBunBenchEnvironment(),
        rows,
    };
}

export async function benchTypeScriptBunMain(): Promise<string> {
    const report = await runTypeScriptBunBenchmarks();
    const outPath = writeLanguageBenchReport("typescript-bun", report);
    console.log(JSON.stringify(report, null, 2));
    console.log(`\n已写入 ${outPath}`);
    return outPath;
}

const invokedDirectly = process.argv[1]?.includes("bench-typescript-bun");
if (invokedDirectly) {
    benchTypeScriptBunMain().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
