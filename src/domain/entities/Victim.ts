import type { IVictimAPI } from "@/infrastructure/types/IVictimApi";
import type { IVictim } from "../interfaces/IVictim";

export class Victim implements IVictim {
  id: string;
  name: string;
  sector?: string;
  country?: string;
  attackDate: string;
  group: string;

  constructor(data: IVictim) {
    this.id = data.id;
    this.name = data.name;
    this.sector = data.sector;
    this.country = data.country;
    this.attackDate = data.attackDate;
    this.group = data.group;
  }

  static fromJson(json: IVictimAPI): Victim {
    const { victim, activity, country, attackdate, group } = json;

    if (!victim || !attackdate || !group) {
      throw new Error("Invalid data");
    }

    return new Victim({
      id: `${victim}-${attackdate}`,
      name: victim,
      sector: activity,
      country,
      attackDate: attackdate,
      group,
    });
  }
}
