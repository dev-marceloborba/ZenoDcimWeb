import React from "react";
import Chart from "react-apexcharts";

export type LineCharProps = {
  x: number[] | string[];
  y: number[];
  style?: React.HTMLAttributes<HTMLDivElement>;
};

const LineChart: React.FC<LineCharProps> = ({ x, y, style }) => {
  return (
    <div style={style}>
      <Chart
        type="line"
        options={{
          xaxis: {
            categories: x,
          },
        }}
        series={[
          {
            name: "Temperatura",
            data: y,
          },
        ]}
      />
    </div>
  );
};

export default LineChart;
