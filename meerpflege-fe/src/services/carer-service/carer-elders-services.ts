import { Elder } from "src/models/Elder";
import { Endpoints } from "../request/endpoints";
import { api } from "src/boot/axios";

export class CarerEldersService {
    static async getCarerElders(): Promise<Elder[]> {
      const response = await api.get(Endpoints.getCarerElders);
      const news = response.data as Elder[];
      return news;
    }
  }