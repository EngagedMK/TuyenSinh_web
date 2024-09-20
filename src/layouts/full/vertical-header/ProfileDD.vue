<script lang="ts">
import { defineComponent, ref } from "vue";
import { SettingsIcon, LogoutIcon, UserIcon } from 'vue-tabler-icons';
// import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "ProfileDD",
  setup() {
    const swt1 = ref(true);
    const swt2 = ref(false);
    // const authStore = useAuthStore();

    return {
      swt1,
      swt2,
      SettingsIcon,
      LogoutIcon,
      UserIcon,
      // authStore,
    };
  },
});
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- profile DD -->
  <!-- ---------------------------------------------- -->
  <div class="pa-4">
    <h3 class="mb-n1">
      Chào buổi sáng, <span class="font-weight-regular">Nguyễn Việt An</span>
    </h3>
    <span class="text-subtitle-2 text-medium-emphasis">Sinh viên</span>

    <v-divider class="my-2"></v-divider>
    <v-list>
        <v-list-item color="secondary" rounded="md">
          <template v-slot:prepend>
            <SettingsIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2">
            Tài khoản</v-list-item-title
          >
        </v-list-item>

        <v-list-item color="secondary" rounded="md">
          <template v-slot:prepend>
            <LogoutIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2"> Đăng xuất </v-list-item-title>
        </v-list-item>
      </v-list>
  </div>
</template>
