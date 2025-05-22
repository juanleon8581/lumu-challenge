import type { VictimsRepository } from "@/domain/repositories/Victims.repository";

import { apiClient } from "./apiClient";
import type { IVictim } from "@/domain/interfaces/IVictim";
import type { IVictimAPI } from "../types/IVictimApi";
import { Victim } from "@/domain/entities/Victim";

export class VictimsRepositoryImpl implements VictimsRepository {
  async getRecent(): Promise<IVictim[]> {
    const response = await apiClient.get("/recentvictims");
    const victims: IVictim[] = response.data.map((victim: IVictimAPI) =>
      Victim.fromJson(victim)
    );

    return victims;
  }
}
