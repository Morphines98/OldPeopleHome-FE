import { WallItem } from "src/models/WallItem";
import { Endpoints } from "./request/endpoints";
import { api } from "src/boot/axios";

export class WallService {
    static async getWallItems(): Promise<WallItem[]> {
      const response = await api.get(Endpoints.getWall);
      console.log(response.data);
      const news = response.data as WallItem[];
      return news;
    }
    static async deleteWallItems(id:number): Promise<boolean> {
      const response = await api.delete(Endpoints.deleteWall+'/'+id);
      console.log(response.data)
      return true;
    }
    static async createWallItems(item: WallItem): Promise<boolean> {
      const response = await api.post(Endpoints.createWall, item);
      console.log(response.data);
      return true as boolean;
    }
    
    static async editWallItems(item: WallItem): Promise<boolean> {
      const response = await api.put(Endpoints.editWall+'/'+item.id, item);
      console.log(response.data);
      return true as boolean;
    }
  }