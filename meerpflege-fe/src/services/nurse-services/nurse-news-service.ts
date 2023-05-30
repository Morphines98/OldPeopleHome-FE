import { api } from 'src/boot/axios';
import { NewsItem } from 'src/models/NewsItem';
import { Endpoints } from '../request/endpoints';

export class NurseNewsService {
  static async getNurseNews(): Promise<NewsItem[]> {
    const response = await api.get(Endpoints.getNurseNews);
    console.log(response.data);
    const news = response.data as NewsItem[];
    return news;
  }
}