export class Endpoints {
  static baseUrl = 'http://localhost:5000/api/';
  // account
  static login = 'account/login';
  static signup = 'account/sign-up';
  static signout = 'account/sign-out';
  static refreshToken = 'account/refresh-token';

  static getNews = 'news';
  static createNews = 'news';

  static getGroups = 'HomeGroups';
  static postGroup = 'HomeGroups';
}
