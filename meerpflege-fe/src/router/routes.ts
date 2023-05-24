import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AdminDashboard.vue') },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
    ],
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
      },
      {
        path: 'groups',
        component: () => import('pages/GroupsPage.vue'),
      },
      {
        path: 'nurses',
        component: () => import('pages/NursesPage.vue'),
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
