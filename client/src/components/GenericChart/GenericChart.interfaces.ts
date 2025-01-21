export enum ChartTypes {
  PIE = "Pie",
  BAR = "Bar",
  LINE = "Line",
  AREA = "Area",
}

export enum ChartSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large"
}

export interface ChartConfig {
  id: string;
  title: string;
  supportedTypes: ChartTypes[];
  chartType: ChartTypes;
  data: { name: string; value: number }[];
}

export interface ChartData {
  name: string;
  value: number;
}

export interface GenericChartProps {
  chartTitle?: string;
  chartType: ChartTypes;
  chartData: ChartData[];
  size?: ChartSize
}
