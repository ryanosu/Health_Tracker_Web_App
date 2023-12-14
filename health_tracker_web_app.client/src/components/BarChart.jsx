import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

function BarChart({chartData}) {

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 10)',
        },
        ticks: {
          color: 'white',
          font: {
            weight: 'bold',
            size: 18,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 10)',
        },
        ticks: {
          color: 'white',
          font: {
            weight: 'bold',
            size: 18,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 18
          },
          color: 'white'
        }
      },
    },
  };

  return (
    <Bar data={chartData} options={options}/>
  )
}

export default BarChart;