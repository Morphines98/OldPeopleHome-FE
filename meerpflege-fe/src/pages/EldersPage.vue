<template>
  <q-page class="q-ma-lg">
    <div class="page-title-container">
      <h4>Elders</h4>
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
    <div v-if="isPageLoading" class="q-pa-md">
      <q-item style="max-width: 100%">
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
        clickable
        @click="showEditModal(elder.id)"
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
          <q-item-label caption class="q-pt-none">{{
            'Carer:' + createCarerName(elder.carerId)
          }}</q-item-label>
          <q-item-label caption class="q-pt-none">{{
            'Group: ' + groups.find((g) => g.id == elder.groupId)?.name
          }}</q-item-label>
        </q-item-section>

        <q-item-section side class="flex items-center">
          <q-icon
            name="delete"
            :style="{ color: '#E7886B' }"
            @click.stop="deleteElder(elder.id)"
            class="q-ma-sm"
          ></q-icon>
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
    <q-dialog v-model="createModal">
      <q-card class="create-modal">
        <q-card-section>
          <div class="text-h6">Create carer</div>
        </q-card-section>

        <q-separator />

        <q-card-section
          style="max-height: 60vh; min-height: 60vh"
          class="scroll"
        >
          <div
            style="display: flex; justify-content: center; margin-bottom: 15px"
          >
            <q-uploader
              ref="uploader"
              label="Upload profile picture"
              auto-upload
              accept=".jpg, image/*"
              :factory="uploadFactory"
              @uploaded="onUploaded"
            />
          </div>
          <div style="margin-bottom: 10px">
            <q-input
              dense
              color="orange-5"
              rounded
              outlined
              v-model="empthyElder.name"
              label="Name"
            />
          </div>
          <div style="margin-bottom: 10px">
            <q-input
              dense
              color="orange-5"
              rounded
              outlined
              v-model="empthyElder.lastName"
              label="Last Name"
            />
          </div>
          <div style="margin-bottom: 10px">
            <q-input
              dense
              color="orange-5"
              rounded
              outlined
              v-model="empthyElder.hobies"
              label="Hobies"
            />
          </div>
          <div style="margin-bottom: 10px">
            <q-input
              dense
              color="orange-5"
              rounded
              outlined
              v-model="empthyElder.medicalConditions"
              label="Medical Condition"
            />
          </div>
          <q-input dense readonly filled v-model="dateStringStart">
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
          <div class="text-h6">Group</div>
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
          <q-select
            aria-required="true"
            rounded
            outlined
            v-model="selectedCarer"
            :options="carers"
            :option-label="(option) => `${option.name} ${option.lastName}`"
            option-value="id"
            label="Carers"
          />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" @click="createElder" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- edit modal -->

    <q-dialog v-model="editModal">
      <q-card class="create-modal">
        <q-card-section>
          <div class="text-h6">Edit carer</div>
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
              v-model="empthyElder.name"
              label="Name"
            />
          </div>
          <div style="margin-bottom: 10px">
            <q-input
              dense
              color="orange-5"
              rounded
              outlined
              v-model="empthyElder.lastName"
              label="Last Name"
            />
          </div>
          <div style="margin-bottom: 10px">
            <q-input
              dense
              color="orange-5"
              rounded
              outlined
              v-model="empthyElder.hobies"
              label="Hobies"
            />
          </div>
          <div style="margin-bottom: 10px">
            <q-input
              dense
              color="orange-5"
              rounded
              outlined
              v-model="empthyElder.medicalConditions"
              label="Medical Condition"
            />
          </div>
          <div class="text-h6">Group</div>
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
          <q-select
            aria-required="true"
            rounded
            outlined
            v-model="selectedCarer"
            :options="carers"
            :option-label="(option) => `${option.name} ${option.lastName}`"
            option-value="id"
            label="Carers"
          />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" @click="editElder" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup lang="ts">
import { Carer } from 'src/models/Carer';
import { Elder } from 'src/models/Elder';
import { Group } from 'src/models/Group';
import { useCarersStore } from 'src/stores/carer-store';
import { useElderStore } from 'src/stores/elder-store';
import { useAccountStore } from 'src/stores/global';
import { onMounted, ref, computed } from 'vue';

var store = useElderStore();
var carerStore = useCarersStore();
var groupStore = useAccountStore();
const elders = ref([] as Elder[]);
const date = new Date();
const carers = ref([] as Carer[]);
const selectedCarer = ref({} as Carer);
const groups = ref([] as Group[]);
const switchGroup = ref('0');
const createModal = ref(false);
const editModal = ref(false);
const isPageLoading = ref(false);

onMounted(async () => {
  isPageLoading.value = true;
  elders.value = await store.getElders();
  carers.value = await carerStore.getCarers();
  groups.value = await groupStore.getGroups();
  isPageLoading.value = false;
});

const empthyElder = ref({} as Elder);
const createCarerName = (id: number) => {
  let lastName = carers.value.find((x) => x.id == id)?.lastName;
  let name = carers.value.find((x) => x.id == id)?.name;
  return name + ' ' + lastName;
};

const showCreateModal = () => {
  selectedCarer.value.lastName = 'Carer';
  selectedCarer.value.name = 'Select ';
  createModal.value = true;
};

const showEditModal = (id: number) => {
  empthyElder.value.id = id;
  let elderToUpdate = elders.value.find((x) => x.id === id);
  if (elderToUpdate) {
    if (elderToUpdate.name) empthyElder.value.name = elderToUpdate.name;
    if (elderToUpdate.lastName)
      empthyElder.value.lastName = elderToUpdate.lastName;
    if (elderToUpdate.hobies) empthyElder.value.hobies = elderToUpdate.hobies;
    if (elderToUpdate.medicalConditions)
      empthyElder.value.medicalConditions = elderToUpdate.medicalConditions;
    if (elderToUpdate.avatarUrl)
      empthyElder.value.avatarUrl = elderToUpdate.avatarUrl;
    if (elderToUpdate.carerId)
      empthyElder.value.carerId = elderToUpdate.carerId;
    if (elderToUpdate.groupId)
      empthyElder.value.groupId = elderToUpdate.groupId;
    switchGroup.value = elderToUpdate.groupId;
    selectedCarer.value = carers.value.find(
      (c) => c.id == elderToUpdate?.carerId
    );
  }
  editModal.value = true;
};

const createElder = () => {
  empthyElder.value.groupId = parseInt(switchGroup.value);
  empthyElder.value.carerId = selectedCarer.value.id;
  empthyElder.value.stringDate = dateStringStart.value;
  store.createElders(empthyElder.value).then(() => {
    location.reload();
  });
  console.log(empthyElder.value);
};

const deleteElder = (id: number) => {
  store.deleteElders(id).then(() => {
    location.reload();
  });
};

const editElder = () => {
  empthyElder.value.groupId = parseInt(switchGroup.value);
  empthyElder.value.carerId = selectedCarer.value.id;
  store.editElders(empthyElder.value).then(() => {
    location.reload();
  });
  console.log(empthyElder.value);
};

const uploadFactory = (files) => {
  const formData = new FormData();
  formData.append('file', files[0]);

  return new Promise((resolve, reject) => {
    const token = groupStore.jwtToken;
    resolve({
      url: 'http://localhost:5000/api/utility',
      method: 'POST',
      headers: [{ name: 'Authorization', value: `Bearer ${token}` }],
    });
  });
};

const onUploaded = ({ files }) => {
  const file = files[0];
  const serverResponse = JSON.parse(file.xhr.responseText);
  console.log(serverResponse);

  empthyElder.value.avatarUrl = serverResponse.url;
  console.log(empthyElder);
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
