import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { runAllBenchmarks } from "@leetcode/conformance/bench";

export default defineConfig({
    plugins: [
        vue(),
        {
            name: "leetcode-bench-api",
            configureServer(server) {
                server.middlewares.use("/api/bench", async (_req, res) => {
                    try {
                        const report = await runAllBenchmarks();
                        res.setHeader("Content-Type", "application/json; charset=utf-8");
                        res.end(JSON.stringify(report));
                    } catch (err) {
                        res.statusCode = 500;
                        res.end(JSON.stringify({ error: String(err) }));
                    }
                });
            },
        },
    ],
    server: {
        port: 5175,
    },
});
