import type { IVictim } from "../interfaces/IVictim";
import type { VictimsRepository } from "../repositories/Victims.repository";

interface IGetVictimsUseCase {
  execute(): Promise<IVictim[]>;
}

export class GetVictims implements IGetVictimsUseCase {
  private readonly repository: VictimsRepository;

  constructor(repository: VictimsRepository) {
    this.repository = repository;
  }

  async execute(): Promise<IVictim[]> {
    try {
      const victims = await this.repository.getRecent();
      return victims;
    } catch (error) {
      console.error("Failed to fetch recent victims:", error);
      throw new Error("Failed to fetch recent victims data");
    }
  }
}
