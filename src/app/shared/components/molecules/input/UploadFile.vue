<template>
  <div style="display: flex; justify-content: space-between">
    <slot name="label">
      <SubtitleTypography :classes="`pl-4 mb-1 ${labelClasses || ''}`">
        {{ labelText }} <span v-if="required" class="color-red"> (*) </span>
      </SubtitleTypography>
    </slot>
    <slot name="iconTooltip"></slot>
  </div>

  <v-file-input
    :id="id"
    v-model="value"
    variant="outlined"
    persistent-placeholder
    prepend-icon=""
    :chips="chips"
    :multiple="multiple"
    :show-size="showSize"
    :accept="accept"
    :error-messages="errorMessage || error"
    :class="inputClasses || null"
    :hide-details="hideDetails"
    :disabled="disabled"
    :readonly="readonly"
  >
    <template #prepend-inner>
      <slot name="prepend-inner">
        <v-icon v-if="prependIcon">
          {{ prependIcon }}
        </v-icon>
      </slot>
    </template>
    <template #append-inner>
      <slot name="append-inner">
        <v-icon v-if="appendIcon" @click="$emit('click:append-inner')">
          {{ appendIcon }}
        </v-icon>
      </slot>
    </template>

    <template v-slot:selection="{ fileNames }">
      <template v-for="fileName in fileNames" :key="fileName">
        <v-chip :size="size" label :color="color" class="me-2">
          {{ fileName }}
        </v-chip>
      </template>
    </template>
  </v-file-input>
</template>

<script lang="ts">
import { useField } from "vee-validate";
import { PropType, defineComponent } from "vue";
import SubtitleTypography from "../../atoms/text/SubtitleTypography.vue";
import { colorStatic } from "../../token/color";
import { borderStatic } from "../../token/border";
import * as yup from "yup";

export default defineComponent({
  name: "InputFile",
  props: {
    rules: {
      type: Object as PropType<yup.Schema>,
      required: false,
      default: undefined,
    },
    defaultValue: {
      type: Array<File>,
      required: false,
      default: undefined,
    },
    id: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },

    labelText: {
      type: String,
      required: false,
    },
    error: {
      type: String,
      required: false,
    },
    labelClasses: {
      type: String,
      required: false,
    },
    inputClasses: {
      type: String,
      required: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    appendIcon: {
      type: String,
      required: false,
    },
    prependIcon: {
      type: String,
      required: false,
    },
    chips: {
      type: Boolean,
      required: false,
    },
    multiple: {
      type: Boolean,
      reqired: false,
    },
    showSize: {
      type: Boolean,
      reqired: false,
    },
    accept: {
      type: String,
      required: false,
    },
    isImage: {
      type: Boolean,
      required: false,
    },
    clearable: {
      type: Boolean,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
  },
  components: { SubtitleTypography },
  setup(props) {
    const { value, errorMessage } = useField<File[]>(props.name, props.rules, {
      initialValue: props.defaultValue,
    });
    const { red, border } = colorStatic;
    const inputBorderRadius = borderStatic.input;
    const colorBorderInput = border.input;
    const colorBorderFocused = border.inputFocused;

    //Note about accept type:
    //Image: image/*
    //Pdf: application/pdf
    //Word: application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint
    //Excel: .xls, .xlsx, .csv || application/vnd.ms-excel
    //Powerpoint: application/vnd.ms-powerpoint

    return {
      value,
      errorMessage,
      colorStatic,
      red,
      inputBorderRadius,
      colorBorderInput,
      colorBorderFocused,
      // getHinhAnh,
    };
  },
});
</script>

<style scoped>
.color-red {
  color: v-bind(red);
}
</style>
