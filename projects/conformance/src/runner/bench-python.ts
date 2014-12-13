import { PROBLEMS } from "../catalog.ts";
import type { PythonBenchReport } from "./bench-types.ts";
import { benchProblemsForLanguage, metaForProblem, writeLanguageBenchReport } from "./bench-shared.ts";
import { collectPythonBenchEnvironment } from "./bench-env.ts";
import { benchPythonProblem } from "./python-bench.ts";
import { pythonRefReady } from "./python-ref.ts";

export async function runPythonBenchmarks(): Promise<PythonBenchReport> {
    const problems = benchProblemsForLanguage("python");
    const rows = problems.map((problem) => {
        const meta = metaForProblem(problem);
        let runtimeMs: number | null = null;
        let error: string | null = null;

        try {
            runtimeMs = benchPythonProblem(problem);
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
        language: "python",
        generatedAt: new Date().toISOString(),
        ready: pythonRefReady(),
        catalogTotal: PROBLEMS.length,
        environment: collectPythonBenchEnvironment(),
        rows,
    };
}

export async function benchPythonMain(): Promise<string> {
    const report = await runPythonBenchmarks();
    const outPath = writeLanguageBenchReport("python", report);
    console.log(JSON.stringify(report, null, 2));
    console.log(`\n已写入 ${outPath}`);
    return outPath;
}

const invokedDirectly = process.argv[1]?.includes("bench-python");
if (invokedDirectly) {
    benchPythonMain().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
