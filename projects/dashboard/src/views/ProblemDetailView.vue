<script setup lang="ts">
import {
    AlertTriangle,
    BookOpen,
    ChevronLeft,
    ExternalLink,
    FileCode2,
    Filter,
    Search,
    Timer,
} from "@lucide/vue";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import AppIcon from "../components/AppIcon.vue";
import DifficultyBadge from "../components/DifficultyBadge.vue";
import EmptyState from "../components/EmptyState.vue";
import MarkdownContent from "../components/MarkdownContent.vue";
import { useBenchReport } from "../composables/useBenchReport";
import { useProblemReadme } from "../composables/useProblemReadme";
import { enrichBenchRow, leetcodeUrl } from "../composables/useProblemCatalog";
import { formatMs, ratioLabel, runtimeRatio } from "../utils/format";

const route = useRoute();
const router = useRouter();
const { report } = useBenchReport();

const problemId = computed(() => String(route.params.id));

const row = computed(() => {
    const match = report.value?.rows.find((item) => item.id === problemId.value);
    return match ? enrichBenchRow(match) : null;
});

const ratio = computed(() => (row.value ? runtimeRatio(row.value) : null));

const { content: readme, loading: readmeLoading, error: readmeError } = useProblemReadme(problemId);
</script>

<template>
    <button class="btn ghost back-btn icon-btn" @click="router.back()">
        <AppIcon :icon="ChevronLeft" :size="16" />
        <span>返回</span>
    </button>

    <EmptyState
        v-if="!report"
        title="暂无数据"
        description="请先运行 pnpm bench 生成基准结果。"
    />

    <EmptyState
        v-else-if="!row"
        title="未找到该题目"
        description="当前批次中没有此 slug 的基准记录。"
    />

    <section v-else class="detail-grid">
        <article class="panel">
            <div class="panel-head">
                <h2 class="panel-title">
                    <AppIcon :icon="FileCode2" :size="18" />
                    <span>元数据</span>
                </h2>
                <DifficultyBadge :difficulty="row.difficulty" />
            </div>
            <dl class="detail-list">
                <div>
                    <dt>Slug</dt>
                    <dd><code>{{ row.id }}</code></dd>
                </div>
                <div>
                    <dt>题号</dt>
                    <dd>#{{ row.questionId || "—" }}</dd>
                </div>
                <div>
                    <dt>标签</dt>
                    <dd>
                        <span v-if="!row.tags.length" class="muted">—</span>
                        <span v-for="tag in row.tags" :key="tag" class="inline-tag">{{ tag }}</span>
                    </dd>
                </div>
                <div>
                    <dt>LeetCode</dt>
                    <dd>
                        <a class="text-link icon-link" :href="leetcodeUrl(row.id)" target="_blank" rel="noreferrer">
                            <span>打开题面</span>
                            <AppIcon :icon="ExternalLink" :size="14" />
                        </a>
                    </dd>
                </div>
            </dl>
        </article>

        <article class="panel">
            <div class="panel-head">
                <h2 class="panel-title">
                    <AppIcon :icon="Timer" :size="18" />
                    <span>计时</span>
                </h2>
                <span class="ratio" :class="ratio !== null && ratio < 1 ? 'v-win' : ratio !== null && ratio > 1 ? 'ts-win' : ''">
                    {{ ratioLabel(row) }}
                </span>
            </div>
            <dl class="detail-list">
                <div>
                    <dt>Python 运行</dt>
                    <dd class="num">{{ formatMs(row.pyRuntimeMs) }} ms</dd>
                </div>
                <div>
                    <dt>TypeScript 运行</dt>
                    <dd class="num">{{ formatMs(row.tsRuntimeMs) }} ms</dd>
                </div>
                <div>
                    <dt>TypeScript (Bun) 运行</dt>
                    <dd class="num">{{ formatMs(row.tbRuntimeMs) }} ms</dd>
                </div>
                <div>
                    <dt>V 编译</dt>
                    <dd class="num">{{ formatMs(row.vCompileMs) }} ms</dd>
                </div>
                <div>
                    <dt>V (wasm) 运行</dt>
                    <dd class="num">{{ formatMs(row.vRuntimeMs) }} ms</dd>
                </div>
                <div>
                    <dt>Wolfram (Sxo) 运行</dt>
                    <dd class="num">{{ formatMs(row.wlRuntimeMs) }} ms</dd>
                </div>
                <div>
                    <dt>MATLAB (Sxo) 运行</dt>
                    <dd class="num">{{ formatMs(row.mlRuntimeMs) }} ms</dd>
                </div>
                <div>
                    <dt>Legion route</dt>
                    <dd>{{ row.legionRoute ?? "—" }}</dd>
                </div>
                <div>
                    <dt>Bench target</dt>
                    <dd>{{ row.benchTarget }}</dd>
                </div>
            </dl>
        </article>

        <article
            v-if="row.pyError || row.tsError || row.tbError || row.vError || row.wlError || row.mlError || row.error"
            class="panel error-panel"
        >
            <div class="panel-head">
                <h2 class="panel-title">
                    <AppIcon :icon="AlertTriangle" :size="18" class="tone-danger" />
                    <span>错误</span>
                </h2>
            </div>
            <pre v-if="row.pyError" class="error-block">Python: {{ row.pyError }}</pre>
            <pre v-if="row.tsError" class="error-block">TypeScript: {{ row.tsError }}</pre>
            <pre v-if="row.tbError" class="error-block">TypeScript (Bun): {{ row.tbError }}</pre>
            <pre v-if="row.vError" class="error-block">V: {{ row.vError }}</pre>
            <pre v-if="row.wlError" class="error-block">Wolfram (Sxo): {{ row.wlError }}</pre>
            <pre v-if="row.mlError" class="error-block">MATLAB (Sxo): {{ row.mlError }}</pre>
            <pre
                v-if="!row.pyError && !row.tsError && !row.tbError && !row.vError && !row.wlError && !row.mlError && row.error"
                class="error-block"
            >{{ row.error }}</pre>
        </article>

        <article class="panel">
            <div class="panel-head">
                <h2 class="panel-title">
                    <AppIcon :icon="Search" :size="18" />
                    <span>相关操作</span>
                </h2>
            </div>
            <div class="action-row">
                <RouterLink class="btn ghost icon-btn" :to="`/benchmarks?q=${row.id}`">
                    <AppIcon :icon="Search" :size="15" />
                    <span>在表格中定位</span>
                </RouterLink>
                <RouterLink
                    v-if="row.difficulty"
                    class="btn ghost icon-btn"
                    :to="`/benchmarks?difficulty=${row.difficulty}`"
                >
                    <AppIcon :icon="Filter" :size="15" />
                    <span>同难度题目</span>
                </RouterLink>
            </div>
        </article>

        <article class="panel readme-panel">
            <div class="panel-head">
                <h2 class="panel-title">
                    <AppIcon :icon="BookOpen" :size="18" />
                    <span>题解</span>
                </h2>
            </div>
            <p v-if="readmeLoading" class="muted readme-status">加载题解…</p>
            <p v-else-if="readmeError" class="muted readme-status">{{ readmeError }}</p>
            <MarkdownContent v-else-if="readme" :html="readme" />
        </article>
    </section>
</template>
