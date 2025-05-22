import { useQuery } from "@tanstack/react-query";
import { VictimsRepositoryImpl } from "@/infrastructure/api/ransomwareApi";
import { GetVictims } from "@/domain/use-cases/GetVictims";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const victimsRepository = new VictimsRepositoryImpl();

const VictimStatisticsChart = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["victims"],
    queryFn: () => new GetVictims(victimsRepository).execute(),
  });

  if (isLoading) return <div>Cargando gráfico...</div>;
  if (error) return <div>Error al cargar datos para el gráfico</div>;
  if (!data || data.length === 0) return <div>No hay datos disponibles</div>;

  // Agrupar víctimas por grupo de ransomware
  const groupCounts: Record<string, number> = {};
  data.forEach((victim) => {
    const group = victim.group || "Desconocido";
    groupCounts[group] = (groupCounts[group] || 0) + 1;
  });

  // Preparar datos para el gráfico
  const chartData = {
    labels: Object.keys(groupCounts),
    datasets: [
      {
        label: "Número de víctimas",
        data: Object.values(groupCounts),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgba(53, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Víctimas por grupo de ransomware",
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
    <div className="w-full h-96 p-4">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default VictimStatisticsChart;
