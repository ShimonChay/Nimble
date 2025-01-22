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

export enum FilterType {
  DATE_RANGE = "dateRange",
  CHECKBOX = "checkbox"
}

export interface ChartConfig {
  id: string;
  title: string;
  supportedTypes: ChartTypes[];
  chartType: ChartTypes;
  filterType: FilterType;
  data: { name: string; value: number }[];
  updateFunction: (filters: Record<string, any>) => Promise<ChartConfig>;
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
