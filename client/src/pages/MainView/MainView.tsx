import { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ChartConfig } from "../../components/GenericChart/GenericChart.interfaces";
import { fetchMainViewData } from "../../services/MainViewService"
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

  return (
    <Box component="main">
      {chartConfigs.map((config) => (
        <ChartWrapper
          key={config.id}
          config={config}
          onChartTypeChange={(id, newType) =>
            setChartConfigs((prev) =>
              prev.map((c) =>
                c.id === id ? { ...c, chartType: newType } : c
              )
            )
          }
        />
      ))}
    </Box>
  );
};

export default MainView;
