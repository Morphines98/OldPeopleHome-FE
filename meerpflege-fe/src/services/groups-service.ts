import { api } from 'src/boot/axios';
import { Endpoints } from './request/endpoints';
import { Group } from 'src/models/Group';

export class GroupsService {
  static async getGroups(): Promise<Group[]> {
    const response = await api.get(Endpoints.getGroups);
    console.log(response.data)
    const news = response.data as Group[];
    return news;
  }
}
