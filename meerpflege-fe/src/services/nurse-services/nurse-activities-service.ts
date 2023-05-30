import { api } from 'src/boot/axios';
import { Endpoints } from '../request/endpoints';
import { Activity } from 'src/models/Activity';

export class NurseActivitiesService {
  static async getNurseActivities(): Promise<Activity[]> {
    const response = await api.get(Endpoints.getNurseActivities);
    console.log(response.data);
    const news = response.data as Activity[];
    return news;
  }
}