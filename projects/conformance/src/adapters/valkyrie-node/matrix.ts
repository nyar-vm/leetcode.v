import type { ProblemDefinition } from "../../catalog/index.ts";
import { formatLegionError, legionBuild, legionTest } from "./valkyrie.ts";

export type ValkyrieMatrixRow = {
    id: string;
    buildStatus: number;
    testStatus: number;
    buildRoute: string | null;
    testRoute: string | null;
    buildError: string | null;
    testError: string | null;
};

export function probeValkyrieProblem(
    problem: ProblemDefinition,
    projectPath: string,
    outDir: string,
): ValkyrieMatrixRow {
    const build = legionBuild(projectPath, outDir);
    const test = legionTest(projectPath);

    return {
        id: problem.id,
        buildStatus: build.status,
        testStatus: test.status,
        buildRoute: build.route,
        testRoute: test.route,
        buildError: build.status === 0 ? null : formatLegionError("legion build", build),
        testError: test.status === 0 ? null : formatLegionError("legion test", test),
    };
}

export function isValkyrieGreen(row: ValkyrieMatrixRow): boolean {
    return row.buildStatus === 0 && row.testStatus === 0;
}
