import { useQuery } from "@tanstack/react-query";
import { VictimsRepositoryImpl } from "@/infrastructure/api/ransomwareApi";
import { GetVictims } from "@/domain/use-cases/GetVictims";

import { format, parseISO } from "date-fns";
import { BarChart } from "./BarChart";
import { PieChart } from "./PieChart";

const victimsRepository = new VictimsRepositoryImpl();

export const VictimDashboardCharts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["victims"],
    queryFn: () => new GetVictims(victimsRepository).execute(),
  });

  if (isLoading) return <div>Cargando gráficos...</div>;
  if (error) return <div>Error al cargar datos para los gráficos</div>;
  if (!data || data.length === 0) return <div>No hay datos disponibles</div>;

  // Agrupar víctimas por grupo de ransomware
  const groupCounts: { [keyof: string]: number } = {};
  data.forEach((victim) => {
    const group = victim.group || "Desconocido";
    groupCounts[group] = (groupCounts[group] || 0) + 1;
  });

  // Agrupar víctimas por sector
  const sectorCounts: { [keyof: string]: number } = {};
  data.forEach((victim) => {
    const sector = victim.sector ?? "Desconocido";
    sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
  });

  // Agrupar víctimas por país
  const countryCounts: { [keyof: string]: number } = {};
  data.forEach((victim) => {
    const country = victim.country ?? "Desconocido";
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  });

  // Agrupar víctimas por mes
  const monthCounts: { [keyof: string]: number } = {};
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

  return (
    <div className="flex flex-col items-center justify-around gap-4 ">
      <BarChart
        data={groupCounts}
        chartLabel={"# victimas"}
        chartTitle="Victimas por grupo"
      />
      <PieChart data={sectorCounts} chartTitle={"Distribución por sector"} />
      <BarChart
        data={monthCounts}
        chartLabel={"# Ataques por mes"}
        chartTitle="Ataques por mes"
        backgroundColor="rgba(75, 192, 192, 0.5)"
        borderColor="rgba(75, 192, 192, 1)"
      />
      <PieChart data={countryCounts} chartTitle={"Distribución por País"} />
    </div>
  );
};
