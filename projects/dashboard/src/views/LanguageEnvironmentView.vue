<script setup lang="ts">
import { AlertCircle, CheckCircle2, Cpu, Server } from "@lucide/vue";
import { computed } from "vue";

import AppIcon from "../components/AppIcon.vue";
import EmptyState from "../components/EmptyState.vue";
import { useBenchReport } from "../composables/useBenchReport";
import type {
    BenchEnvironments,
    HostEnvironment,
    MatlabSxoBenchEnvironment,
    PythonBenchEnvironment,
    TypeScriptBenchEnvironment,
    TypeScriptBunBenchEnvironment,
    ValkyrieBenchEnvironment,
    WolframSxoBenchEnvironment,
} from "../types/bench";

const { report } = useBenchReport();

const environments = computed(() => report.value?.environments ?? null);
const sources = computed(() => report.value?.sources ?? null);

type EnvCard = {
    key: keyof BenchEnvironments;
    title: string;
    subtitle: string;
    ready: boolean;
    versionRows: { label: string; value: string }[];
    paramRows: { label: string; value: string }[];
    host: HostEnvironment | null;
    note?: string;
};

function hostRows(host: HostEnvironment | null) {
    if (!host) {
        return [];
    }
    return [
        { label: "平台", value: `${host.platform} / ${host.arch}` },
        { label: "OS", value: host.osRelease },
        { label: "Node", value: host.nodeVersion },
    ];
}

function pythonCard(env: PythonBenchEnvironment | null, ready: boolean): EnvCard | null {
    if (!env) {
        return null;
    }
    return {
        key: "python",
        title: "Python",
        subtitle: "单进程加载后只计 metadata.tests 循环",
        ready,
        versionRows: [{ label: "Python", value: env.runtimeVersion }],
        paramRows: [
            { label: "计时范围", value: env.timingScope ?? "in-process-metadata-tests" },
            { label: "指标", value: `${env.metric}（${env.aggregation}）` },
            { label: "采样", value: `${env.iterations} 次` },
            { label: "预热", value: `${env.warmup} 次` },
        ],
        host: env.host,
    };
}

function typescriptCard(env: TypeScriptBenchEnvironment | null, ready: boolean): EnvCard | null {
    if (!env) {
        return null;
    }
    return {
        key: "typescript",
        title: "TypeScript",
        subtitle: "单进程加载后只计 metadata.tests 循环",
        ready,
        versionRows: [
            { label: "Node", value: env.nodeVersion },
            { label: "tsx", value: env.tsxVersion ?? "—" },
        ],
        paramRows: [
            { label: "Runner", value: env.runner },
            { label: "计时范围", value: env.timingScope ?? "in-process-metadata-tests" },
            { label: "指标", value: `${env.metric}（${env.aggregation}）` },
            { label: "采样", value: `${env.iterations} 次` },
            { label: "预热", value: `${env.warmup} 次` },
        ],
        host: env.host,
    };
}

function typescriptBunCard(env: TypeScriptBunBenchEnvironment | null, ready: boolean): EnvCard | null {
    if (!env) {
        return null;
    }
    return {
        key: "typescriptBun",
        title: "TypeScript (Bun)",
        subtitle: "Bun 子进程内加载题解，只计 metadata.tests 循环",
        ready,
        versionRows: [{ label: "Bun", value: env.bunVersion ?? "—" }],
        paramRows: [
            { label: "Runner", value: env.runner },
            { label: "计时范围", value: env.timingScope ?? "in-process-metadata-tests" },
            { label: "指标", value: `${env.metric}（${env.aggregation}）` },
            { label: "采样", value: `${env.iterations} 次` },
            { label: "预热", value: `${env.warmup} 次` },
        ],
        host: env.host,
        note: env.skipReason && !env.runnerReady ? env.skipReason : undefined,
    };
}

function wolframSxoCard(env: WolframSxoBenchEnvironment | null, ready: boolean): EnvCard | null {
    if (!env) {
        return null;
    }
    return {
        key: "wolframSxo",
        title: "Wolfram (Sxo)",
        subtitle: "单进程 @sxo/mathematica，只计 metadata.tests 循环",
        ready,
        versionRows: [{ label: "@sxo/mathematica", value: env.sxoMathematicaVersion ?? "—" }],
        paramRows: [
            { label: "计时范围", value: env.timingScope ?? "in-process-metadata-tests" },
            { label: "指标", value: `${env.metric}（${env.aggregation}）` },
            { label: "采样", value: `${env.iterations} 次` },
            { label: "预热", value: `${env.warmup} 次` },
        ],
        host: env.host,
        note: env.skipReason && !env.runnerReady ? env.skipReason : undefined,
    };
}

function matlabSxoCard(env: MatlabSxoBenchEnvironment | null, ready: boolean): EnvCard | null {
    if (!env) {
        return null;
    }
    return {
        key: "matlabSxo",
        title: "MATLAB (Sxo)",
        subtitle: "单进程 @sxo/matlab，只计 metadata.tests 循环",
        ready,
        versionRows: [{ label: "@sxo/matlab", value: env.sxoMatlabVersion ?? "—" }],
        paramRows: [
            { label: "计时范围", value: env.timingScope ?? "in-process-metadata-tests" },
            { label: "指标", value: `${env.metric}（${env.aggregation}）` },
            { label: "采样", value: `${env.iterations} 次` },
            { label: "预热", value: `${env.warmup} 次` },
        ],
        host: env.host,
        note: env.skipReason && !env.runnerReady ? env.skipReason : undefined,
    };
}

function valkyrieCard(env: ValkyrieBenchEnvironment | null, ready: boolean): EnvCard | null {
    if (!env) {
        return null;
    }
    return {
        key: "valkyrie",
        title: "V (wasm)",
        subtitle: "legion build --target node 外部 harness",
        ready,
        versionRows: [
            { label: "legion", value: env.legionVersion ?? "—" },
            { label: "route", value: env.legionRoute ?? "—" },
            { label: "target", value: env.benchTarget },
        ],
        paramRows: [
            { label: "编译指标", value: `${env.compileMetric}（${env.aggregation}）` },
            { label: "编译采样", value: `${env.compileRuns} 次` },
            { label: "预热", value: `${env.warmup} 次` },
            { label: "运行指标", value: `${env.runtimeMetric}（${env.runtimeStatus}）` },
        ],
        host: env.host,
        note: env.skipReason && !env.runnerReady ? env.skipReason : undefined,
    };
}

const cards = computed(() => {
    const env = environments.value;
    const src = sources.value;
    if (!env) {
        return [];
    }
    return [
        pythonCard(env.python, src?.python?.ready ?? false),
        typescriptCard(env.typescript, src?.typescript?.ready ?? false),
        valkyrieCard(env.valkyrie, src?.valkyrie?.ready ?? false),
        wolframSxoCard(env.wolframSxo, src?.wolframSxo?.ready ?? false),
        matlabSxoCard(env.matlabSxo, src?.matlabSxo?.ready ?? false),
    ].filter((card): card is EnvCard => card !== null);
});

const missingLanguages = computed(() => {
    const env = environments.value;
    if (!env) {
        return ["Python", "TypeScript", "TypeScript (Bun)", "Valkyrie", "Wolfram (Sxo)", "MATLAB (Sxo)"];
    }
    const missing: string[] = [];
    if (!env.python) {
        missing.push("Python");
    }
    if (!env.typescript) {
        missing.push("TypeScript");
    }
    if (!env.typescriptBun) {
        missing.push("TypeScript (Bun)");
    }
    if (!env.valkyrie) {
        missing.push("V (wasm)");
    }
    if (!env.wolframSxo) {
        missing.push("Wolfram (Sxo)");
    }
    if (!env.matlabSxo) {
        missing.push("MATLAB (Sxo)");
    }
    return missing;
});
</script>

<template>
    <EmptyState
        v-if="!report"
        title="暂无数据"
        description="请先运行 pnpm bench 生成各语言基准结果。"
    />

    <EmptyState
        v-else-if="cards.length === 0"
        title="暂无语言环境元数据"
        description="缺少 environment 字段。请重新执行基准以生成版本与计时参数。"
    />

    <section v-else class="env-layout">
        <article v-if="missingLanguages.length" class="panel env-hint">
            <p class="muted">
                未加载：
                <strong>{{ missingLanguages.join("、") }}</strong>
                。可在对应机器单独跑 bench 后刷新看板合并。
            </p>
        </article>

        <div class="env-grid">
            <article v-for="card in cards" :key="card.key" class="panel env-card">
                <div class="panel-head">
                    <div>
                        <h2 class="panel-title">
                            <AppIcon :icon="Cpu" :size="18" />
                            <span>{{ card.title }}</span>
                        </h2>
                        <p class="row-meta">{{ card.subtitle }}</p>
                    </div>
                    <div class="status-pill" :class="{ ready: card.ready }">
                        <AppIcon
                            :icon="card.ready ? CheckCircle2 : AlertCircle"
                            :size="15"
                            :stroke-width="2.25"
                        />
                        <span>{{ card.ready ? "就绪" : "未就绪" }}</span>
                    </div>
                </div>

                <dl class="env-dl">
                    <template v-for="row in card.versionRows" :key="`${card.key}-v-${row.label}`">
                        <dt>{{ row.label }}</dt>
                        <dd><code>{{ row.value }}</code></dd>
                    </template>
                </dl>

                <h3 class="env-section-title">计时参数</h3>
                <dl class="env-dl">
                    <template v-for="row in card.paramRows" :key="`${card.key}-p-${row.label}`">
                        <dt>{{ row.label }}</dt>
                        <dd>{{ row.value }}</dd>
                    </template>
                </dl>

                <h3 class="env-section-title">
                    <AppIcon :icon="Server" :size="15" />
                    <span>宿主环境</span>
                </h3>
                <dl class="env-dl">
                    <template v-for="row in hostRows(card.host)" :key="`${card.key}-h-${row.label}`">
                        <dt>{{ row.label }}</dt>
                        <dd><code>{{ row.value }}</code></dd>
                    </template>
                </dl>

                <p v-if="card.note" class="env-note">{{ card.note }}</p>
            </article>
        </div>
    </section>
</template>
