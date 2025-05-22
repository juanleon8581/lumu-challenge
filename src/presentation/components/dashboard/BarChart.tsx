import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  type ChartOptions,
} from "chart.js";

interface IBarChartProps {
  data: { [keyof: string]: number };
  chartLabel: string;
  chartTitle?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = (props: IBarChartProps) => {
  const {
    data,
    chartLabel,
    backgroundColor = "rgba(53, 162, 235, 0.5)",
    borderColor = "rgba(53, 162, 235, 1)",
    borderWidth = 1,
    chartTitle,
  } = props;

  if (!data || data.length === 0) return <div>No hay datos disponibles</div>;

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: chartLabel,
        data: Object.values(data),
        backgroundColor,
        borderColor,
        borderWidth,
      },
    ],
  };

  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: !!chartTitle,
        text: chartTitle,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full h-[40vh] flex items-center justify-center">
      <Bar data={chartData} options={barOptions} />
    </div>
  );
};
