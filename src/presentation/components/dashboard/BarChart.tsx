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
import { Bar } from "react-chartjs-2";

// Definir la estructura de los datos para el gráfico
interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth?: number;
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

interface IBarChartProps {
  data: ChartData;
  chartTitle?: string;
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

export const BarChart = ({ data, chartTitle }: IBarChartProps) => {
  // Verificar si hay datos para mostrar
  if (!data?.labels || !data?.datasets?.length) {
    return <div>No hay datos disponibles</div>;
  }

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
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 0,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full h-[60vh] flex items-center justify-center">
      <Bar data={data} options={barOptions} />
    </div>
  );
};
