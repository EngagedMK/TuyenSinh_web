<template>
  <v-data-table-server
    :items-length="totalItem"
    :headers="columns"
    :items="items"
    :loading="loading"
    :loadingText="loadingText"
    :items-per-page-text="itemPerPageText"
    :items-per-page-options="itemsPerPageOptions"
    @update:options="(e) => $emit('update:options', e)"
    @update:page="(e) => $emit('update:page', e)"
    @update:items-per-page="(e) => $emit('update:items-per-page', e)"
    :mobile-breakpoint="300"
  >
    <template v-slot:headers>
      <thead-table-row
        :columns="columns"
        :class="{ 'text-inline': isOverflow === true }"
      >
        <template #headers="{ columns }">
          <slot name="headers" :columns="columns"></slot>
        </template>
        <template
          v-for="item in columns"
          #[`headers.${item.value}`]="{ column }"
        >
          <slot
            v-if="column.value === 'actions'"
            :name="`header.${column.value}`"
            :item="item"
          >
            <td :key="'actions'">
              <span class="d-flex justify-end" v-if="isAction === true">
                <SubtitleTypography>Actions</SubtitleTypography>
              </span>
            </td>
          </slot>
          <slot v-else :name="`headers.${item.value}`" :column="column"> </slot>
        </template>
      </thead-table-row>
    </template>

    <template #item="{ item }">
      <slot name="item" :item="item">
        <tr-tbody-row
          :columns="[...keys, 'actions']"
          :item="item"
          :class="{ 'text-inline': isOverflow === true }"
        >
          <template v-for="column in columns" #[`item.${column.value}`]>
            <slot
              v-if="column.value === 'actions'"
              :name="`item.${column.value}`"
              :item="item"
            >
              <td :key="'actions'">
                <span class="d-flex justify-end">
                  <button-icon
                    :item="item"
                    :isAction="isAction"
                    @handle-delete="() => $emit('handleDelete', item ?? {})"
                    @handle-detail="() => $emit('handleDetail', item ?? {})"
                    @handle-edit="() => $emit('handleEdit', item ?? {})"
                  >
                    <template #btn-custom-action>
                      <slot name="custom-icon-action" :item="item"></slot>
                    </template>

                    <template #btn-edit>
                      <slot name="button-edit" :item="item"></slot>
                    </template>

                    <template #btn-detail>
                      <slot name="button-detail" :item="item"></slot>
                    </template>

                    <template #btn-delete>
                      <slot name="button-delete" :item="item"></slot>
                    </template>
                  </button-icon>
                </span>
              </td>
            </slot>
            <slot v-else :name="`item.${column.value}`" :item="item">
              <TdTableCell> {{ renderName(item, column.value) }}</TdTableCell>
            </slot>
          </template>
        </tr-tbody-row>
      </slot>
    </template>
    <template v-slot:top>
      <v-row class="mt-1">
        <v-col cols="12" md="9" sm="12">
          <slot name="search">
            <filter-table
              :options="options"
              :filter="filter"
              @change-filter="updateFilter"
              :onFilter="handleSubmit"
              :multi="multiFilter"
            >
              <template #field-search="{ type, handleChange }">
                <slot
                  name="field-search"
                  :type="type"
                  :handle-change="handleChange"
                ></slot>
              </template>
            </filter-table>
          </slot>
        </v-col>
        <v-col cols="12" md="3" sm="0" class="d-flex pl-7 justify-end">
          <slot name="btn-create">
            <ButtonCustom
              variant="flat"
              flat
              :color="colorStatic.buttonGreen"
              size="large"
              class="mr-3 height"
              @click="() => $emit('handleCreate')"
              :icon-prepend="ICON_CREATE"
            >
              <TextButton :style="{ color: colorStatic.white }">
                {{ $t("button.add") }}
              </TextButton>
            </ButtonCustom>
          </slot>
          <slot name="btn-custom"></slot>
        </v-col>
      </v-row>

      <multiple-search
        :options="options"
        :filter="filter"
        :onFilter="handleSubmit"
        @change-filter="updateFilter"
      >
        <template #tag-search="{ type, item }">
          <slot name="tag-search" :type="type" :item="item">
            <span v-if="type === 'status'">
              {{ item.label }} | {{ $t(`${filterStatus(item.value)}`) }}
            </span>
          </slot>
        </template>
      </multiple-search>
    </template>
    <template #bottom v-if="hiddenFooter === true"> </template>
  </v-data-table-server>
</template>

<script lang="ts" generic="T">
interface IOption {
  value: string;
  label: string;
  type?: string;
}
import { PropType, computed, defineComponent } from "vue";
import { IColumnHeader } from "../interfaces/IThTableCellStyle";
import TheadTableRow from "./TheadTableRow.vue";
import TrTbodyRow from "./TrTbodyRow.vue";
import ButtonIcon from "./ButtonIcon.vue";
import SubtitleTypography from "../../atoms/text/SubtitleTypography.vue";
import FilterTable from "./FilterTable.vue";
import MultipleSearch from "./MultipleSearch.vue";
import TextButton from "../../atoms/text/TextButton.vue";
import { colorStatic } from "../../token/color";
import ButtonCustom from "../button/ButtonCustom.vue";
import { IFilterParams } from "../interfaces/IFilterTable";
import TdTableCell from "./TdTableCell.vue";
import { useI18n } from "vue-i18n";
import { ICON_CREATE } from "@/app/core/icons_in_use";
import { EStatus } from "@/app/shared/enums/EStatus";

const defineGenericComponent = <T,>() => {
  return defineComponent({
    props: {
      options: {
        type: Object as PropType<IOption[]>,
        required: true,
      },
      filter: {
        type: Object as PropType<IFilterParams>,
        required: false,
      },
      status: {
        type: String,
        required: false,
      },
      statuses: {
        type: Array<T>,
        required: false,
      },
      role: {
        type: String,
        required: false,
      },
      handleSubmit: {
        type: Function,
        default: () => {},
      },

      updateFilter: {
        type: Function,
        default: () => {},
      },
      multiFilter: {
        type: Boolean,
        required: false,
        default: false,
      },
      columns: {
        type: Array<IColumnHeader>,
        required: true,
      },
      totalItem: {
        type: Number,
        required: true,
      },
      items: {
        type: Array<T>,
        required: true,
      },
      keys: {
        type: Array<string>,
        required: true,
      },
      loading: {
        type: Boolean,
        required: false,
      },
      loadingText: {
        type: String,
        required: false,
        default: () => {
          const { t } = useI18n();
          return t("loadingText");
        },
      },
      itemsPerPageOptions: {
        type: Array<{
          title: string;
          value: number;
        }>,
        required: false,
      },
      isAction: {
        type: Boolean,
        default: true,
        required: false,
      },
      hiddenFooter: {
        type: Boolean,
        default: false,
        required: false,
      },
      isOverflow: {
        type: Boolean,
        default: false,
        required: false,
      },
      itemPerPageText: {
        type: String,
        required: false,
      },
    },
    emits: {
      handleEdit: (item: Object) => {
        return item;
      },
      handleDetail: (item: Object) => {
        return item;
      },
      handleDelete: (item: Object) => {
        return item;
      },
      handleCreate: () => true,
      "update:options": (item: Object) => {
        return item;
      },
      "update:page": (item: any) => {
        return item;
      },
      "update:items-per-page": (item: any) => {
        return item;
      },
    },
    components: {
      TheadTableRow,
      TrTbodyRow,
      ButtonIcon,
      SubtitleTypography,
      FilterTable,
      MultipleSearch,
      TextButton,
      ButtonCustom,
      TdTableCell,
    },
    setup(props) {
      const { t } = useI18n();
      const statusFilter = props.status;
      const roleFilter = props.role;

      const filterStatus = (value: EStatus) => {
        switch (value) {
          case EStatus.Active:
            return t("active");
          case EStatus.InActive:
            return t("inActive");
          default:
            return value;
        }
      };

      const renderName = (item: any, key: string) => {
        return item[key];
      };

      const overFlowEnable = computed(() =>
        props.isOverflow === true ? "auto" : "hidden",
      );

      return {
        colorStatic,
        statusFilter,
        roleFilter,
        ICON_CREATE,
        overFlowEnable,
        t,
        renderName,
        filterStatus,
      };
    },
  });
};

export default defineGenericComponent();
</script>

<style scoped>
.height {
  height: 40px;
}

.text-inline {
  overflow: hidden !important;
  white-space: nowrap !important;
}

:deep(.v-table__wrapper) {
  overflow: v-bind(overFlowEnable) !important;
}
</style>
