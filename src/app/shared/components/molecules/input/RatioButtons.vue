<template>
  <div style="display: flex; justify-content: space-between">
    <slot name="label">
      <SubtitleTypography :classes="`pl-4 mb-1 ${labelClasses || ''}`">
        {{ label }} <span v-if="required" class="color-red"> (*) </span>
      </SubtitleTypography>
    </slot>
    <slot name="iconTooltip"></slot>
  </div>

  <v-radio-group
    :id="id"
    v-model="value"
    :error-messages="errorMessage || error"
    :inline="inline"
    :disabled="disabled"
    :readonly="readonly"
    @update:model-value="$emit('change', value)"
  >
    <template #prepend>
      <slot name="prepend">
        <v-icon v-if="prependIcon">
          {{ prependIcon }}
        </v-icon>
      </slot>
    </template>
    <template #append>
      <slot name="append">
        <v-icon v-if="appendIcon">
          {{ appendIcon }}
        </v-icon>
      </slot>
    </template>
    <v-radio
      v-for="(option, index) in options"
      :color="color"
      :key="index"
      :value="option.value"
      :label="option.label"
    >
      <template v-slot:label>
        <slot name="label-radio" :item="option">
          <SubtitleTypography
            :style="{ color: lableItemColor ?? colorStatic.black }"
          >
            {{ option.label }}
          </SubtitleTypography>
        </slot>
      </template>
    </v-radio>
  </v-radio-group>
</template>

<script lang="ts" , generic="T">
import { useField } from "vee-validate";
import { PropType, defineComponent } from "vue";
import SubtitleTypography from "../../atoms/text/SubtitleTypography.vue";
import { colorStatic } from "../../token/color";
import { ITypeRadio } from "../interfaces/ITypeRadio";
import * as yup from "yup";

const defineGenericComponent = <T,>() => {
  return defineComponent({
    name: "RadioButton",
    props: {
      id: {
        type: String,
        required: false,
      },
      options: {
        type: Array<ITypeRadio<T>>,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      required: {
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
      readonly: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      inline: {
        type: Boolean,
        required: false,
      },
      color: {
        type: String,
        required: false,
      },
      lableItemColor: {
        type: String,
        required: false,
      },
      defaultChecked: {
        type: null as unknown as Object as PropType<T | any>,
        required: false,
        default: undefined,
      },
      rules: {
        type: Object as PropType<yup.Schema>,
        required: false,
        default: undefined,
      },
      appendIcon: {
        type: String,
        required: false,
      },
      prependIcon: {
        type: String,
        required: false,
      },
    },
    components: { SubtitleTypography },
    emits: ["change"],
    setup(props) {
      const { value, errorMessage } = useField(props.name, props.rules, {
        initialValue: props.defaultChecked,
      });
      const { red } = colorStatic;

      return {
        value,
        errorMessage,
        colorStatic,
        red,
      };
    },
  });
};

export default defineGenericComponent();
</script>

<style scoped>
.color-red {
  color: v-bind(red);
}
</style>
