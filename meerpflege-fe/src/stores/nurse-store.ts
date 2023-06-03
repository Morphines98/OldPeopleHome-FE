import { defineStore } from "pinia";
import { Nurse } from "src/models/Nurse";
import { NurseService } from "src/services/nurses-service";

export const useNurseStore = defineStore('nurse', {
    actions: {

      async getNurses()
      {
        return await NurseService.getNurses();
      },
      async createNurse(item: Nurse){
        await NurseService.createNurse(item);
      },
      async deleteNurse(id: number){
        await NurseService.deleteNurse(id);
      },
      async editNurse(item: Nurse){
        await NurseService.editNurse(item);
      },
      async getNurse(){
      return await NurseService.getNurse();
      }

    },
  });
