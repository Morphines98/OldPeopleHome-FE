<template>
  <q-page class="q-ma-lg">
    <div class="page-title-container">
      <span class="page-title">News</span>
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
          style="
            align-items: center;
            align-content: flex-start;
            justify-content: center;
            flex-direction: row;
          "
          :class="{ 'even-item-bg': index % 2 !== 0 }"
        >
          <q-item-section>
            <div>
              <q-item-label class="item-title">{{ item.title }}</q-item-label>
              <q-item-label caption>{{
                formatDate(item.addedDate)
              }}</q-item-label>
              <q-item-label>{{ item.content }}</q-item-label>
            </div>
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
            <q-icon
              name="edit_note"
              :style="{ color: 'green' }"
              @click.stop="showModalEditNews(item.id)"
              class="q-ma-sm"
            ></q-icon>
            <q-icon
              name="delete"
              :style="{ color: '#E7886B' }"
              @click.stop="deletenews(item.id)"
              class="q-ma-sm"
            ></q-icon>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-dialog v-model="createModal">
      <q-card class="create-modal">
        <q-card-section>
          <div class="text-h6">Create news</div>
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
              :factory="uploadFactory"
              @uploaded="onUploaded"
            />
          </div>
          <div style="margin-bottom: 10px">
            <q-input
              color="orange-5"
              rounded
              outlined
              v-model="emptyNewsItem.title"
              label="Titel"
            />
          </div>
          <div>
            <q-input
              color="orange-5"
              rounded
              outlined
              v-model="emptyNewsItem.content"
              type="textarea"
              label="Inhalt"
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
          <q-btn flat label="Accept" color="primary" @click="createNews" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- edit modal news -->

    <q-dialog v-model="editModal">
      <q-card class="create-modal">
        <q-card-section>
          <div class="text-h6">Edit news</div>
        </q-card-section>

        <q-separator />

        <q-card-section
          style="max-height: 60vh; min-height: 60vh"
          class="scroll"
        >
          <div style="margin-bottom: 10px">
            <q-input
              color="orange-5"
              rounded
              outlined
              v-model="emptyEditNewsItem.title"
              label="Titel"
            />
          </div>
          <div>
            <q-input
              color="orange-5"
              rounded
              outlined
              v-model="emptyEditNewsItem.content"
              type="textarea"
              label="Inhalt"
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
          <q-btn flat label="Accept" color="primary" @click="editNews" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- view modal -->
    <q-dialog v-model="viewModal">
      <q-card class="create-modal" style="width: -webkit-fill-available">
        <q-card-section>
          <div class="text-overline">
            For
            {{
              groups.find((a) => a.id == viewNews.groupId)?.name ?? 'All Groups'
            }}
          </div>
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
import { useAccountStore } from 'src/stores/global';
import { ref, onMounted } from 'vue';
var store = useAccountStore();

const news = ref([] as NewsItem[]);
const groups = ref([] as Group[]);

onMounted(async () => {
  isPageLoading.value = true;
  news.value = await store.getNews();
  groups.value = await store.getGroups();
  isPageLoading.value = false;
});

const switchGroup = ref('0');
const createModal = ref(false);
const editModal = ref(false);
const viewModal = ref(false);
const isPageLoading = ref(false);

const emptyNewsItem = ref({
  id: 0,
  title: '',
  content: '',
  forAllGroups: false,
  groupId: null,
  newsItemAttachments: [] as NewsItemAttachment[],
} as NewsItem);
const viewNews = ref({
  newsItemAttachments: [] as NewsItemAttachment[],
} as NewsItem);
const emptyEditNewsItem = ref({
  id: 0,
  title: '',
  content: '',
  forAllGroups: false,
  groupId: null,
} as NewsItem);

const showCreateModal = () => {
  createModal.value = true;
};
const showViewModal = async (id: number) => {
  viewNews.value = await store.getNewsById(id);
  viewModal.value = true;
};
const showModalEditNews = (id: number) => {
  emptyEditNewsItem.value.id = id;
  let newsToUpdate = news.value.find((x) => x.id === id);
  if (newsToUpdate) {
    if (newsToUpdate.title) emptyEditNewsItem.value.title = newsToUpdate.title;
    if (newsToUpdate.content)
      emptyEditNewsItem.value.content = newsToUpdate.content;

    switchGroup.value = newsToUpdate.forAllGroups ? '0' : newsToUpdate.groupId;
  }
  editModal.value = true;
};

const createNews = () => {
  if (switchGroup.value === '0') {
    emptyNewsItem.value.forAllGroups = true;
    emptyNewsItem.value.groupId = null;
  } else {
    emptyNewsItem.value.groupId = parseInt(switchGroup.value);
    emptyNewsItem.value.forAllGroups = false;
  }

  store.crateNews(emptyNewsItem.value).then(() => {
    location.reload();
  });
};

const editNews = () => {
  if (switchGroup.value === '0') {
    emptyEditNewsItem.value.forAllGroups = true;
    emptyEditNewsItem.value.groupId = null;
  } else {
    emptyEditNewsItem.value.groupId = parseInt(switchGroup.value);
    emptyEditNewsItem.value.forAllGroups = false;
  }

  store.editNews(emptyEditNewsItem.value).then(() => {
    location.reload();
  });
};

const deletenews = (id: number) => {
  store.deleteNews(id).then(() => {
    location.reload();
  });
};

const uploadFactory = (files) => {
  const formData = new FormData();
  formData.append('file', files[0]);

  return new Promise((resolve, reject) => {
    const token = store.jwtToken;
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
  let newNewsAtach = ref({
    url: serverResponse.url,
    name: serverResponse.name,
  } as NewsItemAttachment);
  emptyNewsItem.value.newsItemAttachments?.push(newNewsAtach.value);
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
