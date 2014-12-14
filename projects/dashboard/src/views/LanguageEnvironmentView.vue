<script setup lang="ts">
import { AlertCircle, CheckCircle2, Cpu, Server } from "@lucide/vue";
import { computed } from "vue";

import AppIcon from "../components/AppIcon.vue";
import EmptyState from "../components/EmptyState.vue";
import { useBenchReport } from "../composables/useBenchReport";
import { formatDate } from "../utils/format";
import type {
    BenchEnvironments,
    HostEnvironment,
    PythonBenchEnvironment,
    TypeScriptBenchEnvironment,
    ValkyrieBenchEnvironment,
} from "../types/bench";

const { report } = useBenchReport();

const environments = computed(() => report.value?.environments ?? null);
const sources = computed(() => report.value?.sources ?? null);

type EnvCard = {
    key: keyof BenchEnvironments;
    title: string;
    subtitle: string;
    ready: boolean;
    snapshotAt: string | null;
    rowCount: number | null;
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

function pythonCard(env: PythonBenchEnvironment | null, ready: boolean, snapshotAt: string | null, rowCount: number | null): EnvCard | null {
    if (!env) {
        return null;
    }
    return {
        key: "python",
        title: "Python",
        subtitle: "LCD 脚手架 · metadata.tests 外部 harness",
        ready,
        snapshotAt,
        rowCount,
        versionRows: [{ label: "Python", value: env.runtimeVersion }],
        paramRows: [
            { label: "指标", value: `${env.metric}（${env.aggregation}）` },
            { label: "采样", value: `${env.iterations} 次` },
            { label: "预热", value: `${env.warmup} 次` },
        ],
        host: env.host,
    };
}

function typescriptCard(
    env: TypeScriptBenchEnvironment | null,
    ready: boolean,
    snapshotAt: string | null,
    rowCount: number | null,
): EnvCard | null {
    if (!env) {
        return null;
    }
    return {
        key: "typescript",
        title: "TypeScript",
        subtitle: "tsx 加载 solution.ts · metadata.tests",
        ready,
        snapshotAt,
        rowCount,
        versionRows: [
            { label: "Node", value: env.nodeVersion },
            { label: "tsx", value: env.tsxVersion ?? "—" },
        ],
        paramRows: [
            { label: "Runner", value: env.runner },
            { label: "指标", value: `${env.metric}（${env.aggregation}）` },
            { label: "采样", value: `${env.iterations} 次` },
            { label: "预热", value: `${env.warmup} 次` },
        ],
        host: env.host,
    };
}

function valkyrieCard(
    env: ValkyrieBenchEnvironment | null,
    ready: boolean,
    snapshotAt: string | null,
    rowCount: number | null,
): EnvCard | null {
    if (!env) {
        return null;
    }
    return {
        key: "valkyrie",
        title: "Valkyrie / Wasm",
        subtitle: "legion build --target node 外部 harness",
        ready,
        snapshotAt,
        rowCount,
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
        pythonCard(env.python, src?.python?.ready ?? false, src?.python?.generatedAt ?? null, src?.python?.rowCount ?? null),
        typescriptCard(
            env.typescript,
            src?.typescript?.ready ?? false,
            src?.typescript?.generatedAt ?? null,
            src?.typescript?.rowCount ?? null,
        ),
        valkyrieCard(
            env.valkyrie,
            src?.valkyrie?.ready ?? false,
            src?.valkyrie?.generatedAt ?? null,
            src?.valkyrie?.rowCount ?? null,
        ),
    ].filter((card): card is EnvCard => card !== null);
});

const missingLanguages = computed(() => {
    const env = environments.value;
    if (!env) {
        return ["Python", "TypeScript", "Valkyrie"];
    }
    const missing: string[] = [];
    if (!env.python) {
        missing.push("Python");
    }
    if (!env.typescript) {
        missing.push("TypeScript");
    }
    if (!env.valkyrie) {
        missing.push("Valkyrie");
    }
    return missing;
});
</script>

<template>
    <EmptyState
        v-if="!report"
        title="暂无基准快照"
        description="语言环境信息随各语言 benchmark-*.json 写入。请先跑 pnpm bench:python / bench:typescript / bench:valkyrie。"
    />

    <EmptyState
        v-else-if="cards.length === 0"
        title="暂无语言环境元数据"
        description="当前快照缺少 environment 字段。请重新执行基准以生成版本与计时参数。"
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

                <p v-if="card.snapshotAt" class="env-foot muted">
                    快照 {{ formatDate(card.snapshotAt) }}
                    <template v-if="card.rowCount !== null"> · {{ card.rowCount }} 题</template>
                </p>
            </article>
        </div>
    </section>
</template>
