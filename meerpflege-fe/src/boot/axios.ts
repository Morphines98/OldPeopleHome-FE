import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { Endpoints } from 'src/services/request/endpoints';
import { useAccountStore } from 'src/stores/global';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: Endpoints.baseUrl });
const anonymousApi = axios.create({ baseURL: Endpoints.baseUrl, withCredentials:true });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  app.config.globalProperties.$anonymousApi = anonymousApi;

  const auth = useAccountStore();

  api.interceptors.request.use(
    async (config) => {
      const access_token = auth.jwtToken;
      config.headers.setAuthorization(`Bearer ${access_token}`);
      config.headers.setAccept('application/json');

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

});

export { api, anonymousApi };
