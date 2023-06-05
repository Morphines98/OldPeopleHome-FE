import { api } from "src/boot/axios";
import { Endpoints } from "./request/endpoints";
import { Carer } from "src/models/Carer";

export class CarersService {
    static async getCarers(): Promise<Carer[]> {
      const response = await api.get(Endpoints.getCarers);
      const news = response.data as Carer[];
      return news;
    };
    
    static async getCarer(): Promise<Carer> {
      const response = await api.get(Endpoints.getCarer);
      const news = response.data as Carer;
      return news;
    };

    static async createCarers(item: Carer): Promise<boolean> {
        const response = await api.post(Endpoints.createCarers, item);
        return true as boolean;
      };
      
    static async editCarer(item: Carer): Promise<boolean> {
        const response = await api.put(Endpoints.editCarers+'/'+item.id, item);
        return true as boolean;
      };
      
    static async deleteCarer(id: number): Promise<boolean> {
        const response = await api.delete(Endpoints.deleteCarers+'/'+id);
        return true as boolean;
      };
}