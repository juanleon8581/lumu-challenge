import type { IGroup } from "../interfaces/IGroup";

export abstract class GroupRepository {
  abstract getGroup(): Promise<IGroup[]>;
}
