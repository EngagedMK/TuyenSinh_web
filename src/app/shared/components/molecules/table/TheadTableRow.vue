<template>
  <tr>
    <slot :name="`headers`" :columns="columns">
      <template v-for="column in columns" :key="column.value">
        <slot :name="`headers.${column.value}`" :column="column">
          <ThTableCell
            :value="column.value"
            :icon-pre="column.iconPre"
            :is-delete="column.isDelete"
            :color-icon="column.colorIcon"
            :style="column.style"
            @remove-header="(value) => $emit('removeHeader', value)"
          >
            {{ column.text }}
          </ThTableCell>
        </slot>
      </template>
    </slot>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IColumnHeader } from "../interfaces/IThTableCellStyle";
import ThTableCell from "./ThTableCell.vue";
export default defineComponent({
  name: "TheadTableRow",
  emits: {
    removeHeader: (value: string) => {
      return value;
    },
  },
  components: { ThTableCell },
  props: {
    columns: {
      type: Array<IColumnHeader>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
