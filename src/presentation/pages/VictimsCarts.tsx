import { useEffect } from "react";
import { VictimDashboardCharts } from "@/presentation/components/dashboard/VictimDashboardCharts";
import { ScrollArea } from "../components/ui/scroll-area";
import { useVictimsStore } from "@/presentation/store/victimsStore";

export const VictimsCarts = () => {
  const { victims, isLoading, error, fetchVictims } = useVictimsStore();

  useEffect(() => {
    fetchVictims();
  }, [fetchVictims]);

  if (isLoading) return <div>Cargando gráfico...</div>;
  if (error) return <div>Error al cargar datos para el gráfico</div>;
  if (!victims || victims.length === 0)
    return <div>No hay datos disponibles</div>;

  return (
    <ScrollArea className="h-screen w-full p-4">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Dashboard de Víctimas recientes de Ransomware
        </h1>

        <div className="mb-8">
          <VictimDashboardCharts />
        </div>
      </div>
    </ScrollArea>
  );
};
