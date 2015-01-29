import { runBenchmark } from "../execution/benchmark-runner.ts";
import { runCorrectness } from "../execution/correctness-runner.ts";
import {
    implementationsToRun,
    parseImplementationIds,
    planBenchmarkRuns,
    planCorrectnessRuns,
} from "../planning/run-plan.ts";
import { writeAllDashboardProjections } from "../reporting/dashboard-projection.ts";
import type { ImplementationId } from "../adapters/ids.ts";

export type CliMode = "benchmark" | "correctness";

export async function runCli(mode: CliMode): Promise<{ paths: string[] }> {
    const selection = parseImplementationIds();
    const implementationIds = implementationsToRun(selection);
    const plans =
        mode === "benchmark"
            ? planBenchmarkRuns(implementationIds)
            : planCorrectnessRuns(implementationIds);

    for (const plan of plans) {
        if (mode === "benchmark") {
            await runBenchmark(plan.request, plan.problem, plan.executionNonce);
        } else {
            await runCorrectness(plan.request, plan.problem, plan.executionNonce);
        }
    }

    const paths =
        mode === "benchmark"
            ? writeAllDashboardProjections(implementationIds as ImplementationId[])
            : [];

    return { paths };
}

async function main(): Promise<void> {
    const mode: CliMode = process.argv.includes("--correctness") ? "correctness" : "benchmark";
    const { paths } = await runCli(mode);
    if (paths.length > 0) {
        console.log(`\n已写入 ${paths.length} 个 dashboard 投影`);
        for (const path of paths) {
            console.log(`  ${path}`);
        }
    }
}

const invokedDirectly = process.argv[1]?.includes("cli/run");
if (invokedDirectly) {
    main().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
