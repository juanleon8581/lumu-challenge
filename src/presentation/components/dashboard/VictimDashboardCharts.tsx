import { format, parseISO } from "date-fns";
import { BarChart } from "./BarChart";
import { PieChart } from "./PieChart";
import { useVictims } from "@/presentation/hooks/useVictims";
import { useState } from "react";
import { FilterPanel } from "./FilterPanel";
import type { FilterState } from "./FilterPanel";
import { GroupsList } from "./GroupsList";

export const VictimDashboardCharts = () => {
  const { victims } = useVictims();
  // Estado inicial para los filtros - por defecto todos están activados
  const [filters, setFilters] = useState<FilterState>({
    showGroups: true,
    showSectors: true,
    showMonths: true,
  });

  if (!victims || victims.length === 0)
    return <div>No hay datos disponibles</div>;

  // Agrupar víctimas por grupo de ransomware
  const groupCounts: { [keyof: string]: number } = {};
  victims.forEach((victim) => {
    const group = victim.group || "Desconocido";
    groupCounts[group] = (groupCounts[group] || 0) + 1;
  });

  // Agrupar víctimas por sector
  const sectorCounts: { [keyof: string]: number } = {};
  victims.forEach((victim) => {
    const sector = victim.sector ?? "Desconocido";
    sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
  });

  // Agrupar víctimas por país
  const countryCounts: { [keyof: string]: number } = {};
  victims.forEach((victim) => {
    const country = victim.country ?? "Desconocido";
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  });

  // Agrupar víctimas por mes
  const monthCounts: { [keyof: string]: number } = {};
  victims.forEach((victim) => {
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

  // Preparar los datos combinados para el gráfico de barras según los filtros seleccionados
  const combinedData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  } = {
    labels: [],
    datasets: [],
  };

  // Usar Set para crear un conjunto único de todas las etiquetas
  const allLabelsSet = new Set<string>();

  // Agregar etiquetas de los conjuntos de datos que están habilitados por los filtros
  if (filters.showGroups) {
    Object.keys(groupCounts).forEach((label) => allLabelsSet.add(label));
  }
  if (filters.showSectors) {
    Object.keys(sectorCounts).forEach((label) => allLabelsSet.add(label));
  }
  if (filters.showMonths) {
    Object.keys(monthCounts).forEach((label) => allLabelsSet.add(label));
  }

  // Convertir el Set a un array para usar como labels
  combinedData.labels = Array.from(allLabelsSet);

  // Agregar datasets según los filtros
  if (filters.showGroups) {
    combinedData.datasets.push({
      label: "Por Grupo",
      data: combinedData.labels.map((label) => groupCounts[label] || 0),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      borderColor: "rgba(53, 162, 235, 1)",
      borderWidth: 1,
    });
  }

  if (filters.showSectors) {
    combinedData.datasets.push({
      label: "Por Sector",
      data: combinedData.labels.map((label) => sectorCounts[label] || 0),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    });
  }

  if (filters.showMonths) {
    combinedData.datasets.push({
      label: "Por Mes",
      data: combinedData.labels.map((label) => monthCounts[label] || 0),
      backgroundColor: "rgba(75, 192, 192, 0.5)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    });
  }

  // Verificar si hay datos para mostrar
  const hasDataToShow = combinedData.datasets.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex gap-8">
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
