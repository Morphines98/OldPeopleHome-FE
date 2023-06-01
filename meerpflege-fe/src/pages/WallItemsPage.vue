<template>
  <q-page class="q-ma-lg">
    <div class="page-title-container">
      <h4>Wall</h4>
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
    <div  v-if="isPageLoading" class="q-pa-md" style="display: flex; align-items: center; justify-content: center;">
    <div style="width: 80%">
      <q-skeleton height="400px" square animation="fade" />


        <div class="col q-pl-sm">
          <q-skeleton type="text" square width="30%" animation="fade" />
          <q-skeleton type="text" square height="20px" animation="fade" />
          <q-skeleton type="text" square height="20px" width="75%" animation="fade" />
      </div>
    </div>
  </div>
  <div v-if="!isPageLoading">
    <div
      v-for="wallItem in wallItems"
      :key="wallItem.id"
      style="display: flex; align-items: center; justify-content: center"
    >
      <div style="width: 70% ;margin-bottom: 5rem;">
        <q-card>
          <q-carousel swipeable animated v-model="wallItem.slide" thumbnails infinite v-model:fullscreen="fullscreen">
            <q-carousel-slide
              v-for="wallAtach in wallItem.wallItemAttachments"
              :key="wallAtach.id"
              :name="wallAtach.name"
              class="column no-wrap flex-center"
              :img-src="wallAtach.url"
              style="background-size: contain; background-repeat: no-repeat;"
            >
            </q-carousel-slide>
            <template v-slot:control>
            <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
        >
          <q-btn
            push round dense color="white" text-color="primary"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
      </template>
          </q-carousel>
          <div
            style="
              display: flex;
              flex-direction: column;
              padding: 0 10px;
            "
          >
            <div>
                
              <div class="text-h5">{{ wallItem.title }}</div>
              <div class="text-subtitle">{{ wallItem.description }}</div>
              <q-item-label style=" text-align: end;" caption class="q-pt-none">{{
                'Date: ' + new Date(wallItem.date).toLocaleString('en-GB')}}
            </q-item-label>
            </div>
            <q-btn push color="red" style="margin:1rem 0;" icon="delete" label="Delete Post" @click="deleteWallItem(wallItem.id)" />
          </div>
        </q-card>
      </div>
    </div></div>
    <q-dialog v-model="createModal">
      <q-card class="create-modal">
        <q-card-section>
          <div class="text-h6">Create post</div>
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
              color="orange-5"
              rounded
              outlined
              v-model="empthyWall.title"
              label="Titel"
            />
          </div>
          <div>
            <q-input
              color="orange-5"
              rounded
              outlined
              v-model="empthyWall.description"
              type="textarea"
              label="Content"
            />
          </div>
          <div style="display: flex; flex-direction: row; flex-wrap: wrap">
            <div>
              <q-radio
                class="custom-checkbox"
                v-model="switchGroup"
                label="All groups"
                val="0"
                color="cyan"
                checked-icon="task_alt"
                unchecked-icon="highlight_off"
              />
            </div>
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
          <q-btn flat label="Accept" color="primary" @click="createWall" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup lang="ts">
import { useAccountStore } from 'src/stores/global';
import { useWallStore } from 'src/stores/wall-store';
import { WallItem, WallItemAttachment } from 'src/models/WallItem';
import { onMounted, ref } from 'vue';
import { Group } from 'src/models/Group';

var store = useWallStore();
var acountStore = useAccountStore();
const wallItems = ref([] as WallItem[]);
const createModal = ref(false);
const editModal = ref(false);
const isPageLoading = ref(false);
const fullscreen = ref(false);

const groups = ref([] as Group[]);
const switchGroup = ref('0');

onMounted(async () => {
  isPageLoading.value = true;
  wallItems.value = await store.getWallItems();
  wallItems.value.forEach((element) => {
    element.slide = element.wallItemAttachments?.[0].name;
  });
  groups.value = await acountStore.getGroups();
  isPageLoading.value = false;
});

const empthyWall = ref({
  wallItemAttachments: [] as WallItemAttachment[],
} as WallItem);

const showCreateModal = () => {
  createModal.value = true;
};

const createWall = () => {
  if (switchGroup.value === '0') {
    empthyWall.value.forAllGroups = true;
    empthyWall.value.groupId = null;
  } else {
    empthyWall.value.groupId = parseInt(switchGroup.value);
    empthyWall.value.forAllGroups = false;
  }

  store.createWallItems(empthyWall.value).then(() => {
    location.reload();
  });
};
const deleteWallItem = (id: number) => {
  store.deleteWallItems(id).then(() => {
    location.reload();
  });
};

const uploadFactory = (files) => {
  const formData = new FormData();
  formData.append('file', files[0]);

  return new Promise((resolve, reject) => {
    const token = acountStore.jwtToken;
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
  let photo = ref({
    url: serverResponse.url,
    name: serverResponse.name,
  } as WallItemAttachment);
  empthyWall.value.wallItemAttachments?.push(photo.value);
  console.log(empthyWall);
};
</script>
<style >
.flex {
  height: auto;
}
</style>
