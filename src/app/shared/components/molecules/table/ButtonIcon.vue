<template>
  <v-menu
    location="start"
    v-if="isAction === true"
    :close-on-content-click="true"
  >
    <template v-slot:activator="{ props }">
      <v-icon v-bind="props"> mdi-dots-vertical </v-icon>
    </template>

    <v-list class="rounded-list">
      <slot name="btn-custom-action"></slot>

      <slot name="btn-detail">
        <v-list-item @click="handleDetail()">
          <v-list-item-title>
            <v-icon size="small" :color="colorStatic.blue">
              {{ ICON_DETAIL }}
            </v-icon>
            <TextCaption :style="{ color: colorStatic.blue }">
              {{ $t("button.detail") }}
            </TextCaption>
          </v-list-item-title>
        </v-list-item>
      </slot>

      <slot name="btn-edit">
        <v-list-item @click="handleEdit()">
          <v-list-item-title>
            <v-icon size="small" :color="colorStatic.yellow">
              {{ ICON_EDIT }}
            </v-icon>
            <TextCaption :style="{ color: colorStatic.yellow }">
              {{ $t("button.edit") }}
            </TextCaption>
          </v-list-item-title>
        </v-list-item>
      </slot>

      <slot name="btn-delete">
        <v-list-item @click="handleDelete()">
          <v-list-item-title>
            <v-icon size="small" :color="colorStatic.red">
              {{ ICON_DELETE }}
            </v-icon>
            <TextCaption :style="{ color: colorStatic.red }">
              {{ $t("button.delete") }}
            </TextCaption>
          </v-list-item-title>
        </v-list-item>
      </slot>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { colorStatic } from "../../token/color";
import TextCaption from "../../atoms/text/TextCaption.vue";
import { PropType, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { ICON_DETAIL, ICON_EDIT, ICON_DELETE } from "@/app/core/icons_in_use";

export default defineComponent({
  components: {
    TextCaption,
  },
  emits: {
    handleDetail: (item: Object) => {
      return item;
    },

    handleEdit: (item: Object) => {
      return item;
    },
    handleDelete: (item: Object) => {
      return item;
    },
  },
  props: {
    item: {
      type: Object as PropType<{
        [key: string]: any;
      }>,
      required: true,
    },
    isAction: {
      type: Boolean,
      default: true,
      required: false,
    },
  },

  setup(props, { emit }) {
    const { t } = useI18n();

    const handleEdit = () => {
      emit("handleEdit", props.item);
    };

    const handleDetail = () => {
      emit("handleDetail", props.item);
    };
    const handleDelete = () => {
      emit("handleDelete", props.item);
    };
    return {
      colorStatic,
      ICON_DETAIL,
      ICON_EDIT,
      ICON_DELETE,
      t,
      handleEdit,
      handleDetail,
      handleDelete,
    };
  },
});
</script>

<style scoped>
.rounded-list {
  border-radius: 10px;
  overflow: hidden;
  margin-right: 5px;
  position: relative;
}
.rounded-list::after {
  content: "";
  display: block;
  position: fixed;
  top: 12px;
  right: 0px;
  width: 10px;
  height: 10px;
  background-color: #fff;
  transform: translateY(-50%) rotate(45deg);
  z-index: 1;
}
</style>
