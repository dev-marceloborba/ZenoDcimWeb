import React from 'react'
import Chart from 'react-apexcharts'

export type LineCharProps = {
  categories: number[] | string[]
  data: number[]
}

const LineChart: React.FC<LineCharProps> = ({ categories, data }) => {
  return (
    <div style={{ width: '100%' }}>
      <Chart type="line" options={{
        xaxis: {
          categories
        }
      }}
        series={
          [
            {
              name: 'Temperatura',
              data
            }
          ]
        } />
    </div>

  )
}

export default LineChart
