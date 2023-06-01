import { api } from 'src/boot/axios';
import { Endpoints } from './request/endpoints';
import { WorkingTimeForDay } from 'src/models/Visits';

export class VisitsService {
  static async updateVisits(item: WorkingTimeForDay[]): Promise<boolean> {
    const response = await api.post(Endpoints.updateVisits, item);
    console.log(response.data);
    return true as boolean;
  }
  static async getVisits(): Promise<WorkingTimeForDay[]> {
    const response = await api.get(Endpoints.updateVisits);
    console.log(response.data);
    return response.data;
  }

}
