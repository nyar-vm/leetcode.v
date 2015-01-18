import { describe, expect, it } from "vitest";

import { bunRunnerReady, bunVersion } from "../src/runner/bun-bridge.ts";

describe("bun-bridge", () => {
    it("reports bun readiness after pnpm install", () => {
        if (!bunRunnerReady()) {
            expect(bunVersion()).toBeNull();
            return;
        }
        expect(bunVersion()).toMatch(/^\d+\.\d+/);
    });
});
