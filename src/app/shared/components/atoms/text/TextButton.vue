<template>
  <span class="text-button" data-name="textButton">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { PropType } from "vue";
import { IStyle } from "@/app/shared/components/atoms/text/interfaces/IStyle";
import { colorStatic } from "@/app/shared/components/token/color";
import { fontFamilyStatic } from "@/app/shared/components/token/fontFamily";
import { fontSizeStatic } from "@/app/shared/components/token/fontSize";

export default defineComponent({
  name: "TextButton",
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
    const fontSize = computed(
      () => props.style?.fontSize || fontSizeStatic.textButton,
    );
    return { color, fontFamily, fontSize };
  },
});
</script>

<style scoped>
.text-button {
  color: v-bind(color);
  font-size: v-bind(fontSize) !important;
  font-weight: 500;
  line-height: 2.25rem;
  letter-spacing: 0.0892857143em !important;
  font-family: v-bind(fontFamily) !important;
  text-transform: uppercase !important;
}
</style>
