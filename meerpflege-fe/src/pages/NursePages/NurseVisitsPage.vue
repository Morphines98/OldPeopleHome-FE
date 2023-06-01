<template>
    <q-page class="q-ma-lg">
      <div class="page-title-container">
        <h4>Visit schedule</h4>
  
      </div>
  
      <div v-for="day in workingTimeForDay" :key="day.dayId.toString()" style="display: flex; justify-content: center;">
        <div class="time-section" v-if="day.workingIntervals">
          <div style="margin-right: 10px; min-width: 90px">{{ getDayByDyId(day.dayId.toString())?.fullName }}</div>
          <div>
            <div class="day-time-settings-flex">
  
              <div class="day-time-settings-interval" v-for="(interval, index) in day.workingIntervals" :key="index">
                <div>
                  <div > {{ interval.startHours }}</div>
                </div>
                <div class="spacer">
                  to
                </div>
                <div>
                    <div> {{ interval.endHours }}</div>
                </div>
              </div>
  
            </div>
  
          </div>
        </div>
      </div>
    </q-page>
  </template>
  
  
  <script setup lang="ts">
  import { DayOfWeek, WorkingTimeForDay } from 'src/models/Visits';
  import { useVisitsStore } from 'src/stores/visits-store';
  import {  onMounted, ref } from 'vue';
  
  var visitsStore = useVisitsStore();
  
  const dayIds = ref([] as string[]);
  const oldDayIds = ref([] as string[]);
  
  const allDays = ref([] as DayOfWeek[]);
  allDays.value.push({ dayId: 'mon', displayName: 'M', fullName: 'Monday' } as unknown as DayOfWeek);
  allDays.value.push({ dayId: 'tue', displayName: 'T', fullName: 'Tuesday' } as unknown as DayOfWeek);
  allDays.value.push({ dayId: 'wed', displayName: 'W', fullName: 'Wednesday' } as unknown as DayOfWeek);
  allDays.value.push({ dayId: 'thu', displayName: 'T', fullName: 'Thursday' } as unknown as DayOfWeek);
  allDays.value.push({ dayId: 'fri', displayName: 'F', fullName: 'Friday' } as unknown as DayOfWeek);
  allDays.value.push({ dayId: 'sat', displayName: 'S', fullName: 'Saturday' } as unknown as DayOfWeek);
  allDays.value.push({ dayId: 'sun', displayName: 'S', fullName: 'Sunday' } as unknown as DayOfWeek);
  
  oldDayIds.value = dayIds.value;
  
  const workingTimeForDay = ref([] as WorkingTimeForDay[]);
  
  onMounted(async () => {
  
    let result = await visitsStore.getVisits();
    result.forEach(visits => {
      workingTimeForDay.value.push(visits);
      dayIds.value.push(visits.dayId);
    });
  
  });
  
  function getDayByDyId(dayId: string) {
    return allDays.value.find(i => i.dayId.toString() === dayId)
  }
  
  
  </script>
  