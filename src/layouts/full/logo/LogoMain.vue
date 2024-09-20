<script lang="ts">
import { defineComponent } from 'vue';
import LogoDark from './LogoDark.vue';

export default defineComponent({
  name: 'Logo',
  components: {
    LogoDark
  }
})

</script>
<template>
  <LogoDark />
</template>
