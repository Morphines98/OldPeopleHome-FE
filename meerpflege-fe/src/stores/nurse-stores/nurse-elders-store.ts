import { defineStore } from "pinia";
import { NurseEldersService } from "src/services/nurse-services/nurse-elders-service";

export const useNurseElderStore = defineStore('elders', {
    actions: {
    
      async getNurseElders()
      {
        return await NurseEldersService.getNurseElders();
      },
    },
  });