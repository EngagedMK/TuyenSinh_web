<script lang="ts">
import { defineComponent, ref } from "vue";
import { SendIcon, MailboxIcon } from 'vue-tabler-icons';

export default defineComponent({
  name: "NotificationDD",
  setup() {
    const notificationDD = ref(["Tất cả thông báo", "Mới", "Chưa đọc", "Khác"]);
    const selectNotify = ref<string>("Tất cả thông báo");

    return {
      notificationDD,
      selectNotify,
      SendIcon,
      MailboxIcon,
    };
  },
});
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- notifications DD -->
  <!-- ---------------------------------------------- -->
  <div class="pa-4">
    <div class="d-flex align-center justify-space-between mb-3">
      <h6 class="text-subtitle-1">
        Thông báo
        <v-chip
          color="warning"
          variant="flat"
          size="small"
          class="ml-2 text-white"
          >01</v-chip
        >
      </h6>
    </div>
    <v-select
      :items="notificationDD"
      v-model="selectNotify"
      color="primary"
      variant="outlined"
      density="default"
      hide-details
    ></v-select>
  </div>
  <v-divider></v-divider>
  <perfect-scrollbar style="height: calc(100vh - 300px); max-height: 650px">
    <v-list class="py-0" lines="three">
      <v-list-item value="" color="secondary" class="no-spacer">
        <template v-slot:prepend>
          <v-avatar size="40" class="mr-3 py-2">
            <img
              src="@/assets/profile/user-round.svg"
              width="40"
            />
          </v-avatar>
        </template>
        <div class="d-inline-flex align-center justify-space-between w-100">
          <h6 class="text-subtitle-1 font-weight-regular">John Deo</h6>
          <span class="text-subtitle-2 text-medium-emphasis">2 mins ago</span>
        </div>

        <p class="text-subtitle-2 text-medium-emphasis mt-1">
          It is a long established fact that a reader will be distracted
        </p>
        <div class="mt-3">
          <v-chip
            size="small"
            text="Unread"
            color="error"
            variant="tonal"
            class="mr-2"
          />
          <v-chip size="small" text="New" color="warning" variant="tonal" />
        </div>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item value="" color="secondary" class="no-spacer">
        <template v-slot:prepend>
          <v-avatar size="40" variant="flat" color="lightsuccess" class="mr-3 py-2 text-success">
            <BuildingStoreIcon size="20" />
          </v-avatar>
        </template>
        <div class="d-inline-flex align-center justify-space-between w-100">
          <h6 class="text-subtitle-1">Store Verification Done</h6>
          <span class="text-subtitle-2 text-medium-emphasis">2 mins ago</span>
        </div>

        <p class="text-subtitle-2 text-medium-emphasis mt-1">We have successfully received your request.</p>
        <div class="mt-3">
          <v-chip size="small" color="error" text="Unread" variant="tonal" />
        </div>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item value="" color="secondary" class="no-spacer">
        <template v-slot:prepend>
          <v-avatar size="40" variant="flat" color="lightprimary" class="mr-3 py-2 text-primary">
            <MailboxIcon size="20" />
          </v-avatar>
        </template>
        <div class="d-inline-flex align-center justify-space-between w-100">
          <h6 class="text-subtitle-1">Check your Mail.</h6>
          <span class="text-subtitle-2 text-medium-emphasis">2 mins ago</span>
        </div>

        <p class="text-subtitle-2 text-medium-emphasis mt-1">All done! Now check your inbox as you're in for a sweet treat!</p>
        <div class="mt-3">
          <v-btn color="primary" variant="flat">
            <template v-slot:append>
              <SendIcon size="20" />
            </template>
            Mail
          </v-btn>
        </div>
      </v-list-item>
    </v-list>
  </perfect-scrollbar>
  <v-divider></v-divider>
  <div class="pa-2 text-center">
    <v-btn color="primary" variant="text">Xem tất cả</v-btn>
  </div>
</template>
