<template>
  <q-page class="q-ma-lg">

    <div class="page-title-container">
      <span class="page-title">Dashboard</span>
    </div>
    <div class="dashboard-bubble-container">
      <RouterLink to="/application/news" style="text-decoration: none;">
        <div class="dashboard-bubble" style="background-color: #E7886B">
          <span>News</span>
        </div>
      </RouterLink>
      <RouterLink to="/application/groups" style="text-decoration: none;">
      <div class="dashboard-bubble">
        <span>Groups</span>
      </div>
    </RouterLink>
      <div class="dashboard-bubble" style="background-color: #007C80;">
        <span>News</span>
      </div>

      <div class="dashboard-bubble" style="background-color: #1365C4;">
        <span>News</span>
      </div>
      <div class="dashboard-bubble" style="background-color: #BAE3E3;">
        <span>News</span>
      </div>
      <div class="dashboard-bubble" style="background-color: #82C387;">
        <span>News</span>
      </div>
      <div class="dashboard-bubble" style="background-color: #5FADE7;">
        <span>News</span>
      </div>
      <div class="dashboard-bubble" style="background-color: #A556AF;">
        <span>News</span>
      </div>
      <div class="dashboard-bubble" style="background-color: #A556AF;">
        <span>News</span>
      </div>
    </div>

  </q-page>
</template>

<script setup lang="ts">

import { ref } from 'vue';



</script>
