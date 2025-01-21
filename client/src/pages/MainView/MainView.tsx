import { FC, useEffect, useState } from "react";
import GenericChart from "../../components/GenericChart/GenericChart";
import "./MainView.style.css";

import { Box, Button, Toolbar } from "@mui/material";
import {
  ChartConfig,
  ChartTypes,
} from "../../components/GenericChart/GenericChart.interfaces";
import InvoiceService from "../../services/InvoiceService";
import { dateToFormattedMonth } from "../../utils/utils";
import {
  MonthlyInvoiceTotals,
  OverdueTrend,
  TotalByStatus,
} from "./MainView.interfaces";

const MainView: FC = () => {
  const [chartConfigs, setChartConfigs] = useState<ChartConfig[]>([]);

  useEffect(() => {
    getMainViewData();
  }, []);

  const getMainViewData = async () => {
    const [
      totalByStatusResult,
      overdueTrendResult,
      monthlyInvoiceTotalsResult,
    ] = await Promise.allSettled([
      InvoiceService.getTotalByStatus(),
      InvoiceService.getOverdueTrend(),
      InvoiceService.getMonthlyInvoiceTotals(),
    ]);

    const newChartConfigs: ChartConfig[] = [];

    if (totalByStatusResult.status === "fulfilled") {
      newChartConfigs.push({
        id: "totalByStatus",
        title: "Total Invoice by Status",
        supportedTypes: [ChartTypes.PIE, ChartTypes.BAR],
        chartType: ChartTypes.PIE,
        data: totalByStatusResult.value.map((record: TotalByStatus) => ({
          name: record.status,
          value: record.total,
        })),
      });
    }

    if (overdueTrendResult.status === "fulfilled") {
      newChartConfigs.push({
        id: "overdueTrend",
        title: "Overdue Trend Invoice Over Time",
        supportedTypes: [ChartTypes.LINE, ChartTypes.AREA],
        chartType: ChartTypes.AREA,
        data: overdueTrendResult.value.map((record: OverdueTrend) => ({
          name: dateToFormattedMonth(record.month),
          value: record.overdue_count,
        })),
      });
    }

    if (monthlyInvoiceTotalsResult.status === "fulfilled") {
      newChartConfigs.push({
        id: "monthlyInvoiceTotals",
        title: "Monthly Invoice Totals",
        supportedTypes: [ChartTypes.LINE, ChartTypes.BAR],
        chartType: ChartTypes.BAR,
        data: monthlyInvoiceTotalsResult.value.map(
          (record: MonthlyInvoiceTotals) => ({
            name: dateToFormattedMonth(record.month),
            value: record.total,
          })
        ),
      });
    }

    setChartConfigs(newChartConfigs);
  };

  const handleChartTypeChange = (id: string, newChartType: ChartTypes) => {
    setChartConfigs((prevConfigs) =>
      prevConfigs.map((config) =>
        config.id === id ? { ...config, chartType: newChartType } : config
      )
    );
  };

  return (
    <Box component="main">
      <Toolbar />
      {chartConfigs.map(({ id, title, supportedTypes, chartType, data }) => (
        <div key={id} className="chart-container">
          <div className="chart-controls">
            {supportedTypes.map((type) => (
              <Button
                key={`${id}-${type}`}
                style={{ textTransform: "none" }}
                color="primary"
                variant={chartType === type ? "contained" : "outlined"}
                onClick={() => handleChartTypeChange(id, type)}
              >
                {type}
              </Button>
            ))}
          </div>
          <GenericChart
            chartTitle={title}
            chartType={chartType}
            chartData={data}
          />
        </div>
      ))}
    </Box>
  );
};

export default MainView;
