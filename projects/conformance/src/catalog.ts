export { PROBLEMS, type ProblemDefinition } from "./catalog.generated.ts";

import { existsSync } from "node:fs";
import { join } from "node:path";

/** 题目根目录（metadata.json、solvers/）。 */
export function problemDir(root: string, problem: { id: string }): string {
    return join(root, "projects", "problems", problem.id);
}

/** V 工程目录：`solvers/valkyrie/`（`legion.von` + `solution.v`）。 */
export function valkyrieProjectDir(root: string, problem: { id: string }): string {
    return join(problemDir(root, problem), "solvers", "valkyrie");
}

/** `legion test` / `bench` / `build` 入参。 */
export function legionProjectDir(root: string, problem: { id: string }): string {
    const flat = valkyrieProjectDir(root, problem);
    if (existsSync(join(flat, "legion.von"))) {
        return flat;
    }
    return flat;
}
