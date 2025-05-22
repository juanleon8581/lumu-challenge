import { VictimDashboardCharts } from "@/presentation/components/dashboard/VictimDashboardCharts";
import { ScrollArea } from "../components/ui/scroll-area";

export const VictimsCarts = () => {
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
