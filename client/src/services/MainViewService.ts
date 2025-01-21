import InvoiceService from "./InvoiceService";
import { ChartConfig, ChartTypes } from "../components/GenericChart/GenericChart.interfaces";
import { dateToFormattedMonth } from "../utils/utils";

export const fetchMainViewData = async (): Promise<ChartConfig[]> => {
  const [totalByStatusResult, overdueTrendResult, monthlyInvoiceTotalsResult] =
    await Promise.allSettled([
      InvoiceService.getTotalByStatus(),
      InvoiceService.getOverdueTrend(),
      InvoiceService.getMonthlyInvoiceTotals(),
    ]);

  const configs: ChartConfig[] = [];

  if (totalByStatusResult.status === "fulfilled") {
    configs.push({
      id: "totalByStatus",
      title: "Total Invoice by Status",
      supportedTypes: [ChartTypes.PIE, ChartTypes.BAR],
      chartType: ChartTypes.PIE,
      data: totalByStatusResult.value.map((record:any) => ({
        name: record.status,
        value: record.total,
      })),
    });
  }

  if (overdueTrendResult.status === "fulfilled") {
    configs.push({
      id: "overdueTrend",
      title: "Overdue Trend Invoice Over Time",
      supportedTypes: [ChartTypes.LINE, ChartTypes.AREA],
      chartType: ChartTypes.AREA,
      data: overdueTrendResult.value.map((record:any) => ({
        name: dateToFormattedMonth(record.month),
        value: record.overdue_count,
      })),
    });
  }

  if (monthlyInvoiceTotalsResult.status === "fulfilled") {
    configs.push({
      id: "monthlyInvoiceTotals",
      title: "Monthly Invoice Totals",
      supportedTypes: [ChartTypes.LINE, ChartTypes.BAR],
      chartType: ChartTypes.BAR,
      data: monthlyInvoiceTotalsResult.value.map((record:any) => ({
        name: dateToFormattedMonth(record.month),
        value: record.total,
      })),
    });
  }

  return configs;
};
