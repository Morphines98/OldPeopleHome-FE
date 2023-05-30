<template>
    <q-page class="q-ma-lg">
      <div class="page-title-container">
        <span class="page-title">News</span>
      </div>
  
      <div class="q-ma-md">
        <q-list>
          <q-item class="custom-padding" clickable v-for="(item, index) in news" :key="item.id"
            :class="{ 'even-item-bg': index % 2 !== 0 }">
            <q-item-section >
              <q-item-label class="item-title">{{ item.title }}</q-item-label>
              <q-item-label caption>{{
                formatDate(item.addedDate)
              }}</q-item-label>
              <q-item-label>{{ item.content }}</q-item-label>
            </q-item-section>
            <q-item-section side class="flex items-center">
              <q-icon name="delete" :style="{ color: '#E7886B' }" 
                class="q-ma-sm"></q-icon>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-page>
  </template>
  
  <script setup lang="ts">
  import { Group } from 'src/models/Group';
  import { NewsItem } from 'src/models/NewsItem';
import { useNurseNewsStore } from 'src/stores/nurse-stores/nurse-news-store';
  import { ref, onMounted } from 'vue';
  var store = useNurseNewsStore();
  
  const news = ref([] as NewsItem[]);
  const groups = ref([] as Group[]);
  
  onMounted(async () => {
    news.value = await store.getNurseNews();
  });
  
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
  