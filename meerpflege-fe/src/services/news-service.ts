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
  static async deleteNews(id:number): Promise<boolean> {
    const response = await api.delete(Endpoints.deleteNews+'/'+id);
    console.log(response.data)
    return true;
  }
  static async createNews(item: NewsItem): Promise<boolean> {
    const response = await api.post(Endpoints.createNews, item);
    console.log(response.data);
    return true as boolean;
  }
  
  static async editNews(item: NewsItem): Promise<boolean> {
    const response = await api.put(Endpoints.updateNews+'/'+item.id, item);
    console.log(response.data);
    return true as boolean;
  }
}
