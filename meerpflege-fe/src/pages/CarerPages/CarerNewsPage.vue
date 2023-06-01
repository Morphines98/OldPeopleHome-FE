<template>
    <q-page class="q-ma-lg">
      <div class="page-title-container">
        <span class="page-title">News</span>
      </div>
      <div v-if="isPageLoading" class="q-ma-md custom-skeleton-events">
        <q-skeleton height="50px"></q-skeleton>
        <br />
        <q-skeleton height="50px"></q-skeleton>
        <br />
        <q-skeleton height="50px"></q-skeleton>
        <br />
        <q-skeleton height="50px"></q-skeleton>
        <br />
        <q-skeleton height="50px"></q-skeleton>
        <br />
        <q-skeleton height="50px"></q-skeleton>
        <br />
        <q-skeleton height="50px"></q-skeleton>
      </div>
      <div v-if="!isPageLoading" class="q-ma-md">
        <q-list>
          <q-item
            class="custom-padding"
            v-for="(item, index) in news"
            :key="item.id"
            :class="{ 'even-item-bg': index % 2 !== 0 }"
            style="
              align-items: center;
              align-content: flex-start;
              justify-content: center;
              flex-direction: row;
            "
          >
            <q-item-section>
              <q-item-label class="item-title">{{ item.title }}</q-item-label>
              <q-item-label caption>{{
                formatDate(item.addedDate)
              }}</q-item-label>
              <q-item-label>{{ item.content }}</q-item-label>
            </q-item-section>
            <q-item-section
              side
              class="flex items-center"
              style="flex-direction: row"
            >
              <q-icon
                name="remove_red_eye"
                color="light-blue-14"
                @click.stop="showViewModal(item.id)"
                class="q-ma-sm"
              ></q-icon>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <q-dialog v-model="viewModal">
        <q-card class="create-modal" style="width: -webkit-fill-available">
          <q-card-section>
            <div class="text-h6">{{ viewNews.title }}</div>
          </q-card-section>
          <q-item-label
            style="text-align: end; padding-right: 10px"
            caption
            class="q-pt-none"
            >{{ 'Date: ' + new Date(viewNews.addedDate).toLocaleString('en-GB') }}
          </q-item-label>
  
          <q-separator />
  
          <q-card-section style="max-height: 50vh" class="scroll">
            <p>{{ viewNews.content }}</p>
          </q-card-section>
  
          <q-separator />
  
          <div
            v-if="
              viewNews.newsItemAttachments?.length != undefined &&
              viewNews.newsItemAttachments?.length != 0
            "
          >
            <q-card-section style="max-height: 50vh" class="scroll">
              <div
                v-for="attach in viewNews.newsItemAttachments"
                :key="attach.id"
              >
                <a
                  :href="attach.url"
                  :download="attach.name"
                  style="text-decoration: none; color: black"
                  ><q-icon
                    color="generic-color"
                    style="font-size: 35px"
                    name="file_download"
                  />{{ attach.name }}</a
                >
              </div>
            </q-card-section>
          </div>
          <q-separator />
  
          <q-card-actions align="right">
            <q-btn flat label="Close" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  
  <script setup lang="ts">
  import { Group } from 'src/models/Group';
  import { NewsItem, NewsItemAttachment } from 'src/models/NewsItem';
import { useCarerNewsStore } from 'src/stores/carer-stores/carer-news-store';
  import { ref, onMounted } from 'vue';
  var store = useCarerNewsStore();
  
  const news = ref([] as NewsItem[]);
  const viewModal = ref(false);
  const isPageLoading = ref(false);
  const viewNews = ref({
    newsItemAttachments: [] as NewsItemAttachment[],
  } as NewsItem);
  
  onMounted(async () => {
    isPageLoading.value = true;
    news.value = await store.getCarerNews();
    isPageLoading.value = false;
  });
  const showViewModal = async (id: number) => {
    viewNews.value = await store.getNurseNewsById(id);
    viewModal.value = true;
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    return new Intl.DateTimeFormat('de-DE', options).format(date);
  };
  </script>
  