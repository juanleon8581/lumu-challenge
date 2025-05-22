import { VictimDashboardCharts } from "@/presentation/components/dashboard/VictimDashboardCharts";
import { ScrollArea } from "../components/ui/scroll-area";
import { VictimsRepositoryImpl } from "@/infrastructure/api/ransomwareApi";
import { GetVictims } from "@/domain/use-cases/GetVictims";
import { useQuery } from "@tanstack/react-query";

const victimsRepository = new VictimsRepositoryImpl();

export const VictimsCarts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["victims"],
    queryFn: () => new GetVictims(victimsRepository).execute(),
  });

  if (isLoading) return <div>Cargando gráfico...</div>;
  if (error) return <div>Error al cargar datos para el gráfico</div>;
  if (!data || data.length === 0) return <div>No hay datos disponibles</div>;

  return (
    <ScrollArea className="h-screen w-full p-4">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Dashboard de Víctimas recientes de Ransomware
        </h1>

        <div className="mb-8">
          <VictimDashboardCharts data={data} />
        </div>
      </div>
    </ScrollArea>
  );
};
