import {Pie} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

function PieChart({chartData}) {

    const options = {
        plugins: {
          legend: {
            labels: {
              font: {
                size: 16,  
                weight: 'bold',
                color: 'black',
              },
              color: 'white'
            },
          },
        },
        elements: {
          arc: {
            borderColor: 'white',
            borderWidth: 2,
          },
        },
        maintainAspectRatio: false
      };

    return (
    <Pie data={chartData} options={options}/>
  )
}

export default PieChart;