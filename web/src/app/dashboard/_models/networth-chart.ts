export interface NetworthChart {
  timeframe: string;
  chartData: NetworthChartData[];
}

export interface NetworthChartData {
  name: string;
  value: number;
}
