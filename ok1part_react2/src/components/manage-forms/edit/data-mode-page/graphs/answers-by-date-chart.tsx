import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import GraphWrapper from './graph-wrapper';
import { useEffect, useState } from 'react';

function add5minutesToString(hourString: string) {
  let date = new Date(`2000-01-01T${hourString}:00`);

  date.setMinutes(date.getMinutes() + 5);

  const newHourString = `${date.getHours()}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;

  return newHourString;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options: ChartOptions = {
  /* Code to disable animation:
  animation: {
    y: {
      duration: 0,
    },
  },
  */
  responsive: true,
  aspectRatio: 3.5 / 1,
  plugins: {
    legend: {
      position: 'bottom',
      labels: { font: { size: 16 } },
    },
    title: {
      //display: true,
      //text: 'Answers in the last hour',
    },
  },
  scales: {
    x: { ticks: { font: { size: 16 } } },
    y: { ticks: { font: { size: 16 } } },
  },

  //scales: { xAxis: { ticks: { maxTicksLimit: 5 } } },
  //scales: { xAxis: { ticks: { font: { size: 32 } } } },
};

const labels = [
  '9:45',
  '9:50',
  '9:55',
  '10:00',
  '10:05',
  '10:10',
  '10:15',
  '10:20',
  '10:25',
  '10:30',
];

export const init_data: ChartData = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Answers',
      data: [15, 13, 20, 39, 13, 15, 23, 23, 30, 20], //labels.map(() => Math.random() * 25 + 13),
      borderColor: '#4d99b3',
      backgroundColor: ' #559eb666',
    },
  ],
};

export default function AnswersByDateChart() {
  const [data, setData] = useState(init_data);

  useEffect(() => {
    setTimeout(() => {
      setData({
        ...data,
        labels: [
          ...(data['labels'] as string[]).slice(1, 10),
          add5minutesToString((data as any).labels[9]),
        ],
        datasets: [
          {
            ...data.datasets[0],
            data: [
              ...data.datasets[0].data.slice(1, 10),
              Math.floor(Math.random() * 15) + 15,
            ],
          },
        ],
      });
    }, 10000);
  }, [data]);

  return (
    <GraphWrapper>
      <Line options={options as any} data={data as any} />
    </GraphWrapper>
  );
}
