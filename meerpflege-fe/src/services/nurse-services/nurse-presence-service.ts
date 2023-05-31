import { api } from "src/boot/axios";
import { Endpoints } from "../request/endpoints";
import { ActivityPresence } from 'src/models/ActivityPresence';

export class NursePresenceService {
    
    static async getNurseActivityPresence(id:number): Promise<ActivityPresence[]> {
      const response = await api.get(Endpoints.getNurseActivityPresence+'/'+id);
      console.log(response.data);
      const presence = response.data as ActivityPresence[];
      return presence;
    }
    
    static async createActivityPreasence(items: ActivityPresence[]): Promise<boolean> {
    const response = await api.post(Endpoints.postNurseActivityPresence, items);
    console.log(response.data);
    return true as boolean;
  }
  }
