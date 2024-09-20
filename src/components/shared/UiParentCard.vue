<script lang="ts">

import { defineComponent } from "vue";


export default defineComponent({
  name: 'UiParentCard',
  props: {
    title: {
      type: String,
    }
  }
})

// const props = defineProps({
//   title: String
// });
</script>

// ===============================|| Ui Parent Card||=============================== //
<template>
  <v-card variant="flat">
    <v-card-item>
      <div class="d-sm-flex align-center justify-space-between">
        <v-card-title>{{ title }}</v-card-title>
        <slot name="action"></slot>
      </div>
    </v-card-item>
    <v-divider></v-divider>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>
