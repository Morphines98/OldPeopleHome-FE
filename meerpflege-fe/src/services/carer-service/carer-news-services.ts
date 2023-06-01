import { api } from 'src/boot/axios';
import { NewsItem } from 'src/models/NewsItem';
import { Endpoints } from '../request/endpoints';

export class CarerNewsService {
  static async getCarersNews(): Promise<NewsItem[]> {
    const response = await api.get(Endpoints.getCarerNews);
    console.log(response.data);
    const news = response.data as NewsItem[];
    return news;
  }
  static async getCarerNewsById(id:number): Promise<NewsItem> {
    const response = await api.get(Endpoints.getCarerNews+'/'+id);
    console.log(response.data);
    const news = response.data as NewsItem;
    return news;
  }
}