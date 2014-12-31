import { WASM_NODE_BENCH_TARGET } from "@valkyrie-language/vcc/benchmark";

import { PROBLEMS } from "../catalog.ts";
import type { ValkyrieBenchReport } from "./bench-types.ts";
import {
    benchProblemsForLanguage,
    metaForProblem,
    writeLanguageBenchReport,
} from "./bench-shared.ts";
import { collectValkyrieBenchEnvironment } from "./bench-env.ts";
import { benchValkyrieProblem } from "./v-bench.ts";
import { valkyrieRunnerReady } from "./valkyrie.ts";

export async function runValkyrieBenchmarks(): Promise<ValkyrieBenchReport> {
    const benchTarget = WASM_NODE_BENCH_TARGET;
    const problems = benchProblemsForLanguage("valkyrie");
    const rows = problems.map((problem) => {
        const meta = metaForProblem(problem);
        const vBench = benchValkyrieProblem(problem);

        return {
            id: problem.id,
            ...meta,
            compileMs: vBench.vCompileMs,
            runtimeMs: vBench.vRuntimeMs,
            legionRoute: vBench.legionRoute,
            benchTarget,
            error: vBench.error,
        };
    });

    return {
        language: "valkyrie",
        generatedAt: new Date().toISOString(),
        ready: valkyrieRunnerReady(),
        benchTarget,
        catalogTotal: PROBLEMS.length,
        environment: collectValkyrieBenchEnvironment(),
        rows,
    };
}

export async function benchValkyrieMain(): Promise<string> {
    const report = await runValkyrieBenchmarks();
    const outPath = writeLanguageBenchReport("valkyrie", report);
    console.log(JSON.stringify(report, null, 2));
    console.log(`\n已写入 ${outPath}`);
    return outPath;
}

const invokedDirectly = process.argv[1]?.includes("bench-valkyrie");
if (invokedDirectly) {
    benchValkyrieMain().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
