import type { IVictim } from "../interfaces/IVictim";

export abstract class VictimsRepository {
  abstract getRecent(): Promise<IVictim[]>;
}
