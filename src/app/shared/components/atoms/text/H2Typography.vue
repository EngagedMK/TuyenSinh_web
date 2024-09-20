<template>
  <span class="text-h2" data-name="H2Typography">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { colorStatic } from "@/app/shared/components/token/color";
import { fontFamilyStatic } from "@/app/shared/components/token/fontFamily";
import { IStyle } from "../text/interfaces/IStyle";

export default defineComponent({
  name: "H2Typography",
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
.text-h2 {
  color: v-bind(color);
  font-size: 1.5rem !important;
  font-weight: 700;
  line-height: 2.5rem;
  letter-spacing: -0.0083333333em !important;
  font-family: v-bind(fontFamily) !important;
  text-transform: none !important;
}
</style>
