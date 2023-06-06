<template>
    <q-page class="q-ma-lg">
      <div class="page-title-container">
        <h4>Activities</h4>
      </div>
      <div v-if="isPageLoading" style="align-items: center" class="dashboard-bubble-container">
          
          <q-skeleton class="q-card q-card--bordered q-card--flat no-shadow my-card" height="380px" width="230px"></q-skeleton>
          <br />
          <q-skeleton class="q-card q-card--bordered q-card--flat no-shadow my-card" height="380px" width="230px"></q-skeleton>
          <br />
          <q-skeleton class="q-card q-card--bordered q-card--flat no-shadow my-card" height="380px" width="230px"></q-skeleton>
    </div>
      <div v-if="!isPageLoading" class="dashboard-bubble-container" style="align-items: center">
        <div
          v-for="activity in activities"
          :key="activity.id"
          @click="showPresenceModal(activity.id, activity.title)"
        >
          <q-card
            class="my-card"
            style="min-width: 250px; min-height: 300px"
            flat
            bordered
          >
            <q-card-section
              class="q-pt-xs"
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <div>
                <div class="text-overline">{{ activity.location }}</div>
                <div class="text-h5 q-mt-sm q-mb-xs">{{ activity.title }}</div>
                <div class="text-caption text-grey">
                  {{ activity.description }}
                </div>
              </div>
            </q-card-section>
  
            <q-list style="position: absolute; bottom: 10px">
              <q-item>
                <q-item-section avatar>
                  <q-icon color="red" name="schedule" />
                </q-item-section>
  
                <q-item-section>
                  <q-item-label> Time</q-item-label>
                  <q-item-label caption>{{
                    new Date(activity.date).toLocaleString('en-GB', {
                      timeZone: 'UTC',
                    })
                  }}</q-item-label>
                </q-item-section>
              </q-item>
  
              <q-item>
                <q-item-section avatar>
                  <q-icon color="amber" name="info" />
                </q-item-section>
  
                <q-item-section>
                  <q-item-label> Special Conditions</q-item-label>
                  <q-item-label caption>{{
                    activity.specialCondition
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </div>
    </q-page>
  </template>
  
  <script setup lang="ts">
  import { Activity } from 'src/models/Activity';
  import { ActivityPresence } from 'src/models/ActivityPresence';
import { useCarerActivitiesStore } from 'src/stores/carer-stores/carer-activities-store';
  import { onMounted, ref } from 'vue';
  
  var activityStore = useCarerActivitiesStore();
  
  
  const activities = ref([] as Activity[]);
  const activityPresence = ref([] as ActivityPresence[]);
  const editModal = ref(false);
  const isPageLoading = ref(false);
  var activityTitle = ref('');
  
  const showPresenceModal = async (id: number, activityName: string) => {
    activityTitle.value = activityName;
    editModal.value = true;
  };
 
  onMounted(async () => {
    isPageLoading.value = true;
    activities.value = await activityStore.getCarerActivities();
    isPageLoading.value = false;
  });
  </script>
  