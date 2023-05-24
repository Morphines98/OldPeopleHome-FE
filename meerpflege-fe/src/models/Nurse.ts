export interface Nurse {
    id: number;
    name: string;
    description: string;
    homeId: number;
    groupId: number | null;
    isDeleted: boolean;
    startWorkingDate: string;
    avatar: NurseAvatar | null;
  }

  export interface NurseAvatar{
    id: number;
    name: string;
    url: string;
  }