import { PROBLEMS } from "../catalog.ts";
import type { MatlabSxoBenchReport } from "./bench-types.ts";
import {
    benchProblemsForLanguage,
    metaForProblem,
    writeLanguageBenchReport,
} from "./bench-shared.ts";
import { collectMatlabSxoBenchEnvironment } from "./bench-env.ts";
import { benchMatlabSxoProblem } from "./matlab-sxo-bench.ts";
import { sxoRunnerReady } from "./sxo-bridge.ts";

export async function runMatlabSxoBenchmarks(): Promise<MatlabSxoBenchReport> {
    const problems = benchProblemsForLanguage("matlab-sxo");
    const rows = [];
    for (const problem of problems) {
        const meta = metaForProblem(problem);
        let runtimeMs: number | null = null;
        let error: string | null = null;

        try {
            runtimeMs = await benchMatlabSxoProblem(problem);
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
        language: "matlab-sxo",
        generatedAt: new Date().toISOString(),
        ready: sxoRunnerReady(),
        catalogTotal: PROBLEMS.length,
        environment: collectMatlabSxoBenchEnvironment(),
        rows,
    };
}

export async function benchMatlabSxoMain(): Promise<string> {
    const report = await runMatlabSxoBenchmarks();
    const outPath = writeLanguageBenchReport("matlab-sxo", report);
    console.log(JSON.stringify(report, null, 2));
    console.log(`\n已写入 ${outPath}`);
    return outPath;
}

const invokedDirectly = process.argv[1]?.includes("bench-matlab-sxo");
if (invokedDirectly) {
    benchMatlabSxoMain().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
