import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

export interface LineChartData {
    datasets: ChartDataSets[];
    labels: Label[];
    options?;
    colors?: Color[];
    legend?;
    chartType?;
    plugins?;
}
