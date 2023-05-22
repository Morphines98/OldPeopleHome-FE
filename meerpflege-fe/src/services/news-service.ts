import { api } from 'src/boot/axios';
import { Endpoints } from './request/endpoints';
import { NewsItem } from 'src/models/NewsItem';

export class NewsService {
  static async getNews(): Promise<NewsItem[]> {
    const response = await api.get(Endpoints.getNews);
    console.log(response.data);
    const news = response.data as NewsItem[];
    return news;
  }

  static async createNews(item: NewsItem): Promise<boolean> {
    const response = await api.post(Endpoints.createNews, item);
    console.log(response.data);
    return true as boolean;
  }
}
