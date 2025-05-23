import type { IGroup } from "../interfaces/IGroup";
import type { GroupRepository } from "../repositories/Group.repository";

interface IGetGroupUseCase {
  execute(groupName: string): Promise<IGroup>;
}

export class GetGroup implements IGetGroupUseCase {
  private readonly repository: GroupRepository;

  constructor(repository: GroupRepository) {
    this.repository = repository;
  }

  async execute(groupName: string): Promise<IGroup> {
    try {
      const group = await this.repository.getGroup(groupName);
      return group;
    } catch (error) {
      console.error("Failed to fetch this group:", error);
      throw new Error("Failed to fetch group data");
    }
  }
}
