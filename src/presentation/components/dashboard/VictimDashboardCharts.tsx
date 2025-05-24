import { BarChart } from "./BarChart";
import { PieChart } from "./PieChart";
import { FilterPanel } from "./FilterPanel";
import { GroupsList } from "./GroupsList";
import { useDashboardData } from "@/presentation/hooks/useDashboardData";
import { useVictims } from "@/presentation/hooks/useVictims";

export const VictimDashboardCharts = () => {
  const { victims } = useVictims();
  const {
    countryCounts,
    combinedData,
    hasDataToShow,
    filters,
    setFilters,
  } = useDashboardData();

  if (!victims || victims.length === 0)
    return <div>No hay datos disponibles</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex gap-8 border shadow-sm rounded-md">
          <FilterPanel filters={filters} onFiltersChange={setFilters} />
          <GroupsList />
        </div>
        <div>
          {hasDataToShow ? (
            <BarChart data={combinedData} chartTitle="Datos Combinados" />
          ) : (
            <div className="flex items-center justify-center h-60 bg-white rounded-lg shadow border p-4">
              <p className="text-center text-gray-500">
                Por favor selecciona al menos un tipo de datos para visualizar
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center justify-around gap-4">
        <PieChart data={countryCounts} chartTitle={"Distribución por País"} />
      </div>
    </div>
  );
};
