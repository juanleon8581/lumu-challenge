import { useQuery } from "@tanstack/react-query";
import { VictimsRepositoryImpl } from "@/infrastructure/api/ransomwareApi";
import { GetVictims } from "@/domain/use-cases/GetVictims";
import { Bar, Pie } from "react-chartjs-2";
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
import { format, parseISO } from "date-fns";

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

const victimsRepository = new VictimsRepositoryImpl();

const VictimDashboardCharts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["victims"],
    queryFn: () => new GetVictims(victimsRepository).execute(),
  });

  if (isLoading) return <div>Cargando gráficos...</div>;
  if (error) return <div>Error al cargar datos para los gráficos</div>;
  if (!data || data.length === 0) return <div>No hay datos disponibles</div>;

  // Agrupar víctimas por grupo de ransomware
  const groupCounts: Record<string, number> = {};
  data.forEach((victim) => {
    const group = victim.group || "Desconocido";
    groupCounts[group] = (groupCounts[group] || 0) + 1;
  });

  // Agrupar víctimas por sector
  const sectorCounts: Record<string, number> = {};
  data.forEach((victim) => {
    const sector = victim.sector ?? "Desconocido";
    sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
  });

  // Agrupar víctimas por país
  const countryCounts: Record<string, number> = {};
  data.forEach((victim) => {
    const country = victim.country ?? "Desconocido";
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  });

  // Agrupar víctimas por mes
  const monthCounts: Record<string, number> = {};
  data.forEach((victim) => {
    try {
      const date = parseISO(victim.attackDate);
      const month = format(date, "MMM yyyy");
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    } catch (e) {
      if (!e) return;
      monthCounts["Fecha desconocida"] =
        (monthCounts["Fecha desconocida"] || 0) + 1;
    }
  });

  // Ordenar los meses cronológicamente
  const sortedMonths = Object.keys(monthCounts).sort((a, b) => {
    if (a === "Fecha desconocida") return 1;
    if (b === "Fecha desconocida") return -1;
    return new Date(a).getTime() - new Date(b).getTime();
  });

  // Datos para el gráfico de barras por grupo
  const groupChartData = {
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

  // Datos para el gráfico circular por sector
  const sectorChartData = {
    labels: Object.keys(sectorCounts),
    datasets: [
      {
        label: "Número de víctimas",
        data: Object.values(sectorCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico de tendencia por mes
  const monthChartData = {
    labels: sortedMonths,
    datasets: [
      {
        label: "Ataques por mes",
        data: sortedMonths.map((month) => monthCounts[month]),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
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

  const pieOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Distribución por sector",
      },
    },
  };

  const monthOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Tendencia de ataques por mes",
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
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow h-1/2">
        <Bar data={groupChartData} options={barOptions} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <Pie data={sectorChartData} options={pieOptions} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
        <Bar data={monthChartData} options={monthOptions} />
      </div>
    </div>
  );
};

export default VictimDashboardCharts;
