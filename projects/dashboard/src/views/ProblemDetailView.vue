<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import AppTopBar from "../components/AppTopBar.vue";
import DifficultyBadge from "../components/DifficultyBadge.vue";
import EmptyState from "../components/EmptyState.vue";
import { useBenchReport } from "../composables/useBenchReport";
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
</script>

<template>
    <AppTopBar>
        <template #title>{{ row?.title ?? problemId }}</template>
        <template #subtitle>单题基准详情与 LeetCode 外链</template>
    </AppTopBar>

    <button class="btn ghost back-btn" @click="router.back()">← 返回</button>

    <EmptyState
        v-if="!report"
        title="暂无基准快照"
        description="快照就绪后可查看题目详情。"
    />

    <EmptyState
        v-else-if="!row"
        title="未找到该题目"
        description="当前批次中没有此 slug 的基准记录。"
    />

    <section v-else class="detail-grid">
        <article class="panel">
            <div class="panel-head">
                <h2>元数据</h2>
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
                        <a class="text-link" :href="leetcodeUrl(row.id)" target="_blank" rel="noreferrer">
                            打开题面
                        </a>
                    </dd>
                </div>
            </dl>
        </article>

        <article class="panel">
            <div class="panel-head">
                <h2>计时</h2>
                <span class="ratio" :class="ratio !== null && ratio < 1 ? 'v-win' : ratio !== null && ratio > 1 ? 'ts-win' : ''">
                    {{ ratioLabel(row) }}
                </span>
            </div>
            <dl class="detail-list">
                <div>
                    <dt>TypeScript 运行</dt>
                    <dd class="num">{{ formatMs(row.tsRuntimeMs) }} ms</dd>
                </div>
                <div>
                    <dt>V 编译 → Wasm</dt>
                    <dd class="num">{{ formatMs(row.vCompileMs) }} ms</dd>
                </div>
                <div>
                    <dt>V Wasm 运行</dt>
                    <dd class="num">{{ formatMs(row.vRuntimeMs) }} ms</dd>
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

        <article v-if="row.error" class="panel error-panel">
            <div class="panel-head">
                <h2>错误</h2>
            </div>
            <pre class="error-block">{{ row.error }}</pre>
        </article>

        <article class="panel">
            <div class="panel-head">
                <h2>相关操作</h2>
            </div>
            <div class="action-row">
                <RouterLink class="btn ghost" :to="`/benchmarks?q=${row.id}`">在表格中定位</RouterLink>
                <RouterLink
                    v-if="row.difficulty"
                    class="btn ghost"
                    :to="`/benchmarks?difficulty=${row.difficulty}`"
                >
                    同难度题目
                </RouterLink>
            </div>
        </article>
    </section>
</template>
