import { BarChart } from "./BarChart";
import { PieChart } from "./PieChart";
import { useVictims } from "@/presentation/hooks/useVictims";
import { useChartData } from "@/presentation/hooks/useChartData";
import { useState } from "react";

export const VictimDashboardCharts = () => {
  const { victims } = useVictims();
  const [selectedView, setSelectedView] = useState<"combined" | "separate">(
    "combined"
  );

  // Get processed chart data from our custom hook
  const combinedChartData = useChartData(victims, "combined");
  const groupChartData = useChartData(victims, "byGroup");
  const sectorChartData = useChartData(victims, "bySector");
  const monthChartData = useChartData(victims, "byMonth");
  const countryChartData = useChartData(victims, "byCountry");

  if (!victims || victims.length === 0) {
    return <div>No hay datos disponibles</div>;
  }

  return (
    <div className="flex flex-col items-center justify-around gap-4">
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            selectedView === "combined"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedView("combined")}
        >
          Vista Combinada
        </button>
        <button
          className={`px-4 py-2 rounded ${
            selectedView === "separate"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedView("separate")}
        >
          Vistas Separadas
        </button>
      </div>

      {selectedView === "combined" ? (
        <BarChart
          data={combinedChartData!}
          chartTitle="Datos combinados (Grupo, Sector y Mes)"
        />
      ) : (
        <>
          <BarChart data={groupChartData!} chartTitle="Victimas por grupo" />
          <PieChart
            data={sectorChartData!.datasets[0].data.reduce(
              (acc, value, index) => {
                acc[sectorChartData!.labels[index]] = value;
                return acc;
              },
              {} as { [key: string]: number }
            )}
            chartTitle={"Distribución por sector"}
          />
          <BarChart data={monthChartData!} chartTitle="Ataques por mes" />
          <PieChart
            data={countryChartData!.datasets[0].data.reduce(
              (acc, value, index) => {
                acc[countryChartData!.labels[index]] = value;
                return acc;
              },
              {} as { [key: string]: number }
            )}
            chartTitle={"Distribución por País"}
          />
        </>
      )}
    </div>
  );
};
