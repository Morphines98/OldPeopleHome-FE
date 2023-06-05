import { api } from 'src/boot/axios';
import { Endpoints } from '../request/endpoints';
import { WallItem } from 'src/models/WallItem';

export class CarerWallService {
  static async getCarerWall(): Promise<WallItem[]> {
    const response = await api.get(Endpoints.getCarerWall);
    const news = response.data as WallItem[];
    return news;
  }
}