<template>
  <v-btn
    class="button-size"
    data-name="ButtonCustome"
    :href="href"
    :target="target"
    @click="() => $emit('click')"
    :loading="loading"
  >
    <v-icon v-if="iconPrepend" small class="mr-2">
      {{ iconPrepend }}
    </v-icon>

    <text-button :style="style">
      <slot></slot>
    </text-button>

    <v-icon v-if="iconAppend" small class="mr-2">
      {{ iconAppend }}
    </v-icon>
  </v-btn>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { IStyleButton } from "../interfaces/IStyleButton";
import { colorStatic } from "@/app/shared/components/token/color";
import { defaultButton } from "@/app/shared/components/token/height";
import { minWidthDefalut } from "@/app/shared/components/token/minWidth";
import { paddingDefault } from "@/app/shared/components/token/padding";
import { fontSizeStatic } from "@/app/shared/components/token/fontSize";
import TextButton from "../../atoms/text/TextButton.vue";
import { borderStatic } from "../../token/border";

export default defineComponent({
  name: "ButtonCustome",
  components: { TextButton },
  props: {
    style: {
      type: Object as PropType<IStyleButton>,
      required: false,
    },
    iconPrepend: {
      type: String,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
    iconAppend: {
      type: String,
      required: false,
    },
    href: {
      type: String,
      required: false,
    },
    target: {
      type: String,
      required: false,
    },
  },

  emits: {
    click: () => true,
  },

  setup(props) {
    const color = computed(
      () => props.style?.color || colorStatic.palette.primary.dark,
    );
    const backgroundColor = computed(
      () => props.style?.backgroundColor || colorStatic.white,
    );
    const heightButton = computed(
      () => props.style?.height || defaultButton.height,
    );
    const minWidth = computed(
      () => props.style?.minWidth || minWidthDefalut.minWidth,
    );
    const paddingButton = computed(
      () => props.style?.padding || paddingDefault.padding,
    );

    const fontSize = computed(
      () => props.style?.fontSize || fontSizeStatic.textButton,
    );

    const borderRadius = computed(
      () => props.style?.borderRadius || borderStatic.borderRadius,
    );
    const borderColor = computed(
      () => props.style?.borderColor || borderStatic.borderRadius,
    );
    const { border } = colorStatic;

    const borderWidth = computed(
      () => props.style?.borderWidth || borderStatic.width,
    );
    const inputBorderRadius = borderStatic.input;
    const colorBorderInput = border.input;
    const colorBorderFocused = border.inputFocused;
    return {
      heightButton,
      color,
      backgroundColor,
      minWidth,
      paddingButton,
      fontSize,
      borderRadius,
      borderWidth,
      borderColor,
      inputBorderRadius,
      colorBorderInput,
      colorBorderFocused,
    };
  },
});
</script>

<style scoped>
.button-size {
  height: v-bind(heightButton);
  min-width: v-bind(minWidth);
  padding: v-bind(paddingButton);
  background-color: v-bind(backgroundColor);
  font-size: v-bind(fontSize);
  color: v-bind(color);
  border-radius: v-bind(borderRadius);
  border: thin solid v-bind(borderColor);
  border-width: v-bind(borderWidth);
}
</style>
