<template>
  <div class="logo">
    <!-- <RouterLink to="/">
    </RouterLink> -->
    <router-view to="/">
      <v-img src="@/assets/logo.png"></v-img>
    </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

// import { RouterLink } from 'vue-router';
export default defineComponent({
  name: 'LogoDark'
})

</script>
