<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="password" type="password" label="password" :rules="[validatePassword]"/>
              <q-input square filled clearable v-model="confirmPassword" type="password" label="confirm password" :rules="[validateConfirmPassword]"/>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-green-7" size="lg" class="full-width" label="Change password" @click="login" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Not reigistered? Created an Account</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.q-card {
  width: 360px;
}
</style>

<script setup lang="ts">

import { useAccountStore } from 'src/stores/global';
import { computed, onMounted } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

console.log("da");

const store = useAccountStore();

const password = ref('');
const confirmPassword = ref('');

const userId = ref('');
const token = ref('');

onMounted(() => {
  const route = useRoute();
  userId.value = route.query.userId;
  token.value = route.query.token;


  console.log(userId.value, token.value);
});

const validatePassword = computed(() => (val) => {
  if (val.length < 8) return 'Password must be at least 8 characters long.';
  if (!/[A-Z]/.test(val)) return 'Password must contain at least one capital letter.';
  if (!/[0-9]/.test(val)) return 'Password must contain at least one number.';
  if (!/[!@#$%^&*]/.test(val)) return 'Password must contain at least one special character.';
  return true;
});

const validateConfirmPassword = computed(() => (val) => {
  if (val !== password.value) return 'Passwords do not match.';
  return true;
});

const validForm = computed(() => {
  return validatePassword.value(password.value) === true && validateConfirmPassword.value(confirmPassword.value) === true;
});

const login = async () => {

  if (validForm.value) {
    await store.resetPassword({ userId: userId.value, newPassword: password.value, resetToken: token.value })
  }
}

</script>
