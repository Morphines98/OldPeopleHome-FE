<template>
  <q-layout view="hHr lpR fFf">

    <q-header elevated class="bg-white text-home-green-color">
      <q-toolbar>
        <q-toolbar-title>
          <RouterLink to="../NurseDashboard" active-class="active-link" style="text-decoration: none;">
            <q-avatar>
              <img src="~/src/assets/logo.png">
            </q-avatar>
            Old People's Home
          </RouterLink>
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" behavior="mobile" elevated>
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>

          <RouterLink to="../NurseDashboard" active-class="active-link" style="text-decoration: none;color: black;">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="generic-color" name="dashboard" />
            </q-item-section>

            <q-item-section>
              Dashboard
            </q-item-section>
          </q-item>
        </RouterLink>

        <RouterLink to="/nurse/newsNurses" active-class="active-link" style="text-decoration: none;color: black;">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="generic-color" name="newspaper" />
            </q-item-section>

            <q-item-section>
              News
            </q-item-section>
          </q-item>
        </RouterLink>

        <RouterLink to="/nurse/activityNurses" active-class="active-link" style="text-decoration: none;color: black;">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="generic-color" name="celebration" />
            </q-item-section>

            <q-item-section>
              Activities
            </q-item-section>
          </q-item>
        </RouterLink>

        <RouterLink to="/nurse/wallNurses" active-class="active-link" style="text-decoration: none;color: black;">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="generic-color" name="wallpaper" />
            </q-item-section>

            <q-item-section>
              Wall
            </q-item-section>
          </q-item>
          </RouterLink>

          <RouterLink to="/nurse/visitsNurses" active-class="active-link" style="text-decoration: none;color: black;">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="generic-color" name="calendar_month" />
            </q-item-section>

            <q-item-section>
              Visits
            </q-item-section>
          </q-item>
          </RouterLink>

        <RouterLink to="/nurse/eldersNurses" active-class="active-link" style="text-decoration: none;color: black;">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="generic-color" name="elderly_woman" />
            </q-item-section>

            <q-item-section>
              Elders
            </q-item-section>
          </q-item>
        </RouterLink>

        <RouterLink to="/nurse/profile" active-class="active-link" style="text-decoration: none;color: black;">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="generic-color" name="account_circle" />
            </q-item-section>

            <q-item-section>
              My Profile
            </q-item-section>
          </q-item>
        </RouterLink>

          <q-item clickable v-ripple style="margin-top: 15px" @click="logout">
            <q-item-section avatar>
              <q-icon color="red" name="logout" />
            </q-item-section>

            <q-item-section>
              Logout
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img  :src="(auth.user?.profilePictureUrl !='' && auth.user?.profilePictureUrl != 'undefine')?auth.user?.profilePictureUrl:'https://cdn.quasar.dev/img/boy-avatar.png'">
          </q-avatar>
          <div class="text-weight-bold">{{ auth.user?.name ?? '' }}</div>
          <div>{{ auth.user?.email }} - {{ auth.user?.role }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container style="background-color: #F8F7F2;">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { useAccountStore } from 'src/stores/global';
import { ref } from 'vue'

const auth = useAccountStore();

const logout = () => {
  auth.logOut();
}

const rightDrawerOpen = ref(false);

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}
</script>
