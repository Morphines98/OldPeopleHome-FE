export class Endpoints {
  static baseUrl = 'http://localhost:5000/api/';
  // account
  static login = 'account/login';
  static signup = 'account/sign-up';
  static signout = 'account/sign-out';
  static refreshToken = 'account/refresh-token';

  static getNews = 'news';
  static createNews = 'news';
  static deleteNews ='news';
  static updateNews ='news';

  static getGroups = 'HomeGroups';
  static postGroup = 'HomeGroups';
  static putGroup = 'HomeGroups';
  static deleteGroup = 'HomeGroups';

  static getNurses = 'Nurses';
  static createNurse = 'Nurses';
  static deleteNurse = 'Nurses';
  static editNurse = 'Nurses';

  static getCarers= 'Carers';
  static createCarers= 'Carers';
  static editCarers= 'Carers';
  static deleteCarers= 'Carers'; 
  
  static getActivities= 'Activities';
  static createActivities= 'Activities';
  static editActivities= 'Activities';
  static deleteActivities= 'Activities';


}
