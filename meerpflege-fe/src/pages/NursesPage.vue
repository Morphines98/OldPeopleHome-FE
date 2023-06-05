<template>
  <q-page class="q-ma-lg">
    <div class="page-title-container">
      <h4>Nurses</h4>
      <div style="cursor: pointer; display: inline; margin-left: 20px" @click="showCreateModal">
        <q-badge :style="{
          backgroundColor: '#027c80',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
        }" class="q-mr-sm">
          <q-icon name="add" color="white" size="18px"></q-icon>
        </q-badge>
      </div>
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
    <div v-if="!isPageLoading" >
      <q-item style="display: flex; align-items: center" v-for="nurse in nurses" :key="nurse.id" clickable
        @click="showEditModal(nurse.id)">

        <q-avatar size="100px">
          <img :src="nurse.nurseAvatarUrl ?? 'https://cdn.quasar.dev/img/avatar.png'" />
        </q-avatar>
        <q-item-section style="padding: 5%">
          <q-item-label class="item-title text-h6">
            {{ nurse.name + ' ' + nurse.lastName }}
          </q-item-label>
          <q-item-label caption class="q-pt-none">{{
            nurse.description
          }}</q-item-label>
        </q-item-section>

        <q-item-section side class="flex items-center">
          <q-icon name="delete" :style="{ color: '#E7886B' }" @click.stop="deleteNurse(nurse.id)"
            class="q-ma-sm"></q-icon>
        </q-item-section>
        <q-item-section style="max-width: 50px;">
          <q-circular-progress reverse :value="getYearsDiff(nurse.startWorkingDate, date)" :max="15" size="45px"
            :thickness="1" color="generic-color" track-color="grey-5" class="q-ma-md" />
          <q-tooltip anchor="top middle" self="center middle">
            Working here for {{ calculateTime(nurse.startWorkingDate) }}
          </q-tooltip>
        </q-item-section>
      </q-item>
    </div>

    <q-dialog v-model="createModal">
      <q-card class="create-modal">
        <q-card-section>
          <div class="text-h6">Create nurse</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 60vh; min-height: 60vh" class="scroll">
          <div style="display: flex; justify-content: center; margin-bottom: 15px;">
            <q-uploader ref="uploader" label="Upload profile picture" auto-upload accept=".jpg, image/*"
              :factory="uploadFactory" @uploaded="onUploaded" />
          </div>

          <div style="margin-bottom: 10px">
            <q-input dense color="orange-5" rounded outlined v-model="emptyNurse.name" label="Name" />
          </div>
          <div style="margin-bottom: 10px">
            <q-input dense color="orange-5" rounded outlined v-model="emptyNurse.lastName" label="Last Name" />
          </div>
          <div style="margin-bottom: 10px">
            <q-input dense color="orange-5" rounded outlined v-model="emptyNurse.email" type="email" label="Email" :rules="[
              (val) => !!val || 'Required field',
              (val) => isValid(val) || 'Invalid email',
            ]" />
            <div style="margin-bottom: 10px">
              <q-input dense color="orange-5" rounded outlined v-model="emptyNurse.phoneNumber" label="Phone Number" />
            </div>
          </div>
          <div style="display: flex; flex-direction: row; flex-wrap: wrap">
            <div v-for="group in groups" :key="group.id">
              <q-radio class="custom-checkbox" v-model="switchGroup" :label="group.name" :val="group.id" color="cyan"
                checked-icon="task_alt" unchecked-icon="highlight_off" />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" @click="createNurse" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- edit modal -->

    <q-dialog v-model="editModal">
      <q-card class="create-modal">
        <q-card-section>
          <div class="text-h6">Edit nurse</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 60vh; min-height: 60vh" class="scroll">
          <div style="margin-bottom: 10px">
            <q-input dense color="orange-5" rounded outlined v-model="emptyNurse.name" label="Name" />
          </div>
          <div style="margin-bottom: 10px">
            <q-input dense color="orange-5" rounded outlined v-model="emptyNurse.lastName" label="Last Name" />
          </div>
          <div style="margin-bottom: 10px">
            <q-input dense color="orange-5" rounded outlined v-model="emptyNurse.email" type="email" label="Email" :rules="[
              (val) => !!val || 'Required field',
              (val) => isValid(val) || 'Invalid email',
            ]" />
            <div style="margin-bottom: 10px">
              <q-input dense color="orange-5" rounded outlined v-model="emptyNurse.phoneNumber" label="Phone Number" />
            </div>
          </div>
          <div style="display: flex; flex-direction: row; flex-wrap: wrap">
            <div v-for="group in groups" :key="group.id">
              <q-radio class="custom-checkbox" v-model="switchGroup" :label="group.name" :val="group.id" color="cyan"
                checked-icon="task_alt" unchecked-icon="highlight_off" />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" @click="editNurse" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup lang="ts">
import { datetime } from '@intlify/core-base';
import axios from 'src/boot/axios';
import { Group } from 'src/models/Group';
import { Nurse } from 'src/models/Nurse';
import { useAccountStore } from 'src/stores/global';
import { useNurseStore } from 'src/stores/nurse-store';
import { onMounted, ref } from 'vue';

var store = useNurseStore();
var acountStore = useAccountStore();
const nurses = ref([] as Nurse[]);
const createModal = ref(false);
const editModal = ref(false);
const isPageLoading = ref(false);

const groups = ref([] as Group[]);
const switchGroup = ref('0');
const date = new Date();
onMounted(async () => {
  isPageLoading.value = true;
  nurses.value = await store.getNurses();
  groups.value = await acountStore.getGroups();
  isPageLoading.value = false;
});

const emptyNurse = ref({} as Nurse);

const showCreateModal = () => {
  createModal.value = true;
};

const showEditModal = (id: number) => {
  emptyNurse.value.id = id;
  let nurseToUpdate = nurses.value.find(x => x.id === id);
  if (nurseToUpdate) {

    if (nurseToUpdate.name)
      emptyNurse.value.name = nurseToUpdate.name;
    if (nurseToUpdate.lastName)
      emptyNurse.value.lastName = nurseToUpdate.lastName;
    if (nurseToUpdate.email)
      emptyNurse.value.email = nurseToUpdate.email;
    if (nurseToUpdate.phoneNumber)
      emptyNurse.value.phoneNumber = nurseToUpdate.phoneNumber;

    switchGroup.value = nurseToUpdate.groupId;
  }
  editModal.value = true;
  editModal.value = true;
};

const uploadFactory = (files) => {
  const formData = new FormData();
  formData.append('file', files[0]);

  return new Promise((resolve, reject) => {
    const token = acountStore.jwtToken;
    resolve({
      url: 'http://localhost:5000/api/utility',
      method: 'POST',
      headers: [
        { name: 'Authorization', value: `Bearer ${token}` }
      ]
    })
  })
}

const onUploaded = ({ files }) => {
  const file = files[0];
  const serverResponse = JSON.parse(file.xhr.responseText);

  emptyNurse.value.nurseAvatarUrl = serverResponse.url;
}

const createNurse = () => {
  emptyNurse.value.groupId = parseInt(switchGroup.value);
  store.createNurse(emptyNurse.value).then(() => {
    location.reload();
  });
};

const deleteNurse = (id: number) => {
  store.deleteNurse(id).then(() => {
    location.reload();
  });
};

const editNurse = () => {
  emptyNurse.value.groupId = parseInt(switchGroup.value);
  store.editNurse(emptyNurse.value).then(() => {
    location.reload();
  });
}

const isValid = (val: string) => {
  const pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(val).toLowerCase());
};

const calculateTime = (startDate: Date) => {

  const targetDate = new Date(startDate);
  const currentDate = new Date();

  const timeDiff = Math.abs(currentDate.getTime() - targetDate.getTime());

  // Calculate the number of years
  const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
  const yearsInMilliseconds = years * (1000 * 60 * 60 * 24 * 365);

  // Calculate the number of months
  const months = Math.floor((timeDiff - yearsInMilliseconds) / (1000 * 60 * 60 * 24 * 30.4375));
  const monthsInMilliseconds = months * (1000 * 60 * 60 * 24 * 30.4375);

  // Calculate the number of days
  const days = Math.floor((timeDiff - yearsInMilliseconds - monthsInMilliseconds) / (1000 * 60 * 60 * 24));

  // Generate the formatted string
  const formattedTimePassed = `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}, and ${days} day${days !== 1 ? 's' : ''}`;

  return formattedTimePassed;
}
const getYearsDiff = (startDate: Date, endDate: Date) => {
  // Calculate the time difference in milliseconds
  const timeDiff = endDate.getTime() - new Date(startDate.toString()).getTime();

  // Convert milliseconds to days
  const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
  return daysPassed;
};
</script>
