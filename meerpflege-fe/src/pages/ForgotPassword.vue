<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="email"
                type="email"
                label="email"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="light-green-7"
              size="lg"
              class="full-width"
              label="Send email"
              @click="login"
            />
          </q-card-actions>
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
import { ref } from 'vue';


const store = useAccountStore();
const email = ref('');

const login = async () => {
  await store.forgotPasswordRequest({ email: email.value });
};
</script>
