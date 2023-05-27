import { defineStore } from 'pinia';
import { getgroups } from 'process';
import { Group } from 'src/models/Group';
import { NewsItem } from 'src/models/NewsItem';
import { Nurse } from 'src/models/Nurse';
import { AccountService } from 'src/services/account-service';
import { GroupsService } from 'src/services/groups-service';
import { NewsService } from 'src/services/news-service';
import { NurseService } from 'src/services/nurses-service';

interface User {
  refreshToken: string;
  token: string;
  role: UserRole | null;
}

export enum UserRole {
  Admin = 'Admin',
  Nurse = 'Nurse',
  Carer = 'CareTaker',
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
      return this.user?.role == UserRole.Carer;
    },
  },
  actions: {
    async logIn(model: { email: string; password: string }) {
      const user = await AccountService.login(model);
      this.jwtToken = user.token;
      this.refreshToken = 'dana';

      localStorage.setItem('token', this.jwtToken);
      localStorage.setItem('user', JSON.stringify(user));

      this.user = {
        refreshToken: 'refreshToken123',
        token: user.token,
        role: UserRole[user.role as keyof typeof UserRole] || null,
      };
      switch (this.userRole) {
        case UserRole.Admin:
          this.router.push('Dashboard');
          break;
        case UserRole.Nurse:
          this.router.push('NurseDashboard');
          break;
        case UserRole.Carer:
          this.router.push('CarerDashboard');
          break;
      }
    },

    logOut() {
      this.jwtToken = null;
      this.refreshToken = null;
      localStorage.removeItem('token');
      this.router.push('Login');
    },

    async getNews() {
      return await NewsService.getNews();
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
