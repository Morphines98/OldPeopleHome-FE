import { defineStore } from "pinia";
import { NurseActivitiesService } from "src/services/nurse-services/nurse-activities-service";

export const useNurseActivitiesStore = defineStore('activities', {
    actions: {
    
      async getNurseActivities()
      {
        return await NurseActivitiesService.getNurseActivities();
      },
    },
  });