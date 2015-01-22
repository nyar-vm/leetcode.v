import type { BenchLanguage } from "./bench-types.ts";
import { benchLanguageMain, runLanguageBenchmark } from "../bench/orchestrator.ts";
import { getLanguageBenchPlugin } from "../solvers/plugins.ts";

export function createBenchLanguageEntry(language: BenchLanguage, entryFileToken: string) {
    async function runBenchmarks() {
        return runLanguageBenchmark(getLanguageBenchPlugin(language));
    }

    async function main(): Promise<string> {
        return benchLanguageMain(language);
    }

    const invokedDirectly = process.argv[1]?.includes(entryFileToken);
    if (invokedDirectly) {
        main().catch((err) => {
            console.error(err);
            process.exit(1);
        });
    }

    return { runBenchmarks, main };
}
