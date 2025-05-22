import { useMemo } from "react";
import {
  getVictimsByGroup,
  getVictimsBySector,
  getVictimsByMonth,
  getVictimsByCountry,
  getChartColors,
  type ProcessedChartData,
} from "@/presentation/utils/chartDataUtils";
import type { IVictim } from "@/domain/interfaces/IVictim";

export type ChartDataType =
  | "combined"
  | "byGroup"
  | "bySector"
  | "byCountry"
  | "byMonth";

export const useChartData = (
  victims: IVictim[] | undefined,
  type: ChartDataType = "combined"
) => {
  return useMemo(() => {
    if (!victims || victims.length === 0) {
      return null;
    }

    const victimsByGroup = getVictimsByGroup(victims);
    const victimsBySector = getVictimsBySector(victims);
    const victimsByMonth = getVictimsByMonth(victims);
    const victimsByCountry = getVictimsByCountry(victims);

    const colors = getChartColors();

    switch (type) {
      case "byGroup":
        return {
          labels: Object.keys(victimsByGroup),
          datasets: [
            {
              label: "# víctimas",
              data: Object.values(victimsByGroup),
              backgroundColor: colors[0].backgroundColor,
              borderColor: colors[0].borderColor,
              borderWidth: 1,
            },
          ],
        };
      case "bySector":
        return {
          labels: Object.keys(victimsBySector),
          datasets: [
            {
              label: "# víctimas",
              data: Object.values(victimsBySector),
              backgroundColor: colors[1].backgroundColor,
              borderColor: colors[1].borderColor,
              borderWidth: 1,
            },
          ],
        };
      case "byMonth":
        return {
          labels: Object.keys(victimsByMonth),
          datasets: [
            {
              label: "# ataques",
              data: Object.values(victimsByMonth),
              backgroundColor: colors[2].backgroundColor,
              borderColor: colors[2].borderColor,
              borderWidth: 1,
            },
          ],
        };
      case "byCountry":
        return {
          labels: Object.keys(victimsByCountry),
          datasets: [
            {
              label: "# víctimas",
              data: Object.values(victimsByCountry),
              backgroundColor: colors[3].backgroundColor,
              borderColor: colors[3].borderColor,
              borderWidth: 1,
            },
          ],
        };
      case "combined":
      default: {
        // For the combined chart, we need to create a union of all labels
        const combinedData: ProcessedChartData = {
          labels: [
            ...new Set([
              ...Object.keys(victimsByGroup),
              ...Object.keys(victimsBySector),
              ...Object.keys(victimsByMonth),
            ]),
          ],
          datasets: [
            {
              label: "Por Grupo",
              data: [],
              backgroundColor: colors[0].backgroundColor,
              borderColor: colors[0].borderColor,
              borderWidth: 1,
            },
            {
              label: "Por Sector",
              data: [],
              backgroundColor: colors[1].backgroundColor,
              borderColor: colors[1].borderColor,
              borderWidth: 1,
            },
            {
              label: "Por Mes",
              data: [],
              backgroundColor: colors[2].backgroundColor,
              borderColor: colors[2].borderColor,
              borderWidth: 1,
            },
          ],
        };

        // Fill in the data for each dataset
        combinedData.labels.forEach((label) => {
          combinedData.datasets[0].data.push(victimsByGroup[label] || 0);
          combinedData.datasets[1].data.push(victimsBySector[label] || 0);
          combinedData.datasets[2].data.push(victimsByMonth[label] || 0);
        });

        return combinedData;
      }
    }
  }, [victims, type]);
};
