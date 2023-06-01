<template>
  <q-page class="q-ma-lg">

    <div class="page-title-container">
      <span class="page-title">Dashboard</span>
    </div>
    <div class="dashboard-bubble-container">
      <RouterLink to="/nurse/newsNurses" style="text-decoration: none;">
        <div class="dashboard-bubble" style="background-color: #E7886B">
          <span>News</span>
        </div>
      </RouterLink>
      <RouterLink to="/nurse/activityNurses" style="text-decoration: none;">
      <div class="dashboard-bubble" style="background-color: #1365C4;">
        <span>Activities</span>
      </div>
      </RouterLink>
      <RouterLink to="/nurse/wallNurses" style="text-decoration: none;">
      <div class="dashboard-bubble" style="background-color: #5FADE7;">
        <span>Wall</span>
      </div>
    </RouterLink>
    <RouterLink to="/nurse/eldersNurses" style="text-decoration: none;">
      <div class="dashboard-bubble" style="background-color: #BAE3E3;">
        <span>Elders</span>
      </div>
    </RouterLink>
    <RouterLink to="/nurse/visitsNurses" style="text-decoration: none;">
      <div class="dashboard-bubble" style="background-color: #82C387;">
        <span>Visits</span>
      </div>
    </RouterLink>
    </div>

  </q-page>
</template>

<script setup lang="ts">

import { useAccountStore } from 'src/stores/global';
import { ref } from 'vue';

var store = useAccountStore();
console.log(store.user);

console.log(store.isAdmin);

</script>
