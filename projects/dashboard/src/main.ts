import { createApp } from "vue";

import App from "./App.vue";
import { registerEcharts } from "./charts/register";
import { initTheme } from "./composables/useTheme";
import { router } from "./router";
import "katex/dist/katex.min.css";
import "./style.css";

initTheme();
registerEcharts();

createApp(App).use(router).mount("#app");
