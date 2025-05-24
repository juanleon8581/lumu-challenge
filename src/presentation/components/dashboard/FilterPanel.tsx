import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

// Types for filters
export interface FilterState {
  showGroups: boolean;
  showSectors: boolean;
  showMonths: boolean;
}

// Component props
interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const FilterPanel = ({ filters, onFiltersChange }: FilterPanelProps) => {
  const handleFilterChange = (key: keyof FilterState) => {
    onFiltersChange({
      ...filters,
      [key]: !filters[key],
    });
  };

  return (
    <Card className="w-1/2 shadow-none text-center border-0">
      <CardHeader>
        <CardDescription>
          Selecciona el tipo de datos que deseas visualizar en el gráfico.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="groups"
              checked={filters.showGroups}
              onCheckedChange={() => handleFilterChange("showGroups")}
            />
            <Label htmlFor="groups" className="font-medium">
              Mostrar Datos por Grupo
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="sectors"
              checked={filters.showSectors}
              onCheckedChange={() => handleFilterChange("showSectors")}
            />
            <Label htmlFor="sectors" className="font-medium">
              Mostrar Datos por sector
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="months"
              checked={filters.showMonths}
              onCheckedChange={() => handleFilterChange("showMonths")}
            />
            <Label htmlFor="months" className="font-medium">
              Mostrar Datos por mes
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
