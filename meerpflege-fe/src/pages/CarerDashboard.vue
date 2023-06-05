<template>
    <q-page class="q-ma-lg">
  
      <div class="page-title-container">
        <span class="page-title">Dashboard</span>
      </div>
      <div class="dashboard-bubble-container">
        <RouterLink to="/carer/news" style="text-decoration: none;">
          <div class="dashboard-bubble" style="background-color: #E7886B">
            <span>News</span>
          </div>
        </RouterLink>
        <RouterLink to="/carer/activity" style="text-decoration: none;">
        <div class="dashboard-bubble" style="background-color: #1365C4;">
          <span>Activities</span>
        </div>
        </RouterLink>
        <RouterLink to="/carer/wall" style="text-decoration: none;">
        <div class="dashboard-bubble" style="background-color: #5FADE7;">
          <span>Wall</span>
        </div>
      </RouterLink>
      <RouterLink to="/carer/visits" style="text-decoration: none;">
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
  
  
  </script>
  