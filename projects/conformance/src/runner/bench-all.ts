import type { BenchLanguage } from "./bench-types.ts";
import { parseBenchLanguages } from "./bench-shared.ts";
import { benchMatlabSxoMain } from "./bench-matlab-sxo.ts";
import { benchPythonMain } from "./bench-python.ts";
import { benchTypeScriptMain } from "./bench-typescript.ts";
import { benchValkyrieMain } from "./bench-valkyrie.ts";
import { benchWolframSxoMain } from "./bench-wolfram-sxo.ts";

export type { BenchRow } from "./bench-merge.ts";
export { mergeLanguageBenchReports } from "./bench-merge.ts";

function languagesToRun(selection: BenchLanguage[] | "all"): BenchLanguage[] {
    if (selection === "all") {
        return ["python", "typescript", "valkyrie"];
    }
    return selection;
}

export async function runSelectedBenchmarks(
    selection: BenchLanguage[] | "all" = parseBenchLanguages(),
): Promise<{ languages: BenchLanguage[]; paths: string[] }> {
    const languages = languagesToRun(selection);
    const paths: string[] = [];

    for (const language of languages) {
        if (language === "python") {
            paths.push(await benchPythonMain());
            continue;
        }
        if (language === "typescript") {
            paths.push(await benchTypeScriptMain());
            continue;
        }
        if (language === "valkyrie") {
            paths.push(await benchValkyrieMain());
            continue;
        }
        if (language === "wolfram-sxo") {
            paths.push(await benchWolframSxoMain());
            continue;
        }
        paths.push(await benchMatlabSxoMain());
    }

    return { languages, paths };
}

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
