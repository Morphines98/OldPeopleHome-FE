import { defineStore } from "pinia";
import { CarerEldersService } from "src/services/carer-service/carer-elders-services";

export const useCarerEldersStore = defineStore('elders', {
    actions: {
    
      async getCarerElders()
      {
        return await CarerEldersService.getCarerElders();
      },
    },
  });