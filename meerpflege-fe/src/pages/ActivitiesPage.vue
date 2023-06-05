<template>
  <q-page class="q-ma-lg">
    <div class="page-title-container">
      <h4>Activities</h4>
      <div
        style="cursor: pointer; display: inline; margin-left: 20px"
        @click="showCreateModal"
      >
        <q-badge
          :style="{
            backgroundColor: '#027c80',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
          }"
          class="q-mr-sm"
        >
          <q-icon name="add" color="white" size="18px"></q-icon>
        </q-badge>
      </div>
    </div>
    <div v-if="isPageLoading" style="align-items: center" class="dashboard-bubble-container">
        
          <q-skeleton class="q-card q-card--bordered q-card--flat no-shadow my-card" height="380px" width="230px"></q-skeleton>
          <br />
          <q-skeleton class="q-card q-card--bordered q-card--flat no-shadow my-card" height="380px" width="230px"></q-skeleton>
          <br />
          <q-skeleton class="q-card q-card--bordered q-card--flat no-shadow my-card" height="380px" width="230px"></q-skeleton>
    </div>
    <div
      v-if="!isPageLoading"
      class="dashboard-bubble-container"
      style="align-items: center"
    >
      <div v-for="activity in activities" :key="activity.id">
        <q-card
          class="my-card"
          style="min-width: 250px; min-height: 380px"
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
            <q-btn
              flat
              round
              @click="deleteActivity(activity.id)"
              color="red"
              icon="delete"
            />
          </q-card-section>

          <q-list style="position: absolute; bottom: 10px">
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="groups" />
              </q-item-section>

              <q-item-section>
                <q-item-label> Group</q-item-label>
                <q-item-label caption>
                  {{
                    groups.find((x) => x.id === activity.groupId)?.name
                  }}</q-item-label
                >
              </q-item-section>
            </q-item>

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

    <!-- modal create -->
    <q-dialog v-model="createModal">
      <q-card class="create-modal">
        <q-card-section>
          <div class="text-h6">Create activity</div>
        </q-card-section>

        <q-separator />

        <q-card-section
          style="max-height: 60vh; min-height: 60vh"
          class="scroll"
        >
          <div style="margin-bottom: 10px">
            <q-input
              dense
              color="orange-5"
              rounded
              outlined
              v-model="emptyActivity.title"
              label="Title"
            />
          </div>
          <div style="margin-bottom: 10px">
            <q-input
              dense
              color="orange-5"
              rounded
              outlined
              v-model="emptyActivity.description"
              label="Description"
            />
          </div>

          <div style="margin-bottom: 10px">
            <q-input
              dense
              color="orange-5"
              rounded
              outlined
              v-model="emptyActivity.specialCondition"
              label="Special Condition"
            />
          </div>

          <div style="margin-bottom: 10px">
            <q-input
              dense
              color="orange-5"
              rounded
              outlined
              v-model="emptyActivity.location"
              label="Location"
            />
          </div>

          <q-input label="Time to start " dense readonly filled v-model="dateStringStart">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    color="generic-color"
                    v-model="startDate"
                    mask="YYYY-MM-DD"
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        color="generic-color"
                        v-close-popup
                        label="Close"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time
                    color="generic-color"
                    v-model="startTime"
                    mask="HH:mm"
                    format24h
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        color="generic-color"
                        label="Close"
                        flat
                      />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <div style="display: flex; flex-direction: row; flex-wrap: wrap">
            <div v-for="group in groups" :key="group.id">
              <q-radio
                class="custom-checkbox"
                v-model="switchGroup"
                :label="group.name"
                :val="group.id"
                color="cyan"
                checked-icon="task_alt"
                unchecked-icon="highlight_off"
              />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" @click="createActivity" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { Activity } from 'src/models/Activity';
import { Group } from 'src/models/Group';
import { useActivityStore } from 'src/stores/activity-store';
import { useAccountStore } from 'src/stores/global';
import { onMounted, ref, computed } from 'vue';

var store = useAccountStore();
var activityStore = useActivityStore();
const groups = ref([] as Group[]);
const switchGroup = ref('0');
const activities = ref([] as Activity[]);
const createModal = ref(false);
const isPageLoading = ref(false);

onMounted(async () => {
  isPageLoading.value = true;
  activities.value = await activityStore.getActivities();
  groups.value = await store.getGroups();
  isPageLoading.value = false;
});

const emptyActivity = ref({} as Activity);

const showCreateModal = () => {
  createModal.value = true;
};
const createActivity = () => {
  emptyActivity.value.groupId = parseInt(switchGroup.value);

  emptyActivity.value.stringDate = dateStringStart.value;

  activityStore.createActivities(emptyActivity.value).then(() => {
    location.reload();
  });
};

const deleteActivity = (id: number) => {
  activityStore.deleteActivities(id).then(() => {
    location.reload();
  });
};

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
