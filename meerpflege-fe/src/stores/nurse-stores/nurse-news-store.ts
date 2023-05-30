import { defineStore } from "pinia";
import { NurseNewsService } from "src/services/nurse-services/nurse-news-service";

export const useNurseNewsStore = defineStore('news', {
    actions: {
    
      async getNurseNews()
      {
        return await NurseNewsService.getNurseNews();
      },
    },
  });