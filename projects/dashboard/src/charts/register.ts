import { BarChart, LineChart, PieChart, ScatterChart } from "echarts/charts";
import {
    GridComponent,
    LegendComponent,
    MarkLineComponent,
    TitleComponent,
    TooltipComponent,
} from "echarts/components";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";

let registered = false;

export function registerEcharts() {
    if (registered) {
        return;
    }
    use([
        CanvasRenderer,
        PieChart,
        BarChart,
        ScatterChart,
        LineChart,
        GridComponent,
        TooltipComponent,
        LegendComponent,
        TitleComponent,
        MarkLineComponent,
    ]);
    registered = true;
}
