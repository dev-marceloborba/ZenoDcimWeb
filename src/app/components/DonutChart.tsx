import React from 'react'
import Chart from 'react-apexcharts'

export type DonutChartProps = {
  x: string[]
  y: number[]
  colors?: string[]
}

const DonutChart: React.FC<DonutChartProps> = ({ x, y, colors }) => {
  return (
    <div>
      <Chart type="donut" options={{
        dataLabels: {
          enabled: true
        },
        labels: x,
        legend: {
          position: 'right',
          offsetY: 0

        },
        colors
      }}
        series={y}
      />
    </div>
  )
}

export default DonutChart
