import { api } from 'src/boot/axios';
import { Endpoints } from '../request/endpoints';
import { Activity } from 'src/models/Activity';

export class CarerActivitiesService {
  static async getCarerActivities(): Promise<Activity[]> {
    const response = await api.get(Endpoints.getCarerActivities);
    console.log(response.data);
    const news = response.data as Activity[];
    return news;
  }
}