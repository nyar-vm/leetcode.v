import type { SolverAdapter } from '../domain/adapter.ts';
import { ALL_IMPLEMENTATION_IDS, type ImplementationId } from './ids.ts';
import { problemDir } from '../catalog/index.ts';
import { LEETCODE_ROOT } from '../domain/paths.ts';
import { hasPythonSolver, pythonRefReady } from './python/ref.ts';
import { hasReadyTsSolver } from './typescript-node/ref.ts';
import { bunRunnerReady } from './typescript-bun/bridge.ts';
import { hasValkyrieSolver, valkyrieRunnerReady } from './valkyrie-node/valkyrie.ts';
import { hasWolframSxoSolver, hasMatlabSxoSolver } from './shared/sxo-solver-shared.ts';
import { sxoRunnerReady } from './shared/sxo-bridge.ts';

type AdapterLoader = () => Promise<SolverAdapter>;

const ADAPTER_LOADERS: Record<ImplementationId, AdapterLoader> = {
    python: () => import('./python/adapter.ts').then((module) => module.pythonAdapter),
    'typescript-node': () => import('./typescript-node/adapter.ts').then((module) => module.typescriptNodeAdapter),
    'typescript-bun': () => import('./typescript-bun/adapter.ts').then((module) => module.typescriptBunAdapter),
    'valkyrie-node': () => import('./valkyrie-node/adapter.ts').then((module) => module.valkyrieNodeAdapter),
    'wolfram-sxo': () => import('./wolfram-sxo/adapter.ts').then((module) => module.wolframSxoAdapter),
    'matlab-sxo': () => import('./matlab-sxo/adapter.ts').then((module) => module.matlabSxoAdapter),
};

const DISCOVER: Record<ImplementationId, (problemRoot: string) => boolean> = {
    python: hasPythonSolver,
    'typescript-node': hasReadyTsSolver,
    'typescript-bun': hasReadyTsSolver,
    'valkyrie-node': hasValkyrieSolver,
    'wolfram-sxo': hasWolframSxoSolver,
    'matlab-sxo': hasMatlabSxoSolver,
};

const RUNNER_READY: Record<ImplementationId, () => boolean> = {
    python: pythonRefReady,
    'typescript-node': () => true,
    'typescript-bun': bunRunnerReady,
    'valkyrie-node': valkyrieRunnerReady,
    'wolfram-sxo': sxoRunnerReady,
    'matlab-sxo': sxoRunnerReady,
};

const adapterCache = new Map<ImplementationId, Promise<SolverAdapter>>();

export async function getAdapter(implementationId: string): Promise<SolverAdapter> {
    const id = implementationId as ImplementationId;
    const loader = ADAPTER_LOADERS[id];
    if (!loader) {
        throw new Error(`未知适配器 ${implementationId}`);
    }
    if (!adapterCache.has(id)) {
        adapterCache.set(id, loader());
    }
    return adapterCache.get(id)!;
}

export async function allAdapters(): Promise<SolverAdapter[]> {
    return Promise.all(ALL_IMPLEMENTATION_IDS.map((id) => getAdapter(id)));
}

export function adapterReady(implementationId: ImplementationId): boolean {
    return RUNNER_READY[implementationId]();
}

export function hasSolver(implementationId: ImplementationId, problemId: string): boolean {
    const root = problemDir(LEETCODE_ROOT, { id: problemId });
    return DISCOVER[implementationId](root);
}

export { ALL_IMPLEMENTATION_IDS, pythonRefReady };
