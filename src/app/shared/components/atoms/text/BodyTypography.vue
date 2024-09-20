<template>
  <span class="text-body-1" data-name="BodyTypography">
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
.text-body-1 {
  color: v-bind(color);
  font-family: v-bind(fontFamily) !important;
  font-size: 0.875rem !important;
  font-weight: 400;
  line-height: 1.5rem;
  letter-spacing: 0.03125em !important;
  text-transform: none !important;
}
</style>
