export interface Activity {
    id: number;
    title: string;
    date: Date;
    stringDate: string;
    homeId: number;
    location:string;
    description:string;
    specialCondition:string;
    groupId: number | null;
  }