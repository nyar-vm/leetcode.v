export type { BenchRow } from "./bench-merge.ts";
export { mergeLanguageBenchReports } from "./bench-merge.ts";
export {
    parseBenchLanguages,
    runAllBenchmarks,
    runSelectedBenchmarks,
} from "../bench/orchestrator.ts";

import { runSelectedBenchmarks } from "../bench/orchestrator.ts";

async function main() {
    const { languages, paths } = await runSelectedBenchmarks();
    console.log(`\n完成 ${languages.join(", ")} 基准 · ${paths.length} 个快照文件`);
}

const invokedDirectly = process.argv[1]?.includes("bench-all");
if (invokedDirectly) {
    main().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
