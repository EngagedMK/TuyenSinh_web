<template>
  <tr>
    <slot :name="`item`" :item="item">
      <template v-for="column in columns" :key="column">
        <slot :name="`item.${column}`" :item="item">
          <td-table-cell>
            {{ getValue(column) }}
          </td-table-cell>
        </slot>
      </template>
    </slot>
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import TdTableCell from "@/app/shared/components/molecules/table/TdTableCell.vue";

export default defineComponent({
  name: "TrTbodyRow",
  components: { TdTableCell },
  props: {
    columns: {
      type: Array<string>,
      required: true,
    },
    item: {
      // type: {} as PropType<T>,
      type: Object as PropType<{
        [key: string]: any;
      }>,
      // type: Object as PropType<{
      //   [key in keyof T]: T[key] extends string ? T[key] : never;
      // }>,
      required: true,
    },
  },
  setup(props) {
    const { item } = props;
    const getValue = (column: string) => {
      return item[column as keyof typeof item];
    };
    return { getValue };
  },
});
</script>

<style scoped></style>
