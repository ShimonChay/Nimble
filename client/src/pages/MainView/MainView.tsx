import { FC, useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  ChartConfig,
  ChartTypes,
} from "../../components/GenericChart/GenericChart.interfaces";
import {
  fetchMainViewData,
  updateChartByFilters,
} from "../../services/MainViewService";
import "./MainView.style.css";
import ChartWrapper from "../../components/ChartWrapper/ChartWrapper";

const MainView: FC = () => {
  const [chartConfigs, setChartConfigs] = useState<ChartConfig[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMainViewData();
      setChartConfigs(data);
    };
    fetchData();
  }, []);

  const updateChartData = useCallback(
    async (id: string, filters: Record<string, any>) => {
      const chartToUpdate = chartConfigs.find((chart) => chart.id === id);
      if (chartToUpdate) {
        const updatedChart = await updateChartByFilters(chartToUpdate, filters);
        setChartConfigs((prev) =>
          prev.map((chart) => (chart.id === id ? updatedChart : chart))
        );
      }
    },
    [chartConfigs]
  );

  const handleFilterChange = useCallback(
    (id: string, filters: Record<string, any>) => {
      updateChartData(id, filters);
    },
    [updateChartData]
  );

  const handleChartTypeChange = useCallback(
    (id: string, newType: ChartTypes) => {
      setChartConfigs((prev) =>
        prev.map((chart) =>
          chart.id === id ? { ...chart, chartType: newType } : chart
        )
      );
    },
    []
  );

  return (
    <Box component="main">
      {chartConfigs.map((config) => (
        <ChartWrapper
          key={config.id}
          config={config}
          onFilterChange={(filters) => handleFilterChange(config.id, filters)}
          onChartTypeChange={handleChartTypeChange}
        />
      ))}
    </Box>
  );
};

export default MainView;
