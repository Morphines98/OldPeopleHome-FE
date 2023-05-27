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
  role: string;
}

export const useAccountStore = defineStore('account', {
  state: () => ({
    user: null as User | null,
    jwtToken: localStorage.getItem('token') as string | null,
    refreshToken: 'dana' as string | null,
  }),
  getters: {
    isLoggedIn(): boolean {
      return this.jwtToken != null && this.refreshToken != null;
    },
  },
  actions: {
    async logIn(model: { email: string; password: string }) {
      const user = await AccountService.login(model);
      this.jwtToken = user.token;
      this.refreshToken = 'dana';
      localStorage.setItem('token', this.jwtToken);

      this.router.push('Dashboard');
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
    async deleteNews(id:number) {
      return await NewsService.deleteNews(id);
    },
    async editNews(item: NewsItem) {
      return await NewsService.editNews(item);
    },
    async crateNews(item: NewsItem){
          await NewsService.createNews(item);
    },
    async getGroups() {
      return await GroupsService.getGroups();
    },
    async createGroup(item: Group){
      await GroupsService.createGroup(item);
    },
    async editGroup(item: Group){
      await GroupsService.editGroup(item);
    },
    async deleteGroup(id: number){
      await GroupsService.deleteGroup(id);
    }
  },
});
