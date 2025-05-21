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
    const victims = await this.repository.getRecent();
    return victims;
  }
}
