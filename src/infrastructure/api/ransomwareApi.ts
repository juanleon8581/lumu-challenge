import { apiClient } from "./apiClient";
import type { IVictim } from "@/domain/interfaces/IVictim";

export const getVictims = async (): Promise<IVictim[]> => {
  const response = await apiClient.get("/recentvictims");
  return response.data;
};
