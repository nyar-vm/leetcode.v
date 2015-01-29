import { describe, expect, it } from "vitest";

import { runAdaptiveMeasurement } from "../src/execution/measurement-runner.ts";
import { defaultMeasurementPlan } from "../src/planning/measurement-plan.ts";

describe("runAdaptiveMeasurement", () => {
    it("stops when spread is within threshold", async () => {
        const plan = {
            ...defaultMeasurementPlan("Easy"),
            warmupRuns: 1,
            minValidSamples: 3,
            maxAttempts: 20,
            maxRelativeSpread: 0.05,
        };
        const outcome = await runAdaptiveMeasurement(plan, async () => 10);
        expect(outcome.stability).toBe("stable");
        expect(outcome.publishedValueMs).toBe(10);
        expect(outcome.rawSamples.length).toBeGreaterThanOrEqual(4);
    });

    it("marks unstable when spread exceeds threshold", async () => {
        const plan = {
            ...defaultMeasurementPlan("Easy"),
            warmupRuns: 0,
            minValidSamples: 5,
            maxAttempts: 10,
            maxRelativeSpread: 0.01,
        };
        let call = 0;
        const outcome = await runAdaptiveMeasurement(plan, async () => {
            call += 1;
            return call % 2 === 0 ? 20 : 10;
        });
        expect(outcome.stability).toBe("unstable");
        expect(outcome.publishedValueMs).toBeNull();
    });
});
