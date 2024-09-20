<template>
  <div className="multi-search">
    <v-container v-if="Object.keys(data).length > 0" fluid>
      <v-row class="px-3">
        <v-col cols="10">
          <v-icon class="mr-2" color="blue lighten-2" dark> mdi-filter </v-icon>
          <v-chip
            v-for="item in Object.keys(data)"
            :key="item"
            class="ma-2"
            :closable="true"
            :draggable="true"
            color="primary"
            label
            @click:close="handleClose(item)"
          >
            <slot name="tag-search" :item="filter[item]" :type="item">
              {{ filter[item].label }} |
              {{ filter[item].value }}
            </slot>
          </v-chip>
        </v-col>
        <v-col cols="2" class="d-flex justify-end">
          <ButtonCustom
            variant="flat"
            flat
            color="red-lighten-1"
            @click="handleClearAll"
            :iconPrepend="ICON_DELETE_FILTER"
          >
            <TextButton :style="{ color: colorStatic.white }">
              {{ $t("button.delete") }}
            </TextButton>
          </ButtonCustom>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
interface IOption {
  value: string;
  label: string;
  type?: string;
}
import ButtonCustom from "../button/ButtonCustom.vue";
import { IFilterParams } from "@/app/shared/components/molecules/interfaces/IFilterTable";
import { PropType, defineComponent, ref, watch } from "vue";
import { omit } from "lodash";
import TextButton from "../../atoms/text/TextButton.vue";
import { colorStatic } from "../../token/color";
import { useI18n } from "vue-i18n";
import { ICON_DELETE_FILTER } from "@/app/core/icons_in_use";

export default defineComponent({
  components: {
    TextButton,
    ButtonCustom,
  },
  emits: ["change-filter"],
  props: {
    filter: {
      type: Object as PropType<IFilterParams>,
      required: true,
    },
    onFilter: {
      type: Function,
      required: true,
      default(filter: IFilterParams) {
        console.log(filter);
      },
    },
    options: {
      type: Object as PropType<IOption[]>,
      required: true,
    },
    ignore: {
      type: Object as PropType<string[]>,
      required: false,
    },
  },

  setup(props, { emit }) {
    const { t } = useI18n();

    const data = ref({} as IFilterParams);

    const handleClose = (e: string) => {
      const filterNew = { ...omit(props.filter, [e]), page: 0 };
      emit("change-filter", filterNew);
      props.onFilter(filterNew);
    };

    const handleClearAll = () => {
      const filterNew = { page: 0 };
      emit("change-filter", filterNew);
      props.onFilter(filterNew);
    };

    watch(
      () => props.filter,
      (value) => {
        if (value) {
          data.value = omit(
            value,
            ["sort", "type", "page", "size"].concat(props.ignore ?? []),
          );
        }
      },
      { deep: true, immediate: true },
    );

    return {
      data,
      colorStatic,
      ICON_DELETE_FILTER,
      t,
      handleClose,
      handleClearAll,
    };
  },
});
</script>

<style scoped>
:deep(.v-container) {
  padding: 0px !important;
}
</style>
