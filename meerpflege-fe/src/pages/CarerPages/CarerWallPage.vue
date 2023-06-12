<template>
    <q-page class="q-ma-lg">
      <div class="page-title-container">
        <h4>Wall</h4>
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
 <div v-if="!isPageLoading" >
      <div 
        v-for="wallItem in wallItems"
        :key="wallItem.id"
        style="display: flex; align-items: center; justify-content: center"
      >
        <div style="width: 70% ;margin-bottom: 5rem;">
          <q-card>
            <q-carousel swipeable animated v-model="wallItem.slide" thumbnails infinite v-model:fullscreen="wallItem.fullScreen">
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
            :icon="wallItem.fullScreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="wallItem.fullScreen = !wallItem.fullScreen"
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
            </div>
          </q-card>
        </div>
      </div>
      </div>
    </q-page>
  </template>
  <script setup lang="ts">
  import { WallItem } from 'src/models/WallItem';
  import { onMounted, ref } from 'vue';
import { useCarerWallStore } from 'src/stores/carer-stores/carer-wall-store';

  var store = useCarerWallStore();
  const wallItems = ref([] as WallItem[]);
  const isPageLoading = ref(false);
  
  onMounted(async () => {
    isPageLoading.value = true;
    wallItems.value = await store.getCarerWall();
    wallItems.value.forEach((element) => {
      element.slide = element.wallItemAttachments?.[0].name;
      element.fullScreen = false;
    });
    isPageLoading.value = false;
  });
  </script>
  <style >
  .flex {
    height: auto;
  }
  </style>
  