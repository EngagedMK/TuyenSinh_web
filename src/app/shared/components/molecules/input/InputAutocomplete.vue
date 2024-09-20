<template>
  <div style="display: flex; justify-content: space-between">
    <slot name="label">
      <SubtitleTypography :classes="`pl-4 mb-1 ${labelClasses || ''}`">
        {{ label }} <span v-if="required" class="color-red"> (*) </span>
      </SubtitleTypography>
    </slot>
    <slot name="iconTooltip"></slot>
  </div>
  <div>
    <v-autocomplete
      v-model="value"
      :items="items"
      variant="outlined"
      :density="'default'"
      :clearable="clearable"
      :chips="chips"
      :disabled="disabled"
      :readonly="readonly"
      :class="inputClasses"
      :error-messages="errorMessage || error"
      :closable-chips="closeableChips"
      :multiple="multiple"
      :placeholder="placeholder"
      :color="color ?? colorStatic.black"
      :hide-selected="hideSelected"
      :bg-color="bgColor"
      :base-color="baseColor ?? colorStatic.black"
      :prepend-inner-icon="prependInnerIcon"
      :item-value="itemValue"
      :item-title="itemTitle"
      @update:model-value="$emit('change', value)"
    >
      <template v-slot:chip="{ props, item }">
        <v-chip
          :class="{ customChip: item.title === customChip }"
          v-bind="props"
        >
          <slot name="text-chip" :item="item">
            <TextCaption>{{ item.title }}</TextCaption>
          </slot>
        </v-chip>
      </template>

      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props">
          <template #title>
            <slot name="text-item" :item="item">
              <TextCaption>{{ item.title }}</TextCaption>
            </slot>
          </template>
        </v-list-item>
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
    </v-autocomplete>
  </div>
</template>

<script lang="ts">
import { useField } from "vee-validate";
import { PropType, defineComponent } from "vue";
import { colorStatic } from "../../token/color";
import SubtitleTypography from "../../atoms/text/SubtitleTypography.vue";
import TextCaption from "../../atoms/text/TextCaption.vue";
import { borderStatic } from "../../token/border";
import * as yup from "yup";

const defineGenericComponent = <T,>() => {
  return defineComponent({
    name: "InputCheckbox",
    components: {
      SubtitleTypography,
      TextCaption,
    },
    props: {
      label: {
        type: String,
        required: true,
      },
      itemValue: {
        type: String,
        required: false,
      },
      itemTitle: {
        type: String,
        required: false,
      },
      items: {
        type: Array<T>,
        required: true,
      },
      placeholder: {
        type: String,
        required: false,
      },
      inputClasses: {
        type: String,
        required: false,
      },
      customChip: {
        type: String,
        required: false,
      },
      prependInnerIcon: {
        type: String,
        required: false,
      },
      bgColor: {
        type: String,
        required: false,
      },
      closeableChips: {
        type: Boolean,
        default: false,
      },
      required: {
        type: Boolean,
        default: false,
      },
      multiple: {
        type: Boolean,
        default: false,
      },
      hideSelected: {
        type: Boolean,
        default: false,
      },
      chips: {
        type: Boolean,
        default: false,
      },
      clearable: {
        type: Boolean,
        default: false,
      },
      color: {
        type: String,
        required: false,
      },
      baseColor: {
        type: String,
        required: false,
      },
      labelClasses: {
        type: String,
        required: false,
      },
      name: {
        type: String,
        required: true,
      },
      error: {
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
      colorChip: {
        type: String,
        required: false,
      },
      item: {
        type: String,
        required: false,
      },
      appendIcon: {
        type: String,
        required: false,
      },
      prependIcon: {
        type: String,
        required: false,
      },
      rules: {
        type: Object as PropType<yup.Schema>,
        required: false,
        default: undefined,
      },
      defaultValue: {
        type: null as unknown as Object as PropType<T | any>,
        required: false,
        default: undefined,
      },
    },
    emits: ["change"],
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
        red,
        colorStatic,
        inputBorderRadius,
        colorBorderInput,
        colorBorderFocused,
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
.customChip {
  background-color: v-bind(colorChip) !important;
}
</style>
