<template>
  <v-dialog
    :model-value="value"
    :max-width="width"
    v-if="typeDialog === STATUS_DIALOG.DELETE"
  >
    <v-card>
      <v-toolbar :color="colorStatic.blue" dark>
        <v-btn icon dark @click="$emit('cancel')">
          <v-icon>{{ ICON_CLOSE }}</v-icon>
        </v-btn>
        <v-toolbar-title>
          {{ t("toolbarTitle.delete", { name: name }) }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <div class="text-center">
          <H2Typography>
            {{ t("delete.question", { name: name }) }}
          </H2Typography>
        </div>
        <form @submit.prevent="submit">
          <slot name="body"></slot>
          <v-card-actions class="justify-end">
            <ButtonCustom
              :style="{ backgroundColor: colorStatic.buttonGrey }"
              variant="text"
              @click="cancel"
              iconPrepend="mdi-cancel"
            >
              {{ t("button.cancel") }}
            </ButtonCustom>
            <slot name="btn-submit">
              <ButtonCustom
                :style="{
                  backgroundColor: colorStatic.buttonGreen,
                  color: colorStatic.white,
                }"
                variant="text"
                type="submit"
                iconPrepend="mdi-checkbox-marked-circle-outline"
              >
                {{ t("button.accept") }}
              </ButtonCustom>
            </slot>
          </v-card-actions>
        </form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ButtonCustom from "../button/ButtonCustom.vue";
import { colorStatic } from "../../token/color";
import { useI18n } from "vue-i18n";
import H2Typography from "../../atoms/text/H2Typography.vue";
import { ICON_CLOSE } from "@/app/core/icons_in_use";
enum STATUS_DIALOG {
  CREATE,
  DETAIL,
  EDIT,
  DELETE,
}
export default defineComponent({
  components: {
    ButtonCustom,
    H2Typography,
  },
  props: {
    name: {
      type: String,
      required: false,
    },
    value: {
      type: Boolean,
      required: true,
    },
    typeDialog: {
      required: false,
    },
    width: {
      type: String,
      required: false,
      default: "600",
    },
  },
  emits: {
    cancel: () => true,
    submit: () => true,
  },
  setup(_, { emit }) {
    const { t } = useI18n();
    const cancel = async () => {
      emit("cancel");
    };
    const submit = async () => {
      emit("submit");
    };
    return {
      colorStatic,
      STATUS_DIALOG,
      ICON_CLOSE,
      cancel,
      t,
      submit,
    };
  },
});
</script>

<style scoped></style>
