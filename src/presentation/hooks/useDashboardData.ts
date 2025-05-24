import { format, parseISO } from "date-fns";
import { useState } from "react";
import { useVictims } from "./useVictims";
import type { FilterState } from "../components/dashboard/FilterPanel";

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}

export interface CombinedChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface DashboardData {
  groupCounts: { [key: string]: number };
  sectorCounts: { [key: string]: number };
  countryCounts: { [key: string]: number };
  monthCounts: { [key: string]: number };
  combinedData: CombinedChartData;
  hasDataToShow: boolean;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export const useDashboardData = (): DashboardData => {
  const { victims } = useVictims();
  const [filters, setFilters] = useState<FilterState>({
    showGroups: true,
    showSectors: true,
    showMonths: true,
  });

  // Inicializar objetos para contar
  const groupCounts: { [key: string]: number } = {};
  const sectorCounts: { [key: string]: number } = {};
  const countryCounts: { [key: string]: number } = {};
  const monthCounts: { [key: string]: number } = {};

  // Procesar datos solo si hay víctimas
  if (victims && victims.length > 0) {
    // Agrupar víctimas por grupo de ransomware
    victims.forEach((victim) => {
      const group = victim.group || "Desconocido";
      groupCounts[group] = (groupCounts[group] || 0) + 1;
    });

    // Agrupar víctimas por sector
    victims.forEach((victim) => {
      const sector = victim.sector ?? "Desconocido";
      sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
    });

    // Agrupar víctimas por país
    victims.forEach((victim) => {
      const country = victim.country ?? "Desconocido";
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });

    // Agrupar víctimas por mes
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
  }

  // Preparar los datos combinados para el gráfico de barras según los filtros seleccionados
  const combinedData: CombinedChartData = {
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

  return {
    groupCounts,
    sectorCounts,
    countryCounts,
    monthCounts,
    combinedData,
    hasDataToShow,
    filters,
    setFilters,
  };
};
