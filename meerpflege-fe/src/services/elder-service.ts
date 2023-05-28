import { api } from "src/boot/axios";
import { Endpoints } from "./request/endpoints";
import { Elder } from "src/models/Elder";

export class ElderService {
    static async getElders(): Promise<Elder[]> {
      const response = await api.get(Endpoints.getElders);
      console.log(response.data)
      const news = response.data as Elder[];
      return news;
    };

    static async createElders(item: Elder): Promise<boolean> {
        const response = await api.post(Endpoints.createElders, item);
        console.log(response.data);
        return true as boolean;
      };
      
    static async editElders(item: Elder): Promise<boolean> {
        const response = await api.put(Endpoints.editElders+'/'+item.id, item);
        console.log(response.data);
        return true as boolean;
      };
      
    static async deleteElders(id: number): Promise<boolean> {
        const response = await api.delete(Endpoints.deleteElders+'/'+id);
        console.log(response.data);
        return true as boolean;
      };
}