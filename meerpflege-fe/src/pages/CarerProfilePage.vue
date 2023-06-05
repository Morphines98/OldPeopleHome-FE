<template style="position: relative">
    <q-page class="q-ma-lg" style="margin: 0px 15%">
      <q-card-section>
        <div class="text-h6">Profile</div>
      </q-card-section>
      <q-separator />
  
      <q-card-section style="max-height: 60vh; min-height: 30vh" class="scroll">
        <div style="margin-bottom: 10px">
          <q-input
            dense
            color="orange-5"
            rounded
            outlined
            v-model="carer.name"
            label="Name"
          />
        </div>
        <div style="margin-bottom: 10px">
          <q-input
            dense
            color="orange-5"
            rounded
            outlined
            v-model="carer.lastName"
            label="Last Name"
          />
        </div>
        <div style="margin-bottom: 10px">
          <q-input
            dense
            color="orange-5"
            rounded
            outlined
            v-model="carer.email"
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
              v-model="carer.phoneNumber"
              label="Phone Number"
            />
          </div> 
          <div style="margin-bottom: 10px">
            <q-input
              dense
              color="orange-5"
              rounded
              outlined
              v-model="carer.adress"
              label="Adress"
            />
          </div> 
          <div style="margin-bottom: 10px">
            <q-input
              dense
              color="orange-5"
              rounded
              outlined
              v-model="carer.city"
              label="City"
            />
          </div>
          <div style="margin-bottom: 10px">
            <q-input
              dense
              color="orange-5"
              rounded
              outlined
              v-model="carer.postCode"
              label="Post Code"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Save" color="primary" @click="editProfile" />
      </q-card-actions>
      <dialog></dialog>
    </q-page>
  </template>
  <script setup lang="ts">
  import { Carer } from 'src/models/Carer';
import { useCarersStore } from 'src/stores/carer-store';
  import { useAccountStore } from 'src/stores/global';
  import { onMounted, ref } from 'vue';
  
  var store = useCarersStore();
  var acountStore = useAccountStore();
  let carer = ref({} as Carer);
  onMounted(async () => {
    carer.value = await store.getCarer();
  });
  
  const isValid = (val: string) => {
    const pattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(val).toLowerCase());
  };
  
  const editProfile = () => {
    store.editCarers(carer.value).then(() => {
      if(acountStore.user?.email != carer.value.email)
      {
        acountStore.logOut();
      }
      else
      location.reload();
    });
  };
  </script>
  