<template>
    <q-page class="q-ma-lg">
      <div class="page-title-container">
        <h4>Activities</h4>
      </div>
      <div class="dashboard-bubble-container" style="align-items: center;">
      <div v-for="activity in activities"
      :key="activity.id" >
        <q-card class="my-card" style="min-width: 250px;" flat bordered>
          <q-card-section class="q-pt-xs" style="display: flex;justify-content: space-between;align-items: center;">
              <div>
            <div class="text-overline">{{ activity.location }}</div>
            <div class="text-h5 q-mt-sm q-mb-xs">{{activity.title}}</div>
            <div class="text-caption text-grey">
              {{activity.description}}
            </div></div>
          </q-card-section>
  
          <q-list>
            <q-item >
              <q-item-section avatar>
                <q-icon color="primary" name="groups" />
              </q-item-section>
  
              <q-item-section>
                <q-item-label> Group</q-item-label>
                <q-item-label caption> {{ groups.find(x=> x.id === activity.groupId)?.name }}</q-item-label>
              </q-item-section>
            </q-item>
  
            <q-item >
              <q-item-section avatar>
                <q-icon color="red" name="schedule" />
              </q-item-section>
  
              <q-item-section>
                  <q-item-label> Time</q-item-label>
                <q-item-label caption>{{new Date(activity.date).toLocaleString('en-GB', { timeZone: 'UTC' })}}</q-item-label>
              </q-item-section>
            </q-item>
  
            <q-item >
              <q-item-section avatar>
                <q-icon color="amber" name="info" />
              </q-item-section>
  
              <q-item-section>
                  <q-item-label> Special Conditions</q-item-label>
                <q-item-label caption>{{ activity.specialCondition }}</q-item-label>
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
  import { Group } from 'src/models/Group';
import { useNurseActivitiesStore } from 'src/stores/nurse-stores/nurse-activities-store';
  import { onMounted, ref, computed } from 'vue';
  
  var activityStore = useNurseActivitiesStore();
  const groups = ref([] as Group[]);
  const switchGroup = ref('0');
  const activities = ref([] as Activity[]);
  const createModal = ref(false);
  const editModal = ref(false);
  
  onMounted(async () => {
    activities.value = await activityStore.getNurseActivities();
  });
  
  const emptyActivity = ref({} as Activity);
  let now = new Date();
  let year = now.getFullYear();
  let month = (now.getMonth() + 1).toString().padStart(2, '0');
  let day = now.getDate().toString().padStart(2, '0');
  let hourStart = '12';
  let minute = '00';
  let startDateModel = `${year}-${month}-${day}`;
  let startTimeModel = `${hourStart}:${minute}`;
  
  const startDate = ref(startDateModel);
  const startTime = ref(startTimeModel);
  
  const dateStringStart = computed(() =>
    startDate.value
      ? `${startDate.value.split('-').reverse().join('.')} ${startTime.value}`
      : 'No date selected'
  );
  </script>
  