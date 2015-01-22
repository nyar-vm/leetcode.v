import { WASM_NODE_BENCH_TARGET } from "@valkyrie-language/vcc/benchmark";

import {
    collectMatlabSxoBenchEnvironment,
    collectPythonBenchEnvironment,
    collectTypeScriptBenchEnvironment,
    collectTypeScriptBunBenchEnvironment,
    collectValkyrieBenchEnvironment,
    collectWolframSxoBenchEnvironment,
} from "../runner/bench-env.ts";
import type { BenchLanguage } from "../runner/bench-types.ts";
import { benchBunProblem } from "../runner/bun-bench.ts";
import { bunRunnerReady } from "../runner/bun-bridge.ts";
import { benchPythonProblem } from "../runner/python-bench.ts";
import { hasPythonSolver, pythonRefReady } from "../runner/python-ref.ts";
import {
    hasMatlabSxoSolver,
    hasWolframSxoSolver,
} from "../runner/sxo-solver-shared.ts";
import { sxoRunnerReady } from "../runner/sxo-bridge.ts";
import { benchTsProblem } from "../runner/ts-bench.ts";
import { hasReadyTsSolver } from "../runner/ts-ref.ts";
import { benchValkyrieProblem } from "../runner/v-bench.ts";
import { benchMatlabSxoProblem } from "../runner/matlab-sxo-bench.ts";
import { benchWolframSxoProblem } from "../runner/wolfram-sxo-bench.ts";
import { hasValkyrieSolver, valkyrieRunnerReady } from "../runner/valkyrie.ts";
import type { BenchProblemOutcome, LanguageBenchPlugin } from "./types.ts";

const pythonPlugin: LanguageBenchPlugin = {
    language: "python",
    hasSolver: hasPythonSolver,
    runnerReady: pythonRefReady,
    collectEnvironment: collectPythonBenchEnvironment,
    async benchProblem(problem) {
        return { runtimeMs: benchPythonProblem(problem) };
    },
};

const typescriptPlugin: LanguageBenchPlugin = {
    language: "typescript",
    hasSolver: hasReadyTsSolver,
    runnerReady: () => true,
    collectEnvironment: collectTypeScriptBenchEnvironment,
    async benchProblem(problem) {
        return { runtimeMs: await benchTsProblem(problem) };
    },
};

const typescriptBunPlugin: LanguageBenchPlugin = {
    language: "typescript-bun",
    hasSolver: hasReadyTsSolver,
    runnerReady: bunRunnerReady,
    collectEnvironment: collectTypeScriptBunBenchEnvironment,
    async benchProblem(problem) {
        return { runtimeMs: benchBunProblem(problem) };
    },
};

const valkyriePlugin: LanguageBenchPlugin = {
    language: "valkyrie",
    hasSolver: hasValkyrieSolver,
    runnerReady: valkyrieRunnerReady,
    collectEnvironment: collectValkyrieBenchEnvironment,
    reportExtras() {
        return { benchTarget: WASM_NODE_BENCH_TARGET };
    },
    async benchProblem(problem) {
        const result = benchValkyrieProblem(problem);
        return {
            compileMs: result.vCompileMs,
            runtimeMs: result.vRuntimeMs,
            legionRoute: result.legionRoute,
            benchTarget: WASM_NODE_BENCH_TARGET,
            error: result.error,
        };
    },
};

const wolframSxoPlugin: LanguageBenchPlugin = {
    language: "wolfram-sxo",
    hasSolver: hasWolframSxoSolver,
    runnerReady: sxoRunnerReady,
    collectEnvironment: collectWolframSxoBenchEnvironment,
    async benchProblem(problem) {
        return { runtimeMs: await benchWolframSxoProblem(problem) };
    },
};

const matlabSxoPlugin: LanguageBenchPlugin = {
    language: "matlab-sxo",
    hasSolver: hasMatlabSxoSolver,
    runnerReady: sxoRunnerReady,
    collectEnvironment: collectMatlabSxoBenchEnvironment,
    async benchProblem(problem) {
        return { runtimeMs: await benchMatlabSxoProblem(problem) };
    },
};

export const LANGUAGE_BENCH_PLUGINS: Record<BenchLanguage, LanguageBenchPlugin> = {
    python: pythonPlugin,
    typescript: typescriptPlugin,
    "typescript-bun": typescriptBunPlugin,
    valkyrie: valkyriePlugin,
    "wolfram-sxo": wolframSxoPlugin,
    "matlab-sxo": matlabSxoPlugin,
};

export const ALL_BENCH_LANGUAGES = Object.keys(LANGUAGE_BENCH_PLUGINS) as BenchLanguage[];

/** `LEETCODE_BENCH_LANG=all` 时的默认语言集（保持历史行为）。 */
export const DEFAULT_BENCH_LANGUAGES: BenchLanguage[] = ["python", "typescript", "valkyrie"];

export function getLanguageBenchPlugin(language: BenchLanguage): LanguageBenchPlugin {
    const plugin = LANGUAGE_BENCH_PLUGINS[language];
    if (!plugin) {
        throw new Error(`未知基准语言 ${language}`);
    }
    return plugin;
}

export function hasSolverForLanguage(language: BenchLanguage, problemRoot: string): boolean {
    return getLanguageBenchPlugin(language).hasSolver(problemRoot);
}
