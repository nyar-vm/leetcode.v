import { collectMatlabSxoBenchEnvironment } from '../../reporting/environment.ts';
import { defineSolverAdapter } from '../factory.ts';
import { runResultFromReference } from '../shared/correctness-result.ts';
import { sxoRunnerReady, sxoSkipReason } from '../shared/sxo-bridge.ts';
import { hasMatlabSxoSolver } from '../shared/sxo-solver-shared.ts';
import { benchMatlabSxoProblem } from './bench.ts';
import { runMatlabSxoReference } from './ref.ts';

export const matlabSxoAdapter = defineSolverAdapter({
    implementationId: 'matlab-sxo',
    hasSolver: hasMatlabSxoSolver,
    runnerReady: sxoRunnerReady,
    blockedReason: sxoSkipReason,
    collectEnvironment: collectMatlabSxoBenchEnvironment,
    async benchProblem(problem) {
        return { runtimeMs: await benchMatlabSxoProblem(problem) };
    },
    async runCorrectness(problem, problemRoot) {
        const startedAt = new Date().toISOString();
        if (!hasMatlabSxoSolver(problemRoot)) {
            return runResultFromReference(problem, 'matlab-sxo', { ok: false, stderr: 'solver not found' }, startedAt, 'solver not found');
        }
        const ref = await runMatlabSxoReference({ id: problem.id, title: problem.title });
        return runResultFromReference(problem, 'matlab-sxo', ref, startedAt);
    },
});
