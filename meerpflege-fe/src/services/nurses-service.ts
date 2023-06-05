import { api } from 'src/boot/axios';
import { Nurse } from 'src/models/Nurse';
import { Endpoints } from './request/endpoints';

export class NurseService {
  static async getNurses(): Promise<Nurse[]> {
    const response = await api.get(Endpoints.getNurses);
    console.log(response.data);
    const news = response.data as Nurse[];
    return news;
  }

  static async createNurse(item: Nurse): Promise<boolean> {
    const response = await api.post(Endpoints.createNurse, item);
    return true as boolean;
  }

  static async editNurse(item: Nurse): Promise<boolean> {
    const response = await api.put(Endpoints.editNurse + '/' + item.id, item);
    return true as boolean;
  }

  static async deleteNurse(id: number): Promise<boolean> {
    const response = await api.delete(Endpoints.createNurse + '/' + id);
    return true as boolean;
  }
  static async getNurse(): Promise<Nurse> {
    const response = await api.get(Endpoints.nurseProfile);
    const nurse = response.data as Nurse;
    return nurse;
  }
}
