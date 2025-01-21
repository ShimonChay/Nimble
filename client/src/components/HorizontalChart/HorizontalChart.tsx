import { FC } from "react";
import { HorizontalBarChartProps } from "./HorizontalChart.interfaces";

const HorizontalBarChart: FC<HorizontalBarChartProps> = ({ chartData }) => {
  const maxValue = Math.max(...chartData.map((item) => item.value));
  const chartWidth = 500;

  return (
    <svg width={600} height={chartData.length * 25}>
      {chartData.map((item, index) => (
        <g key={index} transform={`translate(0, ${index * 25})`}>
          <text x="10" y="15" fontSize="12">{item.label}</text>
          <rect
            x="75"
            y="5"
            width={(item.value / maxValue) * chartWidth}
            height="15"
            fill="#00bcd4"
          />
          <text
            x={85 + (item.value / maxValue) * chartWidth}
            y="15"
            fontSize="10"
          >
            {item.value}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default HorizontalBarChart;
