import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import type { ProblemDefinition } from '../../catalog/index.ts';
import { problemDir } from '../../catalog/index.ts';
import { CONFORMANCE_ROOT, LEETCODE_ROOT } from '../../domain/paths.ts';

export const PYTHON_BENCH_CHECKER = join(CONFORMANCE_ROOT, 'scripts', 'run_python_solver.py');
const CHECKER = PYTHON_BENCH_CHECKER;

export function pythonSolverDir(problemRoot: string): string {
    return join(problemRoot, 'solvers', 'python');
}

export function pythonSolverPath(problemRoot: string): string {
    return join(pythonSolverDir(problemRoot), 'solution.py');
}

export function pythonProjectManifestPath(problemRoot: string): string {
    return join(pythonSolverDir(problemRoot), 'pyproject.toml');
}

export function pythonRefReady(): boolean {
    const probe = spawnSync('python', ['--version'], { encoding: 'utf8' });
    return probe.status === 0;
}

export function pythonSkipReason(): string | null {
    if (pythonRefReady()) {
        return null;
    }
    return 'Python 未就绪：需要 python 3 以运行 solver';
}

export function hasPythonSolver(problemRoot: string): boolean {
    return existsSync(pythonProjectManifestPath(problemRoot)) && existsSync(pythonSolverPath(problemRoot));
}

export function runPythonSolver(problem: ProblemDefinition): { ok: boolean; stderr: string } {
    const root = problemDir(LEETCODE_ROOT, problem);
    if (!hasPythonSolver(root)) {
        return { ok: false, stderr: 'missing solvers/python/pyproject.toml or solution.py' };
    }
    const result = spawnSync('python', [CHECKER, root], {
        encoding: 'utf8',
        cwd: pythonSolverDir(root),
    });
    const stderr = `${result.stderr ?? ''}${result.stdout ?? ''}`.trim();
    return { ok: result.status === 0, stderr };
}

export const runPythonReference = runPythonSolver;
