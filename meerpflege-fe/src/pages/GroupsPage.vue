<template>
  <q-page class="q-ma-lg">
    <div class="page-title-container">
      <h4>Groups</h4>
      <div style="cursor: pointer; display:inline; margin-left:20px" @click="showCreateModal">
        <q-badge :style="{ backgroundColor: '#027c80', borderRadius: '50%', width: '30px', height: '30px' }"
          class="q-mr-sm">
          <q-icon name="add" color="white" size="18px"></q-icon>
        </q-badge>
      </div>
    </div>
    <q-dialog v-model="createModal">
      <q-card class="create-modal">
        <q-card-section>
          <div class="text-h6">Create news</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 60vh; min-height: 60vh;" class="scroll">

          <div style="margin-bottom:10px">
            <q-input color="orange-5" rounded outlined v-model="emptyGroupItem.name" label="Name" />
          </div>

        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" @click="createNews" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <span v-for="group in groups" :key="group.id"> {{ group.name }} </span>
  </q-page>
</template>

<script setup lang="ts">
import { Group } from 'src/models/Group';
import { useAccountStore } from 'src/stores/global';
import { onMounted, ref } from 'vue';

var store = useAccountStore();
const groups: Group[] = ref([]);
const createModal = ref(false);

const emptyGroupItem = ref({
  id: 0,
  name: '',
} as Group)

onMounted(async () => {
  groups.value = await store.getGroups();
});

const createNews = () => {
    
  store.createGroup(emptyGroupItem.value).then(() => {
    location.reload();
  })
}

const showCreateModal = () => {
  createModal.value = true;
}
</script>
