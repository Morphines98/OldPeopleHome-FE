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
    <div class="dashboard-bubble-container">
      <q-item>
        <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
            elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>2 min ago</q-item-label>

        </q-item-section>
      </q-item>
    </div>


    <q-dialog v-model="createModal">
      <q-card class="create-modal">
        <q-card-section>
          <div class="text-h6">Create news</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 60vh; min-height: 60vh" class="scroll">
          <div style="margin-bottom: 10px">
            <q-input color="orange-5" rounded outlined v-model="emptyNurse.name" label="Name" />
          </div>
          <div style="margin-bottom: 10px">
            <q-input color="orange-5" rounded outlined v-model="emptyNurse.lastName" label="Last Name" />
          </div>
          <div style="margin-bottom: 10px">
            <q-input color="orange-5" rounded outlined v-model="emptyNurse.email" type="email" label="Email"
              :rules="[val => !!val || 'Required field', val => isValid(val) || 'Invalid email']" />
          </div>
          <div>
            <q-input color="orange-5" rounded outlined v-model="emptyNurse.description" type="textarea" label="Description" />
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

  </q-page>
</template>
<script setup lang="ts">
import { Group } from 'src/models/Group';
import { Nurse } from 'src/models/Nurse'
import { useAccountStore } from 'src/stores/global';
import { onMounted, ref } from 'vue';

var store = useAccountStore();
const nurses = ref([] as Nurse[]);
const createModal = ref(false);
const editModal = ref(false);

const groups = ref([] as Group[]);
const switchGroup = ref('0');


const emptyNurse = ref({} as Nurse);

const showCreateModal = () => {
  createModal.value = true;
}

const createNurse = () => {
  emptyNurse.value.groupId = parseInt(switchGroup.value);

  console.log(emptyNurse.value);

}

const isValid = (val: string) => {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(val).toLowerCase());
}

onMounted(async () => {
  // nurses.value = await store.getNurses();
  groups.value = await store.getGroups();
});

</script>
