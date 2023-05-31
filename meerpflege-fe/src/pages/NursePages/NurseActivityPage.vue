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

    <!-- modal de prezenta -->

    <q-dialog v-model="editModal">
      <q-card class="create-modal">
        <q-card-section>
          <div class="text-overline">Presence on activity</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ activityTitle }}</div>
        </q-card-section>
        <q-card-section
          style="max-height: 60vh; min-height: 60vh"
          class="scroll"
        >
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              flex-wrap: wrap;
              justify-content: space-around;
            "
          >
            <div
              v-for="activityP in activityPresence"
              :key="activityP.id"
              style="display: flex; align-items: center"
              class="q-pa-md"
            >
              <label>{{ activityP.elderName }}</label>
              <q-checkbox color="green" v-model="activityP.isPresent" />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn
            flat
            label="Accept"
            color="primary"
            @click="sendPresenceActivity"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { Activity } from 'src/models/Activity';
import { ActivityPresence } from 'src/models/ActivityPresence';
import { useNurseActivitiesStore } from 'src/stores/nurse-stores/nurse-activities-store';
import { onMounted, ref } from 'vue';

var activityStore = useNurseActivitiesStore();


const activities = ref([] as Activity[]);
const activityPresence = ref([] as ActivityPresence[]);
const editModal = ref(false);
const isPageLoading = ref(false);
var activityTitle = ref('');

const showPresenceModal = async (id: number, activityName: string) => {
  activityTitle.value = activityName;
  activityPresence.value = await activityStore.getNursePresence(id);
  editModal.value = true;
};
const sendPresenceActivity = () => {
  activityStore.createNursePresence(activityPresence.value).then(() => {
    location.reload();
  });
};
onMounted(async () => {
  isPageLoading.value = true;
  activities.value = await activityStore.getNurseActivities();
  isPageLoading.value = false;
});
</script>
