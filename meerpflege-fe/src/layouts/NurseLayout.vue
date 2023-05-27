<template>
  <q-layout view="hHr lpR fFf">

    <q-header elevated class="bg-white text-home-green-color">
      <q-toolbar>
        <q-toolbar-title>
          <RouterLink to="/dashboard" active-class="active-link" style="text-decoration: none;">
          <q-avatar>
            <img src="~/src/assets/logo.png">
          </q-avatar>
          Old People's Home - nurse layout
          </RouterLink>
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" behavior="mobile" elevated>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container style="background-color: #F8F7F2;">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'


const rightDrawerOpen = ref(false);

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}
</script>
