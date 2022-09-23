import React from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

type BarChartProps = {
  x: number[] | string[];
  y: number[];
  title: string;
  horizontal?: boolean;
};

const BarChart: React.FC<BarChartProps> = ({
  x,
  y,
  title,
  horizontal = false,
}) => {
  const options: ApexOptions = {
    chart: {
      // height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        dataLabels: {
          position: "center", // top, center, bottom
        },
        horizontal,
      },
    },
    dataLabels: {
      enabled: false,
      // formatter: function (val) {
      //   return val + "W";
      // },
      offsetY: -20,
      style: {
        fontSize: "10px",
        colors: ["#304758"],
      },
    },

    xaxis: {
      categories: x,
      position: "bottom",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        // formatter: function (val) {
        //   return val + "W";
        // },
      },
    },
    // title: {
    //     text: 'Monthly Inflation in Argentina, 2002',
    //     floating: true,
    //     offsetY: 200,
    //     align: 'center',
    //     style: {
    //         color: '#444'
    //     }
    // }
  };
  return (
    <div style={{ width: "100%" }}>
      <Chart
        type="bar"
        options={options}
        series={[
          {
            name: title,
            data: y,
          },
        ]}
      />
    </div>
  );
};

export default BarChart;
