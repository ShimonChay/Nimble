import InvoiceService from "./InvoiceService";
import { ChartConfig, ChartTypes, FilterType } from "../components/GenericChart/GenericChart.interfaces";
import { dateToFormattedMonth } from "../utils/utils";

export const fetchTotalByStatusData = async (): Promise<ChartConfig> => {
  const result = await InvoiceService.getTotalByStatus();
  return {
    id: "totalByStatus",
    title: "Total Invoice by Status",
    supportedTypes: [ChartTypes.PIE, ChartTypes.BAR],
    chartType: ChartTypes.PIE,
    filterType: FilterType.CHECKBOX,
    updateFunction: fetchTotalByStatusData,
    data: result.map((record: any) => ({
      name: record.status,
      value: record.total,
    })),
  };
};

export const fetchOverdueTrendData = async (filters?: Record<string, any>): Promise<ChartConfig> => {
  const result = await InvoiceService.getOverdueTrend(filters);
  return {
    id: "overdueTrend",
    title: "Overdue Trend Invoice Over Time",
    supportedTypes: [ChartTypes.LINE, ChartTypes.AREA],
    chartType: ChartTypes.AREA,
    filterType: FilterType.DATE_RANGE,
    updateFunction: fetchOverdueTrendData,
    data: result.map((record: any) => ({
      name: dateToFormattedMonth(record.month),
      value: record.overdue_count,
    })),
  };
};

export const fetchMonthlyInvoiceTotalsData = async (filters?: Record<string, any>): Promise<ChartConfig> => {
  const result = await InvoiceService.getMonthlyInvoiceTotals(filters);
  return {
    id: "monthlyInvoiceTotals",
    title: "Monthly Invoice Totals",
    supportedTypes: [ChartTypes.LINE, ChartTypes.BAR],
    chartType: ChartTypes.BAR,
    filterType: FilterType.DATE_RANGE,
    updateFunction: fetchMonthlyInvoiceTotalsData,
    data: result.map((record: any) => ({
      name: dateToFormattedMonth(record.month),
      value: record.total,
    })),
  };
};

export const fetchMainViewData = async (): Promise<ChartConfig[]> => {
  const configs: ChartConfig[] = [];

  try {
    const totalByStatusData = await fetchTotalByStatusData();
    if (totalByStatusData) configs.push(totalByStatusData);
  } catch (error) {
    console.error("Error fetching Total By Status data:", error);
  }

  try {
    const overdueTrendData = await fetchOverdueTrendData();
    if (overdueTrendData) configs.push(overdueTrendData);
  } catch (error) {
    console.error("Error fetching Overdue Trend data:", error);
  }

  try {
    const monthlyInvoiceTotalsData = await fetchMonthlyInvoiceTotalsData();
    if (monthlyInvoiceTotalsData) configs.push(monthlyInvoiceTotalsData);
  } catch (error) {
    console.error("Error fetching Monthly Invoice Totals data:", error);
  }

  return configs;
};

export const updateChartByFilters = (config: ChartConfig, filters: Record<string, any>): Promise<ChartConfig> => {
  return config.updateFunction(filters)
}
