import { FC } from "react";
import { Button } from "@mui/material";
import GenericChart from "../../components/GenericChart/GenericChart";
import { ChartConfig, ChartTypes } from "../../components/GenericChart/GenericChart.interfaces";

interface ChartWrapperProps {
  config: ChartConfig;
  onChartTypeChange: (id: string, newChartType: ChartTypes) => void;
}

const ChartWrapper: FC<ChartWrapperProps> = ({ config, onChartTypeChange }) => {
  const { id, title, supportedTypes, chartType, data } = config;

  return (
    <div className="chart-container">
      <div className="chart-controls">
        {supportedTypes.map((type) => (
          <Button
            key={`${id}-${type}`}
            style={{ textTransform: "none" }}
            color="primary"
            variant={chartType === type ? "contained" : "outlined"}
            onClick={() => onChartTypeChange(id, type)}
          >
            {type}
          </Button>
        ))}
      </div>
      <GenericChart chartTitle={title} chartType={chartType} chartData={data} />
    </div>
  );
};

export default ChartWrapper;
