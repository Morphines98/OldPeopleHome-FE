import { defineStore } from 'pinia';
import { getgroups } from 'process';
import { NewsItem } from 'src/models/NewsItem';
import { AccountService } from 'src/services/account-service';
import { GroupsService } from 'src/services/groups-service';
import { NewsService } from 'src/services/news-service';

interface User {
  refreshToken: string;
  token: string;
  role: string;
}

export const useAccountStore = defineStore('account', {
  state: () => ({
    user: null as User | null,
    jwtToken: localStorage.getItem('token') as string | null,
    refreshToken: null as string | null,
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
      this.refreshToken = 'aa';
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

    async getGroups() {
      return await GroupsService.getGroups();
    },

    async crateNews(item: NewsItem){
      await NewsService.createNews(item);
    }
  },
});
