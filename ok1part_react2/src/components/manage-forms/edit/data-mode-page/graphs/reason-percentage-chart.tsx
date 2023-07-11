import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import GraphWrapper from './graph-wrapper';

ChartJS.register(ArcElement, Tooltip, Legend);

const data: ChartData = {
  labels: [
    'Change of Shift',
    'Different Model',
    'Change of Tool',
    'Before Maintenance',
    'After Maintenance',
    'Sudden Inspection',
  ],
  datasets: [
    {
      label: 'Answers',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        //'#c1dbe4', // 4
        '#9dc7d5', // 6
        '#79b3c6', // 8
        '#559eb6', // 10
        '#397386', // 13
        '#2a5462', // 15
        '#1b363e', // 17
      ],
      borderColor: [
        '#9dc7d5', // 6
        '#79b3c6', // 8
        '#559eb6', // 10
        '#397386', // 13
        '#2a5462', // 15
        '#1b363e', // 17
      ],
      borderWidth: 1,
      hoverBackgroundColor: '#a2a2a2',
      hoverBorderColor: '#a2a2a2',
    },
  ],
};

const graphOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: 'bottom',
      labels: { boxWidth: 30, boxHeight: 30, padding: 25 },
    },

    /*
    tooltip: {
      callbacks: {
        label: (tooltipitem) => {
          console.log(tooltipitem);
          return 'Yes';
        },
      },
    },
    */
  },

  //datasets: { doughnut: { label: 'Answers' } },
  //datasets: { doughnut: { cutout: '65%' } },
};

export default function ReasonPercentageChart() {
  return (
    <GraphWrapper>
      <Doughnut data={data as any} options={graphOptions} />
    </GraphWrapper>
  );
}
