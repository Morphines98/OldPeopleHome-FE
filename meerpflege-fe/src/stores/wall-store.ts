import { defineStore } from "pinia";
import { WallItem } from "src/models/WallItem";
import { WallService } from "src/services/wall-service";

export const useWallStore = defineStore('wallItems', {
    actions: {
    
      async getWallItems()
      {
        return await WallService.getWallItems();
      },
      async createWallItems(item: WallItem){
        await WallService.createWallItems(item);
      },
      async deleteWallItems(id: number){
        await WallService.deleteWallItems(id);
      },
      async editWallItems(item: WallItem){
        await WallService.editWallItems(item);
      },
    },
  });