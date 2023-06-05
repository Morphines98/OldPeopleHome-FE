import { api } from 'src/boot/axios';
import { Endpoints } from '../request/endpoints';
import { WallItem } from 'src/models/WallItem';

export class NurseWallService {
  static async getNurseWall(): Promise<WallItem[]> {
    const response = await api.get(Endpoints.getNurseWall);
    const news = response.data as WallItem[];
    return news;
  }
  
  static async createNurseWall(item: WallItem): Promise<boolean> {
    const response = await api.post(Endpoints.postNurseWall, item);
    return true as boolean;
  }
}