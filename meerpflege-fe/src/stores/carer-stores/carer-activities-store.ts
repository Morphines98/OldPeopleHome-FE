import { defineStore } from "pinia";
import { CarerActivitiesService } from "src/services/carer-service/carer-activities-services";

export const useCarerActivitiesStore = defineStore('activities', {
    actions: {
    
      async getNurseActivities()
      {
        return await CarerActivitiesService.getCarerActivities();
      },
    },
  });