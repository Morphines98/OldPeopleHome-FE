import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { UserRole, useAccountStore } from 'src/stores/global';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const auth = useAccountStore();
    const role = auth.userRole;

    if (to.matched.some((record) => record.meta.roles)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page
      if (!auth.isLoggedIn) {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        });
      } else {
        // check if the user role is one of the roles allowed for this route
        if (to.matched.some((record) => record.meta.roles.includes(role))) {
          next();
        } else {
          next({ name: 'Error' }); // or redirect to a different error page
        }
      }
    } else {
      next(); // make sure to always call next()!
    }
  });

  return Router;
});
