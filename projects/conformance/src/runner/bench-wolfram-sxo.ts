import { PROBLEMS } from "../catalog.ts";
import type { WolframSxoBenchReport } from "./bench-types.ts";
import {
    benchProblemsForLanguage,
    metaForProblem,
    writeLanguageBenchReport,
} from "./bench-shared.ts";
import { collectWolframSxoBenchEnvironment } from "./bench-env.ts";
import { benchWolframSxoProblem } from "./wolfram-sxo-bench.ts";
import { sxoRunnerReady } from "./sxo-bridge.ts";

export async function runWolframSxoBenchmarks(): Promise<WolframSxoBenchReport> {
    const problems = benchProblemsForLanguage("wolfram-sxo");
    const rows = [];
    for (const problem of problems) {
        const meta = metaForProblem(problem);
        let runtimeMs: number | null = null;
        let error: string | null = null;

        try {
            runtimeMs = await benchWolframSxoProblem(problem);
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
        language: "wolfram-sxo",
        generatedAt: new Date().toISOString(),
        ready: sxoRunnerReady(),
        catalogTotal: PROBLEMS.length,
        environment: collectWolframSxoBenchEnvironment(),
        rows,
    };
}

export async function benchWolframSxoMain(): Promise<string> {
    const report = await runWolframSxoBenchmarks();
    const outPath = writeLanguageBenchReport("wolfram-sxo", report);
    console.log(JSON.stringify(report, null, 2));
    console.log(`\n已写入 ${outPath}`);
    return outPath;
}

const invokedDirectly = process.argv[1]?.includes("bench-wolfram-sxo");
if (invokedDirectly) {
    benchWolframSxoMain().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
