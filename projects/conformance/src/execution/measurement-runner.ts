import type { AttemptRecord, BenchmarkSample, MeasurementOutcome, MeasurementPlan } from "../domain/measurement.ts";

function median(values: number[]): number {
    if (values.length === 0) {
        return 0;
    }
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return (sorted[mid - 1] + sorted[mid]) / 2;
    }
    return sorted[mid];
}

function relativeSpread(values: number[]): number {
    if (values.length < 2) {
        return Number.POSITIVE_INFINITY;
    }
    const med = median(values);
    if (med <= 0) {
        return Number.POSITIVE_INFINITY;
    }
    const deviations = values.map((value) => Math.abs(value - med) / med);
    return Math.max(...deviations);
}

export type SampleFn = (attempt: number, warmup: boolean) => Promise<number>;

/** 按测量计划动态采集样本，保留全部原始尝试。 */
export async function runAdaptiveMeasurement(plan: MeasurementPlan, sampleFn: SampleFn): Promise<MeasurementOutcome> {
    const attempts: AttemptRecord[] = [];
    const rawSamples: BenchmarkSample[] = [];
    const validDurations: number[] = [];
    const startedAt = Date.now();

    for (let attempt = 1; attempt <= plan.maxAttempts; attempt += 1) {
        if (Date.now() - startedAt > plan.timeBudgetMs) {
            break;
        }
        const warmup = attempt <= plan.warmupRuns;
        let durationMs = 0;
        let status: AttemptRecord["status"] = "ok";
        const diagnostics: string[] = [];
        try {
            durationMs = await sampleFn(attempt, warmup);
        } catch (err) {
            status = "error";
            diagnostics.push(String(err));
        }

        const sample: BenchmarkSample = {
            attempt,
            boundary: plan.boundary,
            durationMs,
            discarded: warmup || status !== "ok",
            discardReason: warmup ? "warmup" : status !== "ok" ? status : undefined,
        };
        rawSamples.push(sample);
        attempts.push({
            attempt,
            status,
            durationMs,
            samples: [sample],
            diagnostics,
            timestamp: new Date().toISOString(),
        });

        if (!sample.discarded && durationMs > 0) {
            validDurations.push(durationMs);
        }

        if (validDurations.length >= plan.minValidSamples && relativeSpread(validDurations) <= plan.maxRelativeSpread) {
            break;
        }
    }

    let stability: MeasurementOutcome["stability"] = "insufficient";
    let publishedValueMs: number | null = null;
    if (validDurations.length >= plan.minValidSamples) {
        const spread = relativeSpread(validDurations);
        if (spread <= plan.maxRelativeSpread) {
            stability = "stable";
            publishedValueMs = median(validDurations);
        } else {
            stability = "unstable";
        }
    }

    return {
        plan,
        attempts,
        aggregation: "median",
        publishedValueMs,
        stability,
        rawSamples,
    };
}
