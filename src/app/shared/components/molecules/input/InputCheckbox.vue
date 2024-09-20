<template>
  <div style="display: flex; justify-content: space-between">
    <slot name="label">
      <SubtitleTypography :classes="`pl-4 mb-1 ${labelClasses || ''}`">
        {{ label }} <span v-if="required" class="color-red"> (*) </span>
      </SubtitleTypography>
    </slot>
    <slot name="iconTooltip"></slot>
  </div>
  <v-checkbox
    v-model="value"
    :error-messages="errorMessage || error"
    @change="$emit('change')"
    :disabled="disabled"
    :readonly="readonly"
    :color="color"
    :label="label"
  >
    <template #label>
      <slot name="label-checkbox">
        <SubtitleTypography>{{ labelCheckbox }}</SubtitleTypography>
      </slot>
    </template>
    <template #prepend>
      <slot name="prependIcon">
        <v-icon>{{ prependIcon }}</v-icon>
      </slot>
    </template>
    <template #append>
      <slot name="appendIcon">
        <v-icon>{{ appendIcon }}</v-icon>
      </slot>
    </template>
  </v-checkbox>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SubtitleTypography from "../../atoms/text/SubtitleTypography.vue";
import { useField } from "vee-validate";
import { colorStatic } from "../../token/color";
export default defineComponent({
  name: "InputCheckbox",
  inheritAttrs: false,
  components: { SubtitleTypography },
  props: {
    label: {
      type: String,
      required: false,
    },
    labelCheckbox: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    color: {
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
    prependIcon: {
      type: String,
      required: false,
    },
    appendIcon: {
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
  },
  setup(props) {
    const { value, errorMessage } = useField(props.name);
    const { red } = colorStatic;
    return { value, errorMessage, red };
  },
});
</script>

<style scoped>
.color-red {
  color: v-bind(red);
}
</style>
