<template style="position: relative">
  <q-page class="q-ma-lg" style="margin: 0px 15%">
    <q-card-section>
      <div class="text-h6">Profile</div>
    </q-card-section>

    <q-avatar
      size="200px"
      style="
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 10px;
      "
      rounded
      clickable
      @click="openImageLoader"
    >
      <img
        :src="nurse.nurseAvatarUrl ?? 'https://cdn.quasar.dev/img/avatar.png'"
        style="border-radius: 50%"
      />
    </q-avatar>
    <q-separator />

    <div style="display: flex; justify-content: center; margin: 15px">
      <q-uploader
        ref="uploader"
        label="Upload profile picture"
        auto-upload
        accept=".jpg, image/*"
        :factory="uploadFactory"
        @uploaded="onUploaded"
      />
    </div>
    <q-separator />

    <q-card-section style="max-height: 60vh; min-height: 30vh" class="scroll">
      <div style="margin-bottom: 10px">
        <q-input
          dense
          color="orange-5"
          rounded
          outlined
          v-model="nurse.name"
          label="Name"
        />
      </div>
      <div style="margin-bottom: 10px">
        <q-input
          dense
          color="orange-5"
          rounded
          outlined
          v-model="nurse.lastName"
          label="Last Name"
        />
      </div>
      <div style="margin-bottom: 10px">
        <q-input
          dense
          color="orange-5"
          rounded
          outlined
          v-model="nurse.email"
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
            v-model="nurse.phoneNumber"
            label="Phone Number"
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
import { Nurse } from 'src/models/Nurse';
import { useAccountStore } from 'src/stores/global';
import { useNurseStore } from 'src/stores/nurse-store';
import { onMounted, ref } from 'vue';
const imageLoader = ref(false);

const openImageLoader = () => {
  imageLoader.value = true;
};

var store = useNurseStore();
var acountStore = useAccountStore();
let nurse = ref({} as Nurse);
onMounted(async () => {
  nurse.value = await store.getNurse();
});

const isValid = (val: string) => {
  const pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(val).toLowerCase());
};

const editProfile = () => {
  store.editNurse(nurse.value).then(() => {
    if(acountStore.user?.email != nurse.value.email)
    {
      acountStore.logOut();
    }
    else
    location.reload();
  });
  console.log(nurse.value);
};

const uploadFactory = (files) => {
  const formData = new FormData();
  formData.append('file', files[0]);

  return new Promise((resolve, reject) => {
    const token = acountStore.jwtToken;
    resolve({
      url: 'http://localhost:5000/api/utility',
      method: 'POST',
      headers: [
        { name: 'Authorization', value: `Bearer ${token}` }
      ]
    })
  })
}

const onUploaded = ({ files }) => {
  const file = files[0];
  const serverResponse = JSON.parse(file.xhr.responseText);
  console.log(serverResponse);

  nurse.value.nurseAvatarUrl = serverResponse.url;
  console.log(nurse);
}
</script>
