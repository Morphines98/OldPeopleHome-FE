import { Activity } from "src/models/Activity";
import { Endpoints } from "./request/endpoints";
import { api } from "src/boot/axios";

export class ActivitiesService {
    static async getActivities(): Promise<Activity[]> {
      const response = await api.get(Endpoints.getActivities);
      console.log(response.data)
      const news = response.data as Activity[];
      return news;
    };

    static async createActivities(item: Activity): Promise<boolean> {
        const response = await api.post(Endpoints.createActivities, item);
        console.log(response.data);
        return true as boolean;
      };
      
    static async editActivities(item: Activity): Promise<boolean> {
        const response = await api.put(Endpoints.editActivities+'/'+item.id, item);
        console.log(response.data);
        return true as boolean;
      };
      
    static async deleteActivities(id: number): Promise<boolean> {
        const response = await api.delete(Endpoints.deleteActivities+'/'+id);
        console.log(response.data);
        return true as boolean;
      };
}