import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import os from "node:os";

import { WASM_NODE_BENCH_TARGET } from "@valkyrie-language/vcc/benchmark";

import type {
    HostEnvironment,
    MatlabSxoBenchEnvironment,
    PythonBenchEnvironment,
    TypeScriptBenchEnvironment,
    ValkyrieBenchEnvironment,
    WolframSxoBenchEnvironment,
} from "./bench-types.ts";
import {
    PYTHON_BENCH_PARAMS,
    SXO_BENCH_PARAMS,
    TYPESCRIPT_BENCH_PARAMS,
    VALKYRIE_BENCH_PARAMS,
} from "./bench-params.ts";
import { sxoPackagesStatus, sxoRunnerReady, sxoSkipReason } from "./sxo-bridge.ts";
import { spawnLegion, valkyrieRunnerReady, valkyrieSkipReason } from "./valkyrie.ts";

const requireFromHere = createRequire(import.meta.url);

function packageVersion(name: string): string | null {
    try {
        const version = requireFromHere(`${name}/package.json`).version;
        return typeof version === "string" ? version : null;
    } catch {
        return null;
    }
}

function probeCommand(command: string, args: string[]): string | null {
    const result = spawnSync(command, args, { encoding: "utf8" });
    const text = `${result.stdout ?? ""}${result.stderr ?? ""}`.trim();
    if (result.status !== 0 || !text) {
        return null;
    }
    return text.split(/\r?\n/)[0]?.trim() ?? null;
}

export function collectHostEnvironment(): HostEnvironment {
    return {
        platform: os.platform(),
        arch: os.arch(),
        osRelease: os.release(),
        nodeVersion: process.version,
    };
}

export function collectPythonBenchEnvironment(): PythonBenchEnvironment {
    const runtimeVersion = probeCommand("python", ["--version"]) ?? "unknown";
    return {
        language: "python",
        runtimeVersion,
        host: collectHostEnvironment(),
        ...PYTHON_BENCH_PARAMS,
    };
}

export function collectTypeScriptBenchEnvironment(): TypeScriptBenchEnvironment {
    const tsxVersion = packageVersion("tsx");
    return {
        language: "typescript",
        nodeVersion: process.version,
        tsxVersion: tsxVersion ? `tsx ${tsxVersion}` : null,
        host: collectHostEnvironment(),
        ...TYPESCRIPT_BENCH_PARAMS,
    };
}

export function collectWolframSxoBenchEnvironment(): WolframSxoBenchEnvironment {
    const status = sxoPackagesStatus();
    return {
        language: "wolfram-sxo",
        sxoMathematicaVersion: status.mathematicaVersion,
        runnerReady: sxoRunnerReady(),
        skipReason: sxoSkipReason(),
        host: collectHostEnvironment(),
        ...SXO_BENCH_PARAMS,
    };
}

export function collectMatlabSxoBenchEnvironment(): MatlabSxoBenchEnvironment {
    const status = sxoPackagesStatus();
    return {
        language: "matlab-sxo",
        sxoMatlabVersion: status.matlabVersion,
        runnerReady: sxoRunnerReady(),
        skipReason: sxoSkipReason(),
        host: collectHostEnvironment(),
        ...SXO_BENCH_PARAMS,
    };
}

export function collectValkyrieBenchEnvironment(): ValkyrieBenchEnvironment {
    const benchTarget = WASM_NODE_BENCH_TARGET;
    let legionVersion: string | null = null;
    let legionRoute: string | null = null;

    if (valkyrieRunnerReady()) {
        const versionOutcome = spawnLegion(["--version"]);
        legionRoute = versionOutcome.route;
        const text = `${versionOutcome.stdout ?? ""}${versionOutcome.stderr ?? ""}`.trim();
        legionVersion = text.split(/\r?\n/)[0]?.trim() || null;
    }

    return {
        language: "valkyrie",
        legionVersion,
        legionRoute,
        benchTarget,
        runnerReady: valkyrieRunnerReady(),
        skipReason: valkyrieSkipReason(),
        host: collectHostEnvironment(),
        ...VALKYRIE_BENCH_PARAMS,
    };
}
