<template>
  <span :class="['text-subtitle-1', classes]" data-name="SubtitleTypography">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { IStyle } from "../text/interfaces/IStyle";
import { colorStatic } from "@/app/shared/components/token/color";
import { fontFamilyStatic } from "@/app/shared/components/token/fontFamily";

export default defineComponent({
  name: "SubtitleTypography",
  props: {
    style: {
      type: Object as PropType<IStyle>,
      required: false,
    },
    classes: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const color = computed(() => props.style?.color || colorStatic.black);
    const fontFamily = computed(
      () => props.style?.fontFamily || fontFamilyStatic.inherit,
    );
    return { color, fontFamily };
  },
});
</script>

<style scoped>
.text-subtitle-1 {
  color: v-bind(color);
  font-family: v-bind(fontFamily) !important;
  font-size: 1rem !important;
  font-weight: 500;
  line-height: 1rem;
  letter-spacing: 0.009375em !important;
  text-transform: none !important;
}
</style>
