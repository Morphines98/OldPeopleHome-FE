export interface Nurse {
  id: number;
  name: string;
  lastName: string;
  description: string;
  homeId: number;
  groupId: number | null;
  isDeleted: boolean;
  startWorkingDate: Date;
  nurseAvatarUrl: string | null;
  email: string;
  phoneNumber:string | null;
}
