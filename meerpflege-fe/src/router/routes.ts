import { UserRole, useAccountStore } from 'src/stores/global';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: (to) => {
      // Perform the redirect in a function.
      // The `to` argument contains the information about the route being navigated to.
      const auth = useAccountStore();
      const role = auth.userRole;
      const isLoggedIn = auth.isLoggedIn;

      if (!isLoggedIn) {
        return '/login';
      }

      switch (role) {
        case UserRole.Admin:
          return '/dashboard';
        case UserRole.Nurse:
          return '/nursedashboard';
        case UserRole.Carer:
          return '/carerdashboard';
        // Add other roles as necessary
        default:
          return '/error'; // If user's role is not recognized, redirect to error page
      }
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/AdminDashboard.vue'),
        meta: { roles: [UserRole.Admin] },
      },
    ],
    meta: { roles: [UserRole.Admin] },
  },
  {
    path: '/nursedashboard',
    name: 'NurseDashboard',
    component: () => import('layouts/NurseLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/NurseDashboard.vue'),
        meta: { roles: [UserRole.Nurse] },
      },
    ],
    meta: { roles: [UserRole.Nurse] },
  },
  {
    path: '/carerdashboard',
    name: 'CarerDashboard',
    component: () => import('layouts/CarerLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/CarerDashboard.vue'),
        meta: { roles: [UserRole.Carer] },
      },
    ],
    meta: { roles: [UserRole.Carer] },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('layouts/PublicLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
    meta: {
      public: true,
    },
  },
  {
    path: '/application',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'news',
        component: () => import('pages/AdminNews.vue'),
        meta: { roles: [UserRole.Admin] },
      },
      {
        path: 'groups',
        component: () => import('pages/GroupsPage.vue'),
        meta: { roles: [UserRole.Admin] },
      },
      {
        path: 'nurses',
        component: () => import('pages/NursesPage.vue'),
        meta: { roles: [UserRole.Admin] },
      },
      {
        path: 'carers',
        component: () => import('pages/CarersPage.vue'),
        meta: { roles: [UserRole.Admin] },
      },
      {
        path: 'activities',
        component: () => import('pages/ActivitiesPage.vue'),
        meta: { roles: [UserRole.Admin] },
      },
    ],
    meta: { roles: [UserRole.Admin] },
  },

  {
    path: '/nurse',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'news',
        component: () => import('pages/AdminNews.vue'),
      },
      
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
