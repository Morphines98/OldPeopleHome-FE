import { defineStore } from 'pinia';
import { WorkingTimeForDay } from 'src/models/Visits';
import { VisitsService } from 'src/services/visists-service';

export const useVisitsStore = defineStore('visits', {
  actions: {
    async updateVisits(item: WorkingTimeForDay[]) {
      await VisitsService.updateVisits(item);
    },

    async getVisits() {
      return await VisitsService.getVisits();
    },
  },
});
