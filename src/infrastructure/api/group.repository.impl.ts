import type { GroupRepository } from "@/domain/repositories/Group.repository";
import { apiClient } from "./apiClient";
import type { IGroup } from "@/domain/interfaces/IGroup";
export class GroupRepositoryImpl implements GroupRepository {
  async getGroup(groupName: string): Promise<IGroup> {
    const response = await apiClient.get(`/group/${groupName}`);
    const group: IGroup = response.data.url;

    return group;
  }
}
