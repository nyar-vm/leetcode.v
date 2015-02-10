import { type MaybeRefOrGetter, ref, toValue, watch } from 'vue';

async function loadReadme(id: string): Promise<string> {
    const mod = await import(`../../../problems/${id}/readme.md?render`);
    return mod.default as string;
}

export function useProblemReadme(problemId: MaybeRefOrGetter<string>) {
    const content = ref<string | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    watch(
        () => toValue(problemId),
        async (id) => {
            content.value = null;
            error.value = null;
            if (!id) {
                return;
            }

            loading.value = true;
            try {
                content.value = await loadReadme(id);
            } catch {
                error.value = '未找到题解 readme';
            } finally {
                loading.value = false;
            }
        },
        { immediate: true },
    );

    return { content, loading, error };
}
