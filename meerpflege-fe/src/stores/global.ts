import { defineStore } from 'pinia';
import { getgroups } from 'process';
import { Group } from 'src/models/Group';
import { NewsItem } from 'src/models/NewsItem';
import { Nurse } from 'src/models/Nurse';
import { AccountService } from 'src/services/account-service';
import { GroupsService } from 'src/services/groups-service';
import { NewsService } from 'src/services/news-service';
import { NurseService } from 'src/services/nurses-service';
import { useNurseStore } from './nurse-store';
import { useCarersStore } from './carer-store';

interface User {
  refreshToken: string;
  token: string;
  role: UserRole | null;
  name: string;
  email: string;
  profilePictureUrl: string;
}

export enum UserRole {
  Admin = 'Admin',
  Nurse = 'Nurse',
  CareTaker = 'CareTaker',
  // add other roles as needed
}

export const useAccountStore = defineStore('account', {
  state: () => ({
    user: (() => {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      return (
        user && {
          ...user,
          role: UserRole[user.role as keyof typeof UserRole] || null,
        }
      );
    })() as User | null,
    jwtToken: localStorage.getItem('token') as string | null,
    refreshToken: 'dana' as string | null,
    nurseStore: useNurseStore(),
    carerStore: useCarersStore(),
  }),
  getters: {
    isLoggedIn(): boolean {
      return this.jwtToken != null && this.refreshToken != null;
    },
    userRole(): UserRole | null {
      return this.user?.role || null;
    },
    isAdmin(): boolean {
      return this.user?.role == UserRole.Admin;
    },
    isNurse(): boolean {
      return this.user?.role == UserRole.Nurse;
    },
    isCarer(): boolean {
      return this.user?.role == UserRole.CareTaker;
    },
  },
  actions: {
    async forgotPasswordRequest(model: { email: string }) {
      await AccountService.forgotPasswordRequest(model);
    },

    async logIn(model: { email: string; password: string }) {
      const user = await AccountService.login(model);

      this.jwtToken = user.token;
      this.refreshToken = 'dana';

      localStorage.setItem('token', this.jwtToken);

      this.user = {
        refreshToken: 'refreshToken123',
        token: user.token,
        role: UserRole[user.role as keyof typeof UserRole] || null,
        name: user.name,
        email: user.email,
        profilePictureUrl: '',
      };

      localStorage.setItem('user', JSON.stringify(this.user));

      switch (this.userRole) {
        case UserRole.Admin:
          this.router.push('Dashboard');
          break;
        case UserRole.Nurse:
          const profileInfo = await this.nurseStore.getNurse();
          this.user.profilePictureUrl = profileInfo.nurseAvatarUrl;
          this.user.name = profileInfo.name;
          this.router.push('NurseDashboard');
          break;
        case UserRole.CareTaker:
          const profileInfoCarer = await this.carerStore.getCarer();
          this.user.name = profileInfoCarer.name;
          this.router.push('CarerDashboard');
          break;
      }
      localStorage.setItem('user', JSON.stringify(this.user));

    },

    logOut() {
      this.jwtToken = null;
      this.refreshToken = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.push('/');
    },

    async resetPassword(resetModel: {
      userId: string;
      newPassword: string;
      resetToken: string;
    }) {
      const response = await AccountService.resetPassword(resetModel);
      this.router.push('/login');
    },

    async uploadFile(file) {
      return await AccountService.upload(file);
    },

    async getNews() {
      return await NewsService.getNews();
    },
    async getNewsById(id: number) {
      return await NewsService.getNewsById(id);
    },
    async deleteNews(id: number) {
      return await NewsService.deleteNews(id);
    },
    async editNews(item: NewsItem) {
      return await NewsService.editNews(item);
    },
    async crateNews(item: NewsItem) {
      await NewsService.createNews(item);
    },
    async getGroups() {
      return await GroupsService.getGroups();
    },
    async createGroup(item: Group) {
      await GroupsService.createGroup(item);
    },
    async editGroup(item: Group) {
      await GroupsService.editGroup(item);
    },
    async deleteGroup(id: number) {
      await GroupsService.deleteGroup(id);
    },
  },
});
