import { defineStore } from "pinia";
import { Elder } from "src/models/Elder";
import { ElderService } from "src/services/elder-service";

export const useElderStore = defineStore('elders', {
    actions: {
    
      async getElders()
      {
        return await ElderService.getElders();
      },
      async createElders(item: Elder){
        await ElderService.createElders(item);
      },
      async deleteElders(id: number){
        await ElderService.deleteElders(id);
      },
      async editElders(item: Elder){
        await ElderService.editElders(item);
      },
    },
  });