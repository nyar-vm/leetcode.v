export { PROBLEMS, problemDir, type ProblemDefinition } from './catalog/index.ts';

export { runCli } from './cli/run.ts';
export type { RunRequest, RunResult, RunStatus, ProblemSpec } from './domain/index.ts';
export { getAdapter, allAdapters, hasSolver } from './adapters/registry.ts';
export type { ImplementationId } from './adapters/ids.ts';
export {
    writeDashboardProjection,
    writeAllDashboardProjections,
} from './reporting/dashboard-projection.ts';
export { readIndex, writeRunRecord, listCurrentRunRecords } from './reporting/cache/store.ts';
