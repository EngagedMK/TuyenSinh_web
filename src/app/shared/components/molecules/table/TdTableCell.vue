<template>
  <td data-name="td-table-cell">
    <slot name="text-value">
      <body-typography :style="style">
        <slot></slot>
      </body-typography>
    </slot>
  </td>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import BodyTypography from "../../atoms/text/BodyTypography.vue";
import { IStyle } from "../../atoms/text/interfaces/IStyle";
import { colorStatic } from "../../token/color";
import { fontFamilyStatic } from "../../token/fontFamily";

export default defineComponent({
  name: "TdTableCell",
  props: {
    style: {
      type: Object as PropType<IStyle>,
      required: false,
    },
  },
  components: {
    BodyTypography,
  },
  setup() {
    return { colorStatic, fontFamilyStatic };
  },
});
</script>

<style scoped></style>
