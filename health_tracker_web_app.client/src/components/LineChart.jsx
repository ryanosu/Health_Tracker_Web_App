import { Line } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'

function LineChart({chartData}) {

    const options = {
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
              position: 'top',
              labels: {
                font: {
                  size: 12,
                },
                color: 'white',
              },
            },
        },
        maintainAspectRatio: false
    };

    return (
        <Line data={chartData} options={options}/>
    )
}

export default LineChart;