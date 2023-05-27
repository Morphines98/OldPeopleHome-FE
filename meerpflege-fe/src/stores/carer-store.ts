import { defineStore } from "pinia";
import { Carer } from "src/models/Carer";
import { CarersService } from "src/services/carers-service";

export const useCarersStore = defineStore('carers', {
    actions: {
    
      async getCarers()
      {
        return await CarersService.getCarers();
      },
      async createCarers(item: Carer){
        await CarersService.createCarers(item);
      },
      async deleteCarers(id: number){
        await CarersService.deleteCarer(id);
      },
      async editCarers(item: Carer){
        await CarersService.editCarer(item);
      },
    },
  });