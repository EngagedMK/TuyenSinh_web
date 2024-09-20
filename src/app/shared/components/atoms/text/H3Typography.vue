<template>
  <span class="text-h3" data-name="h3Typography">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { IStyle } from "../text/interfaces/IStyle";
import { colorStatic } from "@/app/shared/components/token/color";
import { fontFamilyStatic } from "@/app/shared/components/token/fontFamily";

export default defineComponent({
  name: "h3Typography",
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
.text-h3 {
  color: v-bind(color);
  font-family: v-bind(fontFamily) !important;
  font-size: 1.25rem !important;
  font-weight: 600;
  line-height: 2rem;
  letter-spacing: normal !important;
  text-transform: none !important;
}
</style>
