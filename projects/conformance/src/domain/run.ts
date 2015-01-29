import type { MeasurementPlan } from "./measurement.ts";

export type RunMode = "correctness" | "benchmark";

/** 一次运行的请求合同。 */
export type RunRequest = {
    problemId: string;
    implementationId: string;
    mode: RunMode;
    measurementPlan?: MeasurementPlan;
    /** 报告或缓存写入根；缺省由 CLI 解析为仓根 `.cache/conformance/`。 */
    outputRoot?: string;
    /** 运行 profile 名，决定 blocked 是否阻断门禁。 */
    profile?: string;
};
