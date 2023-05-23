import { api } from 'src/boot/axios';
import { Endpoints } from './request/endpoints';
import { Group } from 'src/models/Group';

export class GroupsService {
  static async getGroups(): Promise<Group[]> {
    const response = await api.get(Endpoints.getGroups);
    console.log(response.data)
    const news = response.data as Group[];
    return news;
  };

  static async createGroup(item:Group): Promise<boolean> {
    const response = await api.post(Endpoints.postGroup,item);
    console.log(response.data)
    return true;
  };

  static async editGroup(item:Group): Promise<boolean> {
    const response = await api.put(Endpoints.postGroup+'/'+item.id,item);
    console.log(response.data)
    return true;
  }
}
