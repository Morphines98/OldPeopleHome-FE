import { api } from "src/boot/axios";
import { Endpoints } from "./request/endpoints";
import { Carer } from "src/models/Carer";

export class CarersService {
    static async getCarers(): Promise<Carer[]> {
      const response = await api.get(Endpoints.getCarers);
      console.log(response.data)
      const news = response.data as Carer[];
      return news;
    };

    static async createCarers(item: Carer): Promise<boolean> {
        const response = await api.post(Endpoints.createCarers, item);
        console.log(response.data);
        return true as boolean;
      };
      
    static async editCarer(item: Carer): Promise<boolean> {
        const response = await api.put(Endpoints.createCarers+'/'+item.id, item);
        console.log(response.data);
        return true as boolean;
      };
      
    static async deleteCarer(id: number): Promise<boolean> {
        const response = await api.delete(Endpoints.createCarers+'/'+id);
        console.log(response.data);
        return true as boolean;
      };
}