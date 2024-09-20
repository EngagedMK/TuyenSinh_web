<script lang="ts">
import { defineComponent } from "vue";

// const props = defineProps({ item: Object });
export default defineComponent({
  name: 'NavGroup',
  props: {
    item: Object,
    default: {} as Object,
  }
})
</script>

<template>
  <v-list-subheader color="darkText" class="smallCap">{{ item?.header }}</v-list-subheader>
</template>
