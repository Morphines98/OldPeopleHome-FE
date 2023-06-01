import { defineStore } from "pinia";
import { CarerNewsService } from "src/services/carer-service/carer-news-services";

export const useCarerNewsStore = defineStore('news', {
    actions: {
    
      async getCarerNews()
      {
        return await CarerNewsService.getCarersNews();
      },
      async getNurseNewsById(id:number)
      {
        return await CarerNewsService.getCarerNewsById(id);
      }
    },
  });