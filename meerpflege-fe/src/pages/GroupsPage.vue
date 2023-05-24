<template>
  <q-page class="q-ma-lg">
    <div class="page-title-container">
      <h4>Groups</h4>
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
<div class="dashboard-bubble-container" >
  <div class="dashboard-bubble" :style="{ backgroundColor: generatorColors()  }" v-for="group in groups"
      :key="group.id"
      clickable
      v-ripple
      @click="showEditModal(group.id)">
        <span>{{ group.name }}</span>
      </div>
    </div>

    <q-dialog v-model="createModal">
      <q-card class="create-modal">
        <q-card-section>
          <div class="text-h6">Create Groups</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll">
          <div style="margin-bottom: 10px">
            <q-input color="orange-5" rounded outlined v-model="emptyGroupItem.name" label="Name" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" @click="createGroup" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- edit dialog -->

    <q-dialog v-model="editModal">
      <q-card class="create-modal">
        <q-card-section>
          <div style="display: flex; justify-content: space-between;">
          <div class="text-h6">Edit Group</div>
          <q-btn flat round @click="deleteGroup" color="red" icon="delete" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll">
          <div style="margin-bottom: 10px">
            <q-input color="orange-5" rounded outlined v-model="editGroupItem.name" label="Name" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" @click="editGroup()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { Group } from 'src/models/Group';
import { useAccountStore } from 'src/stores/global';
import { onMounted, ref } from 'vue';

var store = useAccountStore();
const groups = ref([] as Group[]);
const createModal = ref(false);
const editModal = ref(false);
const editGroupItem = ref({
  id: 0,
  name: '',
} as Group);
const emptyGroupItem = ref({
  id: 0,
  name: '',
} as Group);


onMounted(async () => {
  groups.value = await store.getGroups();
});

const createGroup = () => {
  store.createGroup(emptyGroupItem.value).then(() => {
    location.reload();
  });
};

const deleteGroup = () =>{
  store.deleteGroup(editGroupItem.value.id).then(() => {
    location.reload();
  });
}

const editGroup = () => {
  store.editGroup(editGroupItem.value).then(() => {
    location.reload();
  });

}

const showCreateModal = () => {
  createModal.value = true;
};

const showEditModal = (id: number) => {
  editGroupItem.value.id = id;
  let group = groups.value.find(item => item.id === id);
  if (group && group.name)
    editGroupItem.value.name = group.name;

  editModal.value = true;
};

const generatorColors =()=> {
  const base = 256;
    const bias = 100;  
    let r = Math.floor((Math.random() * (base - bias)) + bias);
    let g = Math.floor((Math.random() * (base - bias)) + bias);
    let b = Math.floor((Math.random() * (base - bias)) + bias);

    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }
</script>
