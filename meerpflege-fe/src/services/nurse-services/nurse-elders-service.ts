import { api } from 'src/boot/axios';
import { Endpoints } from '../request/endpoints';
import { Elder } from 'src/models/Elder';

export class NurseEldersService {
  static async getNurseElders(): Promise<Elder[]> {
    const response = await api.get(Endpoints.getNurseElders);
    console.log(response.data);
    const news = response.data as Elder[];
    return news;
  }
}