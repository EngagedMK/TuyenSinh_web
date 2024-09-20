<template>
  <v-row class="d-flex align-center ml-1 pb-3">
    <v-col cols="4" md="3" sm="4" xs="3" class="d-flex justify-center">
      <v-select
        v-model="select"
        :placeholder="'Select'"
        :items="options"
        :item-title="(item: IOption) => item.label"
        :item-value="(item: IOption) => item.value"
        variant="solo"
        persistent-placeholder
        hide-details
        class="fit"
        density="compact"
      ></v-select>
    </v-col>
    <v-col cols="4" md="4" sm="4" xs="4" class="d-flex justify-center">
      <slot name="field-search" :type="select" :handle-change="handleChange">
        <v-text-field
          variant="solo"
          persistent-placeholder
          :placeholder="'Value'"
          hide-details
          density="compact"
          @keydown.enter="handleSubmit"
          @update:modelValue="(e) => handleChange(e)"
        ></v-text-field>
      </slot>
    </v-col>
    <v-col cols="4" md="5" sm="4" xs="5" class="d-flex justify-start">
      <ButtonCustom
        variant="flat"
        flat
        :color="colorStatic.blue"
        size="large"
        class="height"
        @click="handleSubmit"
        :icon-prepend="ICON_SEARCH"
      >
        <TextButton :style="{ color: colorStatic.white }">
          {{ $t("search.placeholder") }}
        </TextButton>
      </ButtonCustom>
    </v-col>
  </v-row>
</template>

<script lang="ts">
interface IOption {
  value: string;
  label: string;
  type?: string;
}
import { IFilterParams } from "@/app/shared/components/molecules/interfaces/IFilterTable";
import { PropType, defineComponent, ref, watch } from "vue";
import TextButton from "../../atoms/text/TextButton.vue";
import { colorStatic } from "../../token/color";
import ButtonCustom from "../button/ButtonCustom.vue";
import { useI18n } from "vue-i18n";
import { ICON_SEARCH } from "@/app/core/icons_in_use";

export default defineComponent({
  components: { TextButton, ButtonCustom },
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
    reset: {
      type: Boolean,
      required: false,
      default: false,
    },
    multi: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const items = ["Foo", "Bar", "Fizz", "Buzz"];
    const select = ref(null as any);
    const search = ref("");

    const handleChange = (e: any) => {
      search.value = e;
    };

    watch(search, (value) => {
      handleChange(value);
    });

    const handleSubmit = () => {
      let filterNew = {} as IFilterParams;
      if (select.value) {
        const label = props.options.find((x) => x.value === select.value);
        filterNew[`${select.value}`] = {
          value: search.value,
          label: label?.label,
        };
      }
      if (props.multi) {
        filterNew = Object.assign({}, props.filter, filterNew, { page: 0 });
      } else {
        filterNew = { ...filterNew, page: 0 };
      }
      emit("change-filter", filterNew);
      props.onFilter(filterNew);
    };

    watch(
      props,
      (value) => {
        if (value.reset) {
          emit("change-filter", { page: 0 });
        }
      },
      { deep: true },
    );

    return {
      items,
      select,
      search,
      colorStatic,
      ICON_SEARCH,
      t,
      handleChange,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.v-select.fit {
  width: 150px;
}
.height {
  height: 40px;
}
</style>
