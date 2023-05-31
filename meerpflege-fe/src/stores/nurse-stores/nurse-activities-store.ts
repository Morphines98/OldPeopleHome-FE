import { defineStore } from "pinia";
import { ActivityPresence } from "src/models/ActivityPresence";
import { NurseActivitiesService } from "src/services/nurse-services/nurse-activities-service";
import { NursePresenceService } from "src/services/nurse-services/nurse-presence-service";

export const useNurseActivitiesStore = defineStore('activities', {
    actions: {
    
      async getNurseActivities()
      {
        return await NurseActivitiesService.getNurseActivities();
      },

      async getNursePresence(id:number){
        return await NursePresenceService.getNurseActivityPresence(id);
      },

      async createNursePresence(items:ActivityPresence[]){
        return await NursePresenceService.createActivityPreasence(items);
      },
    },
  });