<template>
    <q-page class="q-ma-lg">
      <div class="page-title-container">
        <h4>Carers</h4>
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
      <div v-if="isPageLoading" class="q-pa-md">
      <q-item style="max-width: 100%">
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
        <q-item
          style="display: flex; align-items: center"
          v-for="carer in carers"
          :key="carer.id"
          clickable
          @click="showEditModal(carer.id)">
  
          <q-avatar size="100px">
            <img
              :src="carer.avatarUrl ?? 'https://oldpeoplehome.blob.core.windows.net/files/istockphoto-1018999828-170667a.jpg'"
            />
          </q-avatar>
          <q-item-section style="padding: 5%">
            <q-item-label class="item-title text-h6">
              {{ carer.name + ' ' + carer.lastName }}
            </q-item-label>
            <q-item-label caption class="q-pt-none">{{
              'Adress: '+carer.adress+' '+carer.city +' PostCode: '+carer.postCode
            }}</q-item-label>
            <q-item-label caption class="q-pt-none">{{
              'Infos: Phone Number: '+carer.phoneNumber + ' Email: '+carer.email
            }}</q-item-label>
          </q-item-section>
  
          <q-item-section side class="flex items-center">
            <q-icon
              name="delete"
              :style="{ color: '#E7886B' }"
              @click.stop="deleteCarer(carer.id)"
              class="q-ma-sm"
            ></q-icon>
          </q-item-section>
        </q-item>
      </div>
  
      <q-dialog v-model="createModal">
        <q-card class="create-modal">
          <q-card-section>
            <div class="text-h6">Create carer</div>
          </q-card-section>
  
          <q-separator />
  
          <q-card-section
            style="max-height: 60vh; min-height: 60vh"
            class="scroll"
          >
            <div style="margin-bottom: 10px">
              <q-input
              dense
                color="orange-5"
                rounded
                outlined
                v-model="emptyCarer.name"
                label="Name"
              />
            </div>
            <div style="margin-bottom: 10px">
              <q-input
              dense
                color="orange-5"
                rounded
                outlined
                v-model="emptyCarer.lastName"
                label="Last Name"
              />
            </div>
            <div style="margin-bottom: 10px">
              <q-input
              dense
                color="orange-5"
                rounded
                outlined
                v-model="emptyCarer.email"
                type="email"
                label="Email"
                :rules="[
                  (val) => !!val || 'Required field',
                  (val) => isValid(val) || 'Invalid email',
                ]"
              />
              <div style="margin-bottom: 10px">
              <q-input
              dense
                color="orange-5"
                rounded
                outlined
                v-model="emptyCarer.phoneNumber"
                label="Phone Number"
              />
            </div>
            <div style="margin-bottom: 10px">
              <q-input
              dense
                color="orange-5"
                rounded
                outlined
                v-model="emptyCarer.city"
                label="City"
              />
            </div>
            <div style="margin-bottom: 10px">
              <q-input
              dense
                color="orange-5"
                rounded
                outlined
                v-model="emptyCarer.adress"
                label="Adress"
              />
            </div>
            <div style="margin-bottom: 10px">
              <q-input
              dense
                color="orange-5"
                rounded
                outlined
                v-model="emptyCarer.postCode"
                label="PostCode"
              />
            </div>
            </div>
          </q-card-section>
  
          <q-separator />
  
          <q-card-actions align="right">
            <q-btn flat label="Decline" color="primary" v-close-popup />
            <q-btn flat label="Accept" color="primary" @click="createCarer" />
          </q-card-actions>
        </q-card>
      </q-dialog>
  
      <!-- edit modal -->
  
      <q-dialog v-model="editModal">
        <q-card class="create-modal">
          <q-card-section>
            <div class="text-h6">Edit carer</div>
          </q-card-section>
  
          <q-separator />
  
          <q-card-section
            style="max-height: 60vh; min-height: 60vh"
            class="scroll"
          >
            <div style="margin-bottom: 10px">
              <q-input
              dense
                color="orange-5"
                rounded
                outlined
                v-model="emptyCarer.name"
                label="Name"
              />
            </div>
            <div style="margin-bottom: 10px">
              <q-input
              dense
                color="orange-5"
                rounded
                outlined
                v-model="emptyCarer.lastName"
                label="Last Name"
              />
            </div>
            <div style="margin-bottom: 10px">
              <q-input
              dense
                color="orange-5"
                rounded
                outlined
                v-model="emptyCarer.email"
                type="email"
                label="Email"
                :rules="[
                  (val) => !!val || 'Required field',
                  (val) => isValid(val) || 'Invalid email',
                ]"
              />
              <div style="margin-bottom: 10px">
              <q-input
              dense
                color="orange-5"
                rounded
                outlined
                v-model="emptyCarer.phoneNumber"
                label="Phone Number"
              />
            </div>
            <div style="margin-bottom: 10px">
              <q-input
              dense
                color="orange-5"
                rounded
                outlined
                v-model="emptyCarer.city"
                label="City"
              />
            </div>
            <div style="margin-bottom: 10px">
              <q-input
              dense
                color="orange-5"
                rounded
                outlined
                v-model="emptyCarer.adress"
                label="Adress"
              />
            </div>
            <div style="margin-bottom: 10px">
              <q-input
              dense
                color="orange-5"
                rounded
                outlined
                v-model="emptyCarer.postCode"
                label="PostCode"
              />
            </div>
            </div>
          </q-card-section>
  
          <q-separator />
  
          <q-card-actions align="right">
            <q-btn flat label="Decline" color="primary" v-close-popup />
            <q-btn flat label="Accept" color="primary" @click="editCarer" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  <script setup lang="ts">
import { Carer } from 'src/models/Carer';
import { useCarersStore } from 'src/stores/carer-store';
  import { onMounted, ref } from 'vue';
  
  var store = useCarersStore();
  const carers = ref([] as Carer[]);
  const createModal = ref(false);
  const editModal = ref(false);
  const isPageLoading = ref(false);
  
  onMounted(async () => {
    isPageLoading.value=true;
    carers.value = await store.getCarers();
    isPageLoading.value=false;
  });
  
  const emptyCarer = ref({} as Carer);
  
  const showCreateModal = () => {
    createModal.value = true;
  };
  
  const showEditModal = (id:number) => {
      emptyCarer.value.id = id;
    let carerToUpdate = carers.value.find(x => x.id === id);
    if (carerToUpdate) {
  
      if (carerToUpdate.name) 
              emptyCarer.value.name = carerToUpdate.name;
      if (carerToUpdate.lastName) 
                emptyCarer.value.lastName = carerToUpdate.lastName;
      if (carerToUpdate.email) 
                emptyCarer.value.email = carerToUpdate.email;
      if (carerToUpdate.phoneNumber) 
                emptyCarer.value.phoneNumber = carerToUpdate.phoneNumber;
      if (carerToUpdate.city) 
                emptyCarer.value.city = carerToUpdate.city; 
      if (carerToUpdate.adress) 
                emptyCarer.value.adress = carerToUpdate.adress;
      if (carerToUpdate.postCode) 
                emptyCarer.value.postCode = carerToUpdate.postCode;
  
    }
    editModal.value = true;
  };
  
  const createCarer = () => {
    store.createCarers(emptyCarer.value).then(() => {
      location.reload();
    });
  };
  
  const deleteCarer = (id: number) => {
      store.deleteCarers(id).then(() => {
      location.reload();
    });
  };
  
  const editCarer = () =>{
    store.editCarers(emptyCarer.value).then(() => {
      location.reload();
    });
  }
  
  const isValid = (val: string) => {
    const pattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(val).toLowerCase());
  };
  
  </script>
  