import type { IVictimAPI } from "../types/IVictimApi";
import { apiClient } from "./apiClient";

export const getVictims = async (): Promise<IVictimAPI[]> => {
  const response = await apiClient.get("/recentvictims");
  return response.data;
};
