import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PACKAGE_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

export const BUN_SOLVER_SCRIPT = join(PACKAGE_ROOT, "scripts", "run_bun_solver.ts");

function localBunBin(): string | null {
    const candidates = [
        join(PACKAGE_ROOT, "node_modules", "bun", "bin", "bun.exe"),
        join(PACKAGE_ROOT, "node_modules", "bun", "bin", "bun"),
        join(PACKAGE_ROOT, "node_modules", ".bin", "bun.exe"),
        join(PACKAGE_ROOT, "node_modules", ".bin", "bun"),
        join(PACKAGE_ROOT, "..", "..", "node_modules", "bun", "bin", "bun.exe"),
        join(PACKAGE_ROOT, "..", "..", "node_modules", ".bin", "bun.exe"),
        join(PACKAGE_ROOT, "..", "..", "node_modules", ".bin", "bun"),
    ];
    return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

/** Bun 可执行路径：`BUN_PATH` → 项目 `node_modules/.bin` → PATH 上的 `bun`。 */
export function bunExecutable(): string {
    const fromEnv = process.env.BUN_PATH?.trim();
    if (fromEnv && existsSync(fromEnv)) {
        return fromEnv;
    }
    const local = localBunBin();
    if (local) {
        return local;
    }
    return "bun";
}

function probeBun(exe: string): { ok: boolean; version: string | null } {
    const useShell =
        exe === "bun" ||
        exe.endsWith(".CMD") ||
        (process.platform === "win32" && exe.endsWith(".bin/bun"));
    const result = spawnSync(exe, ["--version"], {
        encoding: "utf8",
        shell: useShell,
    });
    if (result.status !== 0) {
        return { ok: false, version: null };
    }
    const text = `${result.stdout ?? ""}${result.stderr ?? ""}`.trim().split(/\r?\n/)[0]?.trim();
    return { ok: true, version: text || null };
}

export function bunRunnerReady(): boolean {
    return probeBun(bunExecutable()).ok;
}

export function bunVersion(): string | null {
    return probeBun(bunExecutable()).version;
}

export function bunSkipReason(): string | null {
    if (bunRunnerReady()) {
        return null;
    }
    return "Bun 未就绪：请 pnpm install 并在仓库根执行 pnpm approve-builds 放行 bun，或安装全局 bun 并设置 BUN_PATH";
}

export function spawnBunSolver(args: string[]): {
    status: number | null;
    stdout: string;
    stderr: string;
} {
    const exe = bunExecutable();
    const useShell =
        exe === "bun" ||
        exe.endsWith(".CMD") ||
        (process.platform === "win32" && exe.endsWith(".bin/bun"));
    const result = spawnSync(exe, [BUN_SOLVER_SCRIPT, ...args], {
        encoding: "utf8",
        cwd: PACKAGE_ROOT,
        shell: useShell,
    });
    return {
        status: result.status,
        stdout: result.stdout ?? "",
        stderr: result.stderr ?? "",
    };
}
