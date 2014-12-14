import { computed, inject, provide, ref, type InjectionKey } from "vue";

export type ThemeMode = "light" | "dark";

export const THEME_STORAGE_KEY = "leetcode-bench-theme";

const themeKey: InjectionKey<ReturnType<typeof createTheme>> = Symbol("theme");

function readTheme(): ThemeMode {
    if (typeof window === "undefined") {
        return "dark";
    }
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
        return stored;
    }
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function applyTheme(mode: ThemeMode) {
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
}

export function initTheme() {
    applyTheme(readTheme());
}

function createTheme() {
    const theme = ref<ThemeMode>(readTheme());

    const isDark = computed(() => theme.value === "dark");

    function setTheme(mode: ThemeMode) {
        theme.value = mode;
        localStorage.setItem(THEME_STORAGE_KEY, mode);
        applyTheme(mode);
    }

    function toggleTheme() {
        setTheme(theme.value === "dark" ? "light" : "dark");
    }

    return { theme, isDark, setTheme, toggleTheme };
}

export function provideTheme() {
    const state = createTheme();
    provide(themeKey, state);
    return state;
}

export function useTheme() {
    const state = inject(themeKey);
    if (!state) {
        throw new Error("useTheme must be used inside provideTheme");
    }
    return state;
}
