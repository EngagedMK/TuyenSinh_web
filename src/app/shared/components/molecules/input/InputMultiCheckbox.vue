<template>
  <div style="display: flex; justify-content: space-between">
    <slot name="label">
      <SubtitleTypography :classes="`pl-4 mb-1 ${labelClasses || ''}`">
        {{ label }} <span v-if="required" class="color-red"> (*) </span>
      </SubtitleTypography>
    </slot>
    <slot name="iconTooltip"></slot>
  </div>
  <div :class="isRow ? 'checkbox-container' : ''">
    <v-checkbox
      v-for="(option, index) in options"
      :hide-details="isRow ? index !== 0 : index !== options.length - 1"
      :key="index"
      :value="option.value"
      :label="option.label"
      :color="color"
      multiple
      :disabled="disabled"
      :readonly="readonly"
      :error-messages="errorMessage || error"
      v-model="value"
      @change="$emit('change', value)"
    >
      <template #label>
        <slot name="label-checkbox" :item="option">
          <SubtitleTypography
            :style="{ color: colorLabel ?? colorStatic.black }"
          >
            {{ option.label }}
          </SubtitleTypography>
        </slot>
      </template>
    </v-checkbox>
  </div>
</template>

<script lang="ts" generic="T">
import { PropType, defineComponent } from "vue";
import { ITypeCheckbox } from "@/app/shared/components/molecules/interfaces/ITypeCheckbox";
import { useField } from "vee-validate";
import SubtitleTypography from "../../atoms/text/SubtitleTypography.vue";
import { colorStatic } from "../../token/color";
import * as yup from "yup";
const defineGenericComponent = <T,>() => {
  return defineComponent({
    components: { SubtitleTypography },
    props: {
      defaultChecked: {
        type: Array<T>,
        required: false,
        default: undefined,
      },
      rules: {
        type: Object as PropType<yup.Schema>,
        required: false,
        default: undefined,
      },
      options: {
        type: Array<ITypeCheckbox<T>>,
        required: true,
      },
      error: {
        type: String,
        required: false,
      },
      color: {
        type: String,
        required: false,
      },
      label: {
        type: String,
        required: false,
      },
      name: {
        type: String,
        required: true,
      },
      labelClasses: {
        type: String,
        required: false,
      },
      required: {
        type: Boolean,
        default: false,
      },
      isRow: {
        type: Boolean,
        default: false,
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      colorLabel: {
        type: String,
        required: false,
      },
    },
    inheritAttrs: false,

    setup(props) {
      const { value, errorMessage } = useField(props.name, props.rules, {
        initialValue: props.defaultChecked,
      });
      const { red } = colorStatic;
      return {
        value,
        errorMessage,
        red,
        colorStatic,
      };
    },
  });
};
export default defineGenericComponent();
</script>

<style scoped>
.checkbox-container {
  display: flex;
  align-items: center;
}
.color-red {
  color: v-bind(red);
}
</style>
