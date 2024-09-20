<template>
  <v-dialog
    :model-value="value"
    :width="width"
    v-if="typeDialog !== STATUS_DIALOG.DELETE"
    :persistent="!isFullScreen"
    :fullscreen="isFullScreen"
    hide-overlay
    :scrollable="true"
  >
    <template v-slot:default>
      <v-card class="dialog-card">
        <v-toolbar :color="colorStatic.blue" dark>
          <ButtonCustom
            :style="{
              backgroundColor: colorStatic.blue,
              borderColor: colorStatic.blue,
              color: colorStatic.white,
            }"
            icon
            @click="$emit('cancel')"
          >
            <v-icon>{{ ICON_CLOSE }}</v-icon>
          </ButtonCustom>
          <slot name="title">
            <v-toolbar-title v-if="typeDialog === STATUS_DIALOG.CREATE">
              {{ t("toolbarTitle.add", { name: name }) }}
            </v-toolbar-title>
            <v-toolbar-title v-if="typeDialog === STATUS_DIALOG.EDIT">
              {{ t("toolbarTitle.update", { name: name }) }}
            </v-toolbar-title>
            <v-toolbar-title v-if="typeDialog === STATUS_DIALOG.DETAIL">
              {{ t("toolbarTitle.detail", { name: name }) }}
            </v-toolbar-title>
          </slot>
          <v-spacer></v-spacer>
          <ButtonCustom
            v-if="fullscreen === true"
            :style="{
              backgroundColor: colorStatic.blue,
              borderColor: colorStatic.blue,
              color: colorStatic.white,
            }"
            icon
            @click="$emit('isFullScreen')"
          >
            <v-icon>{{ ICON_FULLSCREEN }}</v-icon>
          </ButtonCustom>
        </v-toolbar>
        <v-card-text class="p-4 dialog-body">
          <slot name="body"></slot>
        </v-card-text>
        <v-card-actions
          class="dialog-actions"
          v-if="typeDialog !== STATUS_DIALOG.DETAIL"
        >
          <v-form @submit.prevent="submit">
            <slot name="btn-submit">
              <ButtonCustom
                class="me-4"
                @click="resetForm"
                :style="{ backgroundColor: colorStatic.buttonGrey }"
                :iconPrepend="ICON_UNDO"
              >
                {{ t("button.reset") }}
              </ButtonCustom>
              <ButtonCustom
                class="me-4"
                type="submit"
                :style="{
                  backgroundColor: colorStatic.buttonGreen,
                  color: colorStatic.white,
                }"
                :iconPrepend="ICON_SAVE"
                :loading="loading"
              >
                {{ t("button.save") }}
              </ButtonCustom>
            </slot>
          </v-form>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ICON_UNDO, ICON_SAVE } from "@/app/core/icons_in_use";
import ButtonCustom from "../button/ButtonCustom.vue";
import { colorStatic } from "../../token/color";
import { useI18n } from "vue-i18n";
import { ICON_CLOSE, ICON_FULLSCREEN } from "@/app/core/icons_in_use";

enum STATUS_DIALOG {
  CREATE,
  DETAIL,
  EDIT,
  DELETE,
}
export default defineComponent({
  components: {
    ButtonCustom,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    isFullScreen: {
      type: Boolean,
      required: false,
    },
    fullscreen: {
      type: Boolean,
      default: true,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: false,
    },
    typeDialog: {
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["cancel", "submit", "reset", "isFullScreen"],

  setup(_, { emit }) {
    const { t } = useI18n();

    const submit = async () => {
      emit("submit");
    };
    const resetForm = async () => {
      emit("reset");
    };

    return {
      ICON_UNDO,
      ICON_SAVE,
      colorStatic,
      STATUS_DIALOG,
      ICON_CLOSE,
      ICON_FULLSCREEN,
      resetForm,
      t,
      submit,
    };
  },
});
</script>

<style scoped>
.dialog-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.dialog-body {
  flex: 1;
  overflow-y: auto;
  padding: 0px !important;
}

.dialog-actions {
  position: sticky;
  bottom: 0;
  background: white;
  z-index: 1;
  display: flex;
  justify-content: end;
  margin-right: 20px;
}
</style>
