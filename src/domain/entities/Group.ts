import type { IGroupAPI } from "@/infrastructure/types/IGroupApi";
import type { IGroup } from "../interfaces/IGroup";

export class Group implements IGroup {
  url: string;

  constructor(data: IGroup) {
    this.url = data.url;
  }

  static fromJson(json: IGroupAPI): Group {
    const { url } = json;

    if (!url) {
      throw new Error("Invalid data");
    }

    return new Group({
      url,
    });
  }
}
