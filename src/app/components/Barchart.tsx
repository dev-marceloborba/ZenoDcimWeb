import React from 'react'
import Chart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'

const options: ApexOptions = {
  chart: {
    // height: 350,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      dataLabels: {
        position: 'center' // top, center, bottom
      }
    }
  },
  dataLabels: {
    enabled: false,
    formatter: function (val) {
      return val + 'W'
    },
    offsetY: -20,
    style: {
      fontSize: '10px',
      colors: ['#304758']
    }
  },

  xaxis: {
    categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    position: 'bottom',
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#BED1E6',
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5
        }
      }
    },
    tooltip: {
      enabled: true
    }
  },
  yaxis: {
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    labels: {
      show: true,
      formatter: function (val) {
        return val + 'W'
      }
    }

  }
  // title: {
  //     text: 'Monthly Inflation in Argentina, 2002',
  //     floating: true,
  //     offsetY: 200,
  //     align: 'center',
  //     style: {
  //         color: '#444'
  //     }
  // }

}

const BarChart: React.FC = () => {
  return (
    <div style={{ width: '100%' }}>
      <Chart type="bar" options={options} series={
        [
          {
            name: 'Consumo',
            data: [23, 31, 37, 26, 40, 36, 32, 23, 24, 28, 35, 22]
          }
        ]}
      />
    </div>
  )
}

export default BarChart
