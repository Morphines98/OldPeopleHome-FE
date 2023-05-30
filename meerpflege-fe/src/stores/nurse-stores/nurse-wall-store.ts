import { defineStore } from "pinia";
import { WallItem } from "src/models/WallItem";
import { NurseWallService } from "src/services/nurse-services/nurse-wall-service";

export const useNurseWallStore = defineStore('wall', {
    actions: {
    
      async getNurseWall()
      {
        return await NurseWallService.getNurseWall();
      },
      async createWallItems(item: WallItem){
        await NurseWallService.createNurseWall(item);
      },
    },
  });