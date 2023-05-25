export interface Nurse {
  id: number;
  name: string;
  lastName: string;
  description: string;
  homeId: number;
  groupId: number | null;
  isDeleted: boolean;
  startWorkingDate: string;
  avatarUrl: string | null;
  email: string;
}
