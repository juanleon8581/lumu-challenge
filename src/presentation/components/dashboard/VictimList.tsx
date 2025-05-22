import { useQuery } from "@tanstack/react-query";
import { VictimsRepositoryImpl } from "@/infrastructure/api/ransomwareApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/components/ui/table";
import { GetVictims } from "@/domain/use-cases/GetVictims";

const victimsRepository = new VictimsRepositoryImpl();
const VictimList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["victims"],
    queryFn: () => new GetVictims(victimsRepository).execute(),
  });

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar víctimas</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Sector</TableHead>
          <TableHead>País</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Grupo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((victim) => (
          <TableRow key={`${victim.name}-${victim.attackDate}`}>
            <TableCell>{victim.name}</TableCell>
            <TableCell>{victim.sector ?? "-"}</TableCell>
            <TableCell>{victim.country ?? "-"}</TableCell>
            <TableCell>
              {new Intl.DateTimeFormat("en-US").format(
                new Date(victim.attackDate)
              )}
            </TableCell>
            <TableCell>{victim.group || "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default VictimList;
