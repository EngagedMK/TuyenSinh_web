<template>
  <td>
    <v-icon
      v-if="iconPre"
      small
      :color="colorIcon || colorStatic.palette.text.primary"
      class="mx-2"
    >
      {{ iconPre }}
    </v-icon>
    <SubtitleTypography
      :style="{ color: colorStatic.palette.text.primary, ...style }"
    >
      <slot></slot>
    </SubtitleTypography>
    <v-btn
      v-if="isDelete"
      variant="text"
      icon="mdi-close"
      :color="colorStatic.palette.text.primary"
      @click="removeHeader()"
    ></v-btn>
  </td>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import SubtitleTypography from "../../atoms/text/SubtitleTypography.vue";
import { IThTableCellStyle } from "../interfaces/IThTableCellStyle";
import { colorStatic } from "../../token/color";
export default defineComponent({
  name: "ThTableCell",
  emits: {
    removeHeader: (value: string) => {
      return value;
    },
  },
  props: {
    iconPre: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: true,
    },
    colorIcon: {
      type: String,
      required: false,
    },
    style: {
      type: Object as PropType<IThTableCellStyle>,
      required: false,
    },
    isDelete: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: { SubtitleTypography },

  setup(props, { emit }) {
    const removeHeader = () => {
      emit("removeHeader", props.value);
    };

    return {
      colorStatic,
      removeHeader,
    };
  },
});
</script>

<style scoped></style>
