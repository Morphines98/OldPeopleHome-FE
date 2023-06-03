import { UserRole, useAccountStore } from 'src/stores/global';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'default',
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
        case UserRole.CareTaker:
          return '/carerdashboard';
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
        meta: { roles: [UserRole.CareTaker] },
      },
    ],
    meta: { roles: [UserRole.CareTaker] },
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
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ResetPassword.vue') },
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
      {
        path: 'elders',
        component: () => import('pages/EldersPage.vue'),
        meta: { roles: [UserRole.Admin] },
      },
      {
        path: 'visits',
        component: () => import('pages/VisitsPage.vue'),
        meta: { roles: [UserRole.Admin] },
      },
      {
        path: 'wallitems',
        component: () => import('pages/WallItemsPage.vue'),
        meta: { roles: [UserRole.Admin] },
      },
    ],
    meta: { roles: [UserRole.Admin] },
  },

  {
    path: '/carer',
    component: () => import('layouts/CarerLayout.vue'),
    children: [
      {
        path: 'visits',
        component: () => import('pages/NursePages/NurseVisitsPage.vue'),
        meta: { roles: [UserRole.CareTaker] },
      },
      {
        path: 'profile',
        component: () => import('pages/CarerProfilePage.vue'),
        meta: { roles: [UserRole.CareTaker] },
      },
      {
        path: 'wall',
        component: () => import('pages/CarerPages/CarerWallPage.vue'),
      },
      {
        path: 'activity',
        component: () => import('pages/CarerPages/CarerActivitiesPage.vue'),
      },
      {
        path: 'news',
        component: () => import('pages/CarerPages/CarerNewsPage.vue'),
        meta: { roles: [UserRole.CareTaker] },
      },
    ],
  },
  
  {
    path: '/nurse',
    component: () => import('layouts/NurseLayout.vue'),
    children: [
      {
        path: 'newsNurses',
        component: () => import('pages/NursePages/NurseNewsPage.vue'),
        meta: { roles: [UserRole.Nurse] },
      }, 
      {
        path: 'profile',
        component: () => import('pages/NurseProfilePage.vue'),
        meta: { roles: [UserRole.Nurse] },
      },
      {
        path: 'wallNurses',
        component: () => import('pages/NursePages/NurseWallPage.vue'),
        meta: { roles: [UserRole.Nurse] },
      },
      {
        path: 'activityNurses',
        component: () => import('pages/NursePages/NurseActivityPage.vue'),
        meta: { roles: [UserRole.Nurse] },
      },{
        path: 'eldersNurses',
        component: () => import('pages/NursePages/NurseEldersPage.vue'),
        meta: { roles: [UserRole.Nurse] },
      },
      {
        path: 'visitsNurses',
        component: () => import('pages/NursePages/NurseVisitsPage.vue'),
        meta: { roles: [UserRole.Nurse] },
      },
    ],
    meta: { roles: [UserRole.Nurse] }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
