import { anonymousApi, api } from 'src/boot/axios';
import { User } from 'src/models/User';
import { Endpoints } from './request/endpoints';

export class AccountService {
  static async login(model: {
    email: string;
    password: string;
  }): Promise<User> {
    const response = await anonymousApi.post(Endpoints.login, model);
    const user = response.data as User;
    console.log(user);
    return user;
  }

  static async upload(file){
    const response = await api.post(Endpoints.upload, file);
    return response.data;
  }
}
