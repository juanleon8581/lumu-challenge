import type { IVictim } from "@/domain/interfaces/IVictim";
import { format, parseISO } from "date-fns";

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth?: number;
}

export interface ProcessedChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export const getOnlyGroupsNames = (victims: IVictim[]): string[] => {
  const groups = victims.map((victim) => victim.group);
  const uniqueGroups = Array.from(new Set(groups)).filter(Boolean);
  return uniqueGroups;
};

// Procesa y cuenta la data por grupo
export const getVictimsByGroup = (
  victims: IVictim[]
): { [key: string]: number } => {
  const groupCounts: { [key: string]: number } = {};
  victims.forEach((victim) => {
    const group = victim.group || "Desconocido";
    groupCounts[group] = (groupCounts[group] || 0) + 1;
  });
  return groupCounts;
};

// Procesa y cuenta la data por sector afectado
export const getVictimsBySector = (
  victims: IVictim[]
): { [key: string]: number } => {
  const sectorCounts: { [key: string]: number } = {};
  victims.forEach((victim) => {
    const sector = victim.sector ?? "Desconocido";
    sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
  });
  return sectorCounts;
};

// Procesa y cuenta la data por país
export const getVictimsByCountry = (
  victims: IVictim[]
): { [key: string]: number } => {
  const countryCounts: { [key: string]: number } = {};
  victims.forEach((victim) => {
    const country = victim.country ?? "Desconocido";
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  });
  return countryCounts;
};

// Procesa y cuenta la data por mes
export const getVictimsByMonth = (
  victims: IVictim[]
): { [key: string]: number } => {
  const monthCounts: { [key: string]: number } = {};
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
  return monthCounts;
};

// Combina multiples datasets en uno
export const combineDatasets = (
  dataSources: { [key: string]: number }[],
  labels: string[],
  datasetLabels: string[],
  colors: { backgroundColor: string; borderColor: string }[]
): ProcessedChartData => {
  // Create datasets
  const datasets = dataSources.map((source, index) => ({
    label: datasetLabels[index],
    data: labels.map((label) => source[label] || 0),
    backgroundColor: colors[index].backgroundColor,
    borderColor: colors[index].borderColor,
    borderWidth: 1,
  }));

  return {
    labels,
    datasets,
  };
};

export const getChartColors = (): {
  backgroundColor: string;
  borderColor: string;
}[] => [
  {
    backgroundColor: "rgba(53, 162, 235, 0.5)",
    borderColor: "rgba(53, 162, 235, 1)",
  },
  {
    backgroundColor: "rgba(255, 99, 132, 0.5)",
    borderColor: "rgba(255, 99, 132, 1)",
  },
  {
    backgroundColor: "rgba(75, 192, 192, 0.5)",
    borderColor: "rgba(75, 192, 192, 1)",
  },
  {
    backgroundColor: "rgba(255, 206, 86, 0.5)",
    borderColor: "rgba(255, 206, 86, 1)",
  },
];
