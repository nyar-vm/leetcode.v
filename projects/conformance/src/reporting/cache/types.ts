import type { MeasurementOutcome } from '../../domain/measurement.ts';
import type { RunResult } from '../../domain/result.ts';

export type RunManifest = {
    runId: string;
    problemId: string;
    implementationId: string;
    mode: 'correctness' | 'benchmark';
    createdAt: string;
    sourceDigest: string;
    adapterVersion: string;
    toolchain: Record<string, unknown>;
    measurementPlan?: Record<string, unknown>;
    profile?: string;
};

export type RunRecord = {
    manifest: RunManifest;
    result: RunResult;
    measurement?: MeasurementOutcome;
};

export type IndexEntry = {
    runId: string;
    createdAt: string;
    sourceDigest: string;
    status: RunResult['status'];
    current: boolean;
};

export type ConformanceIndex = {
    updatedAt: string;
    entries: Record<string, IndexEntry>;
};

/** `problemId:implementationId:mode` */
export function indexKey(problemId: string, implementationId: string, mode: 'correctness' | 'benchmark'): string {
    return `${problemId}:${implementationId}:${mode}`;
}
