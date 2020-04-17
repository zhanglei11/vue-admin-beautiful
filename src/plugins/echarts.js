import "echarts";
import "echarts-wordcloud";

import byuiChart from "vue-echarts";
import theme from "./byui-echarts-theme.json";

byuiChart.registerTheme("byui-echarts-theme", theme);
export default byuiChart;
