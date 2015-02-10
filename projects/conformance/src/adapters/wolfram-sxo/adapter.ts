import { collectWolframSxoBenchEnvironment } from '../../reporting/environment.ts';
import { defineSolverAdapter } from '../factory.ts';
import { runResultFromReference } from '../shared/correctness-result.ts';
import { sxoRunnerReady, sxoSkipReason } from '../shared/sxo-bridge.ts';
import { hasWolframSxoSolver } from '../shared/sxo-solver-shared.ts';
import { benchWolframSxoProblem } from './bench.ts';
import { runWolframSxoReference } from './ref.ts';

export const wolframSxoAdapter = defineSolverAdapter({
    implementationId: 'wolfram-sxo',
    hasSolver: hasWolframSxoSolver,
    runnerReady: sxoRunnerReady,
    blockedReason: sxoSkipReason,
    collectEnvironment: collectWolframSxoBenchEnvironment,
    async benchProblem(problem) {
        return { runtimeMs: await benchWolframSxoProblem(problem) };
    },
    async runCorrectness(problem, problemRoot) {
        const startedAt = new Date().toISOString();
        if (!hasWolframSxoSolver(problemRoot)) {
            return runResultFromReference(problem, 'wolfram-sxo', { ok: false, stderr: 'solver not found' }, startedAt, 'solver not found');
        }
        const ref = await runWolframSxoReference({ id: problem.id, title: problem.title });
        return runResultFromReference(problem, 'wolfram-sxo', ref, startedAt);
    },
});
