import useTheme from "@mui/material/styles/useTheme";
import React from "react";
import Chart from "react-apexcharts";
import "./line-chart-styles.css";

export type LineCharProps = {
  x: number[] | string[];
  y: number[];
  style?: React.HTMLAttributes<HTMLDivElement>;
  description?: string;
};

const LineChart: React.FC<LineCharProps> = ({ x, y, style, description }) => {
  const theme = useTheme();
  return (
    <div style={style}>
      <Chart
        type="line"
        options={{
          chart: {
            id: "lineChartContainer",
          },
          xaxis: {
            categories: x,
            labels: {
              style: {
                colors: theme.palette.text.secondary,
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: theme.palette.text.secondary,
              },
            },
          },
          dataLabels: {
            enabled: false,
          },
          tooltip: {
            enabled: true,
          },
          theme: {
            mode: "light",
          },
        }}
        series={[
          {
            name: description,
            data: y,
          },
        ]}
      />
    </div>
  );
};

export default LineChart;
