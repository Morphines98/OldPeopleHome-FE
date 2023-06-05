import { api } from 'src/boot/axios';
import { Endpoints } from './request/endpoints';
import { Group } from 'src/models/Group';

export class GroupsService {
  static async getGroups(): Promise<Group[]> {
    const response = await api.get(Endpoints.getGroups);
    const news = response.data as Group[];
    return news;
  }

  static async createGroup(item: Group): Promise<boolean> {
    const response = await api.post(Endpoints.postGroup, item);
    return true;
  }


  static async editGroup(item:Group): Promise<boolean> {
    const response = await api.put(Endpoints.postGroup+'/'+item.id,item);
    return true;
  }
  static async deleteGroup(id:number): Promise<boolean> {
    const response = await api.delete(Endpoints.deleteGroup+'/'+id);
    return true;
  }
}
