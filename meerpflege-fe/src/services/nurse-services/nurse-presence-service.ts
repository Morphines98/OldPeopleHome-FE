import { api } from "src/boot/axios";
import { Endpoints } from "../request/endpoints";
import { ActivityPresence } from 'src/models/ActivityPresence';

export class NursePresenceService {
    
    static async getNurseActivityPresence(id:number): Promise<ActivityPresence[]> {
      const response = await api.get(Endpoints.getNurseActivityPresence+'/'+id);
      const presence = response.data as ActivityPresence[];
      return presence;
    }
    
    static async createActivityPreasence(items: ActivityPresence[]): Promise<boolean> {
    const response = await api.post(Endpoints.postNurseActivityPresence, items);
    return true as boolean;
  }
  }
