<template>
     <q-page class="q-ma-lg">
    <div class="page-title-container">
        <h4>Nurses</h4> 
        <div style="cursor: pointer; display: inline; margin-left: 20px" >
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
<q-item>
    <q-item-section>
      <q-item-label>Single line item</q-item-label>
      <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
    </q-item-section>

    <q-item-section side top>
      <q-item-label caption>2 min ago</q-item-label>
      <div class="text-orange">
        <q-icon name="star" />
        <q-icon name="star" />
        <q-icon name="star" />
      </div>
    </q-item-section>
  </q-item>
    </div>
</q-page>
</template>
<script setup lang="ts">
import {Nurse} from 'src/models/Nurse'
import { useAccountStore } from 'src/stores/global';
import { onMounted, ref } from 'vue';

var store = useAccountStore();
const nurses = ref([] as Nurse[]);
const createModal = ref(false);
const editModal = ref(false);
onMounted(async () => {
  nurses.value = await store.getNurses();
});
</script>