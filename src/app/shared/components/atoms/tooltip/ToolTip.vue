<template>
  <v-tooltip location="bottom">
    <template v-slot:activator="{ props }">
      <slot name="btn" :props="props">
        <v-btn
          v-bind="props"
          :color="color"
          :size="size"
          @click="() => $emit('click')"
        >
          <TextButton
            :style="{ color: colorStatic.palette.text.white, ...style }"
          >
            <slot></slot>
          </TextButton>
        </v-btn>
      </slot>
    </template>
    <span> {{ textToolTip }} </span>
  </v-tooltip>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { colorStatic } from "../../token/color";
import { IStyle } from "../text/interfaces/IStyle";
import TextButton from "../text/TextButton.vue";

export default defineComponent({
  name: "ToolTip",
  emits: {
    click: () => true,
  },
  props: {
    textToolTip: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: colorStatic.palette.primary.main,
    },
    size: {
      type: [Number, String],
      required: false,
    },
    style: {
      type: Object as PropType<IStyle>,
      required: false,
    },
  },
  components: { TextButton },
  setup() {
    return { colorStatic };
  },
});
</script>

<style scoped></style>
