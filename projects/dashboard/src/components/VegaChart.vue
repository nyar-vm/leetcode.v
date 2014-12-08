<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import embed from "vega-embed";
import type { EmbedOptions, Result, VisualizationSpec } from "vega-embed";

const props = defineProps<{
    spec: VisualizationSpec | null;
}>();

const root = ref<HTMLElement | null>(null);
let result: Result | null = null;

const embedOptions: EmbedOptions = {
    actions: false,
    renderer: "svg",
};

async function render() {
    if (!root.value) {
        return;
    }
    if (result) {
        result.view.finalize();
        result = null;
    }
    if (!props.spec) {
        root.value.innerHTML = "";
        return;
    }
    result = await embed(root.value, props.spec, embedOptions);
}

watch(() => props.spec, render, { deep: true });
onMounted(render);
onBeforeUnmount(() => {
    result?.view.finalize();
});
</script>

<template>
    <div class="vega-chart">
        <div v-if="!spec" class="vega-empty muted">暂无可用数据</div>
        <div v-show="spec" ref="root" class="vega-root" />
    </div>
</template>
