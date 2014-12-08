import type { Plugin } from "vite";
import { runAllBenchmarks } from "@leetcode/conformance/bench";

/** 仅本地 dev server 使用，不会进入生产构建。 */
export function benchApiPlugin(): Plugin {
    return {
        name: "leetcode-bench-api",
        apply: "serve",
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
    };
}
