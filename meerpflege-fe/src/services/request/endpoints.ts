export class Endpoints {
  static baseUrl = 'http://localhost:5000/api/';
  // account
  static login = 'account/login';
  static signup = 'account/sign-up';
  static signout = 'account/sign-out';
  static refreshToken = 'account/refresh-token';
  static resetPassword='account/resetPassword';

  static getNews = 'news';
  static createNews = 'news';
  static deleteNews ='news';
  static updateNews ='news';

  static getNurseNews = 'NurseNewsItems';
  static getNurseActivities = 'NurseActivities';
  static getNurseElders = 'NurseElders';
  static getNurseWall = 'NurseWallItems';
  static postNurseWall = 'NurseWallItems';
  static postNurseActivityPresence = 'ActivityPresence';
  static getNurseActivityPresence = 'ActivityPresence';

  static getCarerNews = 'CarersNews';
  static getCarerActivities = 'CarersActivities';
  static getCarerWall = 'CarerWall';

  static getGroups = 'HomeGroups';
  static postGroup = 'HomeGroups';
  static putGroup = 'HomeGroups';
  static deleteGroup = 'HomeGroups';

  static getNurses = 'Nurses';
  static nurseProfile = 'Nurses/GetProfileInfo'
  static createNurse = 'Nurses';
  static deleteNurse = 'Nurses';
  static editNurse = 'Nurses';

  static getCarers= 'Carers';
  static getCarer= 'Carers/GetProfileInfo';
  static createCarers= 'Carers';
  static editCarers= 'Carers';
  static deleteCarers= 'Carers';

  static getActivities= 'Activities';
  static createActivities= 'Activities';
  static editActivities= 'Activities';
  static deleteActivities= 'Activities';

  static getElders= 'Elders';
  static createElders= 'Elders';
  static editElders= 'Elders';
  static deleteElders= 'Elders';

  static getWall= 'WallItems';
  static createWall= 'WallItems';
  static editWall= 'WallItems';
  static deleteWall= 'WallItems';

  static updateVisits ='Visits'


  static upload = 'Utility'
}
