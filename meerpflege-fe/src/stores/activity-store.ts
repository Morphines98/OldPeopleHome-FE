import { defineStore } from "pinia";
import { Activity } from "src/models/Activity";
import { ActivitiesService } from "src/services/activities-service";

export const useActivityStore = defineStore('activities', {
    actions: {
    
      async getActivities()
      {
        return await ActivitiesService.getActivities();
      },
      async createActivities(item: Activity){
        await ActivitiesService.createActivities(item);
      },
      async deleteActivities(id: number){
        await ActivitiesService.deleteActivities(id);
      },
      async editActivities(item: Activity){
        await ActivitiesService.editActivities(item);
      },
    },
  });