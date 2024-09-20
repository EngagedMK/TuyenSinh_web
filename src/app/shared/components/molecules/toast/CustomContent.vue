<template>
  <div>
    <div class="font-weight-bold">{{ title }}</div>
    <div class="font-weight-normal">{{ content }}</div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: "",
    },
    content: {
      type: String,
      required: false,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped></style>
