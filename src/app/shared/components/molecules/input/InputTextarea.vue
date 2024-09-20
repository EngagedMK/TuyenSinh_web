<template>
  <div style="display: flex; justify-content: space-between">
    <slot name="label">
      <SubtitleTypography :classes="`pl-4 mb-1 ${labelClasses || ''}`">
        {{ label }} <span v-if="required" class="color-red"> (*) </span>
      </SubtitleTypography>
    </slot>
    <slot name="iconTooltip"></slot>
  </div>
  <v-textarea
    :id="id"
    v-model="value"
    variant="outlined"
    :clearable="clearable"
    :auto-grow="autoGrow"
    :bg-color="bgColor"
    :counter="counter"
    :center-affix="true"
    :max-rows="maxRow"
    :rows="row"
    :readonly="readonly"
    :disabled="disabled"
    :placeholder="placeholder"
    :error-messages="errorMessage || error"
  >
    <template #prepend-inner>
      <slot name="prepend-inner">
        <v-icon v-if="prependInnerIcon">
          {{ prependInnerIcon }}
        </v-icon>
      </slot>
    </template>
    <template #prepend>
      <slot name="prepend-icon">
        <v-icon v-if="prependIcon">
          {{ prependIcon }}
        </v-icon>
      </slot>
    </template>
    <template #append>
      <slot name="append-icon">
        <v-icon v-if="appendIcon">
          {{ appendIcon }}
        </v-icon>
      </slot>
    </template>
    <template #append-inner>
      <slot name="append-inner">
        <v-icon v-if="appendInnerIcon" @click="$emit('click:append-inner')">
          {{ appendInnerIcon }}
        </v-icon>
      </slot>
    </template>
  </v-textarea>
</template>

<script lang="ts">
import { useField } from "vee-validate";
import { defineComponent, PropType } from "vue";
import SubtitleTypography from "../../atoms/text/SubtitleTypography.vue";
import { colorStatic } from "../../token/color";
import { borderStatic } from "../../token/border";
import * as yup from "yup";

export default defineComponent({
  name: "InputTextarea",
  props: {
    id: {
      type: String,
      required: false,
    },
    counter: {
      type: String || Number,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },

    autoGrow: {
      type: Boolean,
      required: false,
    },
    bgColor: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    maxRow: {
      type: Number || String,
    },
    row: {
      type: Number || String,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    label: {
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
    prependInnerIcon: {
      type: String,
      required: false,
    },
    appendInnerIcon: {
      type: String,
      required: false,
    },
    rules: {
      type: Object as PropType<yup.Schema>,
      required: false,
      default: undefined,
    },
    defaultValue: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  components: { SubtitleTypography },
  setup(props) {
    const { value, errorMessage } = useField(props.name, props.rules, {
      initialValue: props.defaultValue,
    });
    const { red, border } = colorStatic;
    const inputBorderRadius = borderStatic.input;
    const colorBorderInput = border.input;
    const colorBorderFocused = border.inputFocused;
    return {
      value,
      errorMessage,
      colorStatic,
      red,
      inputBorderRadius,
      colorBorderInput,
      colorBorderFocused,
    };
  },
});
</script>

<style scoped>
.color-red {
  color: v-bind(red);
}
</style>
