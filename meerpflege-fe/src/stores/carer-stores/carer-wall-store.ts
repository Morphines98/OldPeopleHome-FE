import { defineStore } from "pinia";
import { CarerWallService } from "src/services/carer-service/carer-wall-services";

export const useCarerWallStore = defineStore('wall', {
    actions: {
    
      async getCarerWall()
      {
        return await CarerWallService.getCarerWall();
      },
    },
  });