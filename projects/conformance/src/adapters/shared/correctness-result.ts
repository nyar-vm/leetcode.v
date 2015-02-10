import type { ImplementationId } from '../ids.ts';
import type { ProblemSpec } from '../../domain/problem.ts';
import type { RunResult } from '../../domain/result.ts';

const ADAPTER_VERSION = '0.2.0';

export function runResultFromReference(
    problem: ProblemSpec,
    implementationId: ImplementationId,
    ref: { ok: boolean; stderr: string },
    startedAt: string,
    blockedReason?: string,
): RunResult {
    const finishedAt = new Date().toISOString();
    const status = ref.ok ? 'passed' : blockedReason ? 'blocked' : 'failed';
    return {
        runId: '',
        problemId: problem.id,
        implementationId,
        mode: 'correctness',
        status,
        blockedReason: ref.ok ? undefined : blockedReason,
        cases: problem.tests.map((test, index) => ({
            index,
            status: ref.ok ? 'passed' : status === 'blocked' ? 'blocked' : 'failed',
            expected: test.expected,
        })),
        diagnostics: ref.ok ? [] : [ref.stderr],
        toolchain: { implementationId, adapterVersion: ADAPTER_VERSION },
        startedAt,
        finishedAt,
    };
}
