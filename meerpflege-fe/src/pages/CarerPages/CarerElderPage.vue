<template>
    <q-page class="q-ma-lg">
      <div class="page-title-container">
        <h4>Elders</h4>
      </div>
        <div v-if="isPageLoading" class="q-pa-md">
          <q-item  style="max-width: 100%">
            <q-item-section avatar>
              <q-skeleton type="QAvatar" />
            </q-item-section>
  
            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" width="65%" />
              </q-item-label>
            </q-item-section>
          </q-item>
  
          <q-item style="max-width: 100%">
            <q-item-section avatar>
              <q-skeleton type="QAvatar" />
            </q-item-section>
  
            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" width="90%" />
              </q-item-label>
            </q-item-section>
          </q-item>
  
          <q-item style="max-width: 100%">
            <q-item-section avatar>
              <q-skeleton type="QAvatar" />
            </q-item-section>
  
            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" width="35%" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      <div v-if="!isPageLoading">
        <q-item
          style="display: flex; align-items: center"
          v-for="elder in elders"
          :key="elder.id"
        >
          <q-avatar size="100px">
            <img
              :src="elder.avatarUrl ?? 'https://cdn.quasar.dev/img/avatar.png'"
            />
          </q-avatar>
          <q-item-section style="padding: 5%">
            <q-item-label class="item-title text-h6">
              {{ elder.name + ' ' + elder.lastName }}
            </q-item-label>
            <q-item-label caption class="q-pt-none">{{
              'Hobies: ' + elder.hobies
            }}</q-item-label>
            <q-item-label caption class="q-pt-none"
              >{{
                'Date Of Birth: ' +
                new Date(elder.dateOfBirth).toLocaleString('en-GB', {
                  timeZone: 'UTC',
                })
              }}
            </q-item-label>
            <q-item-label caption class="q-pt-none">{{
              'Health: ' + elder.medicalConditions
            }}</q-item-label>
          </q-item-section>
          <q-item-section style="max-width: 50px">
            <q-circular-progress
              reverse
              :value="getYearsDiff(elder.dateOfBirth, date)"
              :max="100"
              size="45px"
              :thickness="1"
              color="generic-color"
              track-color="grey-5"
              class="q-ma-md"
            />
            <q-tooltip anchor="top middle" self="center middle">
              Has {{ calculateTime(elder.dateOfBirth) }} old
            </q-tooltip>
          </q-item-section>
        </q-item>
      </div>
    </q-page>
  </template>
  <script setup lang="ts">
  import { Elder } from 'src/models/Elder';
import { useCarerEldersStore } from 'src/stores/carer-stores/carer-elders-store';
  import { onMounted, ref } from 'vue';
  
  var store = useCarerEldersStore();
  const elders = ref([] as Elder[]);
  const date = new Date();
  const isPageLoading = ref(false);
  
  onMounted(async () => {
    isPageLoading.value = true;
    elders.value = await store.getCarerElders();
    isPageLoading.value = false;
  });
  
  const calculateTime = (startDate: Date) => {
    const targetDate = new Date(startDate);
    const currentDate = new Date();
  
    const timeDiff = Math.abs(currentDate.getTime() - targetDate.getTime());
  
    const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
    const yearsInMilliseconds = years * (1000 * 60 * 60 * 24 * 365);
  
    const months = Math.floor(
      (timeDiff - yearsInMilliseconds) / (1000 * 60 * 60 * 24 * 30.4375)
    );
    const monthsInMilliseconds = months * (1000 * 60 * 60 * 24 * 30.4375);
  
    const days = Math.floor(
      (timeDiff - yearsInMilliseconds - monthsInMilliseconds) /
        (1000 * 60 * 60 * 24)
    );
  
    const formattedTimePassed = `${years} year${
      years !== 1 ? 's' : ''
    }, ${months} month${months !== 1 ? 's' : ''}, and ${days} day${
      days !== 1 ? 's' : ''
    }`;
  
    return formattedTimePassed;
  };
  const getYearsDiff = (startDate: Date, endDate: Date) => {
    const timeDiff = endDate.getTime() - new Date(startDate.toString()).getTime();
  
    const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
    return daysPassed;
  };
  </script>
  