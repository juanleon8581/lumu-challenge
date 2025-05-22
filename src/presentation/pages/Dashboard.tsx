import VictimList from "@/presentation/components/dashboard/VictimList";
import VictimDashboardCharts from "@/presentation/components/dashboard/VictimDashboardCharts";
import { ScrollArea } from "../components/ui/scroll-area";

const Dashboard = () => {
  return (
    <ScrollArea className="h-screen w-full p-4">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">
          Dashboard de Víctimas recientes de Ransomware
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Análisis Estadístico</h2>
          <VictimDashboardCharts />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Lista de Víctimas</h2>
          <VictimList />
        </div>
      </div>
    </ScrollArea>
  );
};

export default Dashboard;
