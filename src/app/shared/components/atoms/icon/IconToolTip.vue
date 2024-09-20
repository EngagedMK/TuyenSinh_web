<template>
  <ToolTip :textToolTip="textToolTip" @click="$emit('click')">
    <template #btn="{ props }">
      <v-btn
        icon
        v-bind="props"
        @click="() => $emit('click')"
        :size="size"
        :color="colorBtn"
      >
        <v-icon :color="colorIcon">
          <slot></slot>
        </v-icon>
      </v-btn>
    </template>
  </ToolTip>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ToolTip from "../tooltip/ToolTip.vue";
import { colorStatic } from "../../token/color";

export default defineComponent({
  name: "IconToolTip",
  components: { ToolTip },
  emits: {
    click: () => true,
  },
  props: {
    textToolTip: {
      type: String,
      required: true,
    },
    colorBtn: {
      type: String,
      required: false,
      default: colorStatic.palette.primary.main,
    },
    colorIcon: {
      type: String,
      required: false,
      default: colorStatic.palette.grey[100],
    },
    size: {
      type: [Number, String],
      required: false,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
