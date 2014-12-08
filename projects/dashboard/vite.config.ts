import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig(async ({ command }) => {
    const plugins = [vue()];

    if (command === "serve") {
        const { benchApiPlugin } = await import("./vite.bench-api");
        plugins.push(benchApiPlugin());
    }

    return {
        plugins,
        server: {
            port: 5175,
        },
    };
});
