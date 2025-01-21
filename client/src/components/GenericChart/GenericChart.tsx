import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { FC } from "react";
import "./GenericChart.style.css";
import {
  ChartSize,
  ChartTypes,
  GenericChartProps,
} from "./GenericChart.interfaces";

const GenericChart: FC<GenericChartProps> = ({
  chartTitle,
  chartData,
  chartType,
  size,
}) => {
  return (
    <>
      {chartTitle && <h3 className="chart-title">{chartTitle}</h3>}
      {chartType === ChartTypes.PIE && (
        <PieChart
          series={[
            {
              data: chartData.map((record, index) => ({
                id: index,
                value: record.value,
                label: record.name,
              })),
            },
          ]}
          width={size === ChartSize.SMALL ? 400 : 500}
          height={size === ChartSize.SMALL ? 200 : 250}
        />
      )}
      {chartType === ChartTypes.BAR && (
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: chartData.map((record) => record.name),
            },
          ]}
          series={[
            {
              data: chartData.map((record) => record.value),
            },
          ]}
          width={1000}
          height={250}
        />
      )}
      {(chartType === ChartTypes.LINE || chartType === ChartTypes.AREA) && (
        <LineChart
          xAxis={[
            {
              data: chartData.map((record) => record.name),
              scaleType: "point",
            },
          ]}
          series={[
            {
              data: chartData.map((record) => record.value),
              showMark: chartType === ChartTypes.LINE,
              area: chartType === ChartTypes.AREA,
            },
          ]}
          height={250}
          width={1000}
          margin={{ top: 10, bottom: 20 }}
        />
      )}
    </>
  );
};

export default GenericChart;
