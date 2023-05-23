<template>
  <q-page class="q-ma-lg">
    <div class="page-title-container">
      <h4>Groups</h4>
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
    <!-- <q-item
      v-for="group in groups"
      :key="group.id"
      clickable
      v-ripple
      @click="showEditModal(group.id)"
    >
      <q-item-section avatar>
        <q-avatar color="primary" text-color="white">
          {{ group.name.charAt(0) }}
        </q-avatar>
      </q-item-section>

      <q-item-section>{{ group.name }}</q-item-section>
    </q-item> -->
<div class="dashboard-bubble-container" >
  <div class="dashboard-bubble" style="background-color: #007C80;" v-for="group in groups"
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
            <q-input
              color="orange-5"
              rounded
              outlined
              v-model="emptyGroupItem.name"
              label="Name"
            />
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
          <div class="text-h6">Edit Group</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll">
          <div style="margin-bottom: 10px">
            <q-input
              color="orange-5"
              rounded
              outlined
              v-model="editGroupItem.name"
              label="Name"
            />
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
const groups: Group[] = ref([]);
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

const editGroup = () =>{
  store.editGroup(editGroupItem.value).then(()=>{
    location.reload();
  });

}
const showCreateModal = () => {
  createModal.value = true;
};

const showEditModal = (id: number) => {
  editGroupItem.value.id = id;
  editModal.value = true;
};
</script>
