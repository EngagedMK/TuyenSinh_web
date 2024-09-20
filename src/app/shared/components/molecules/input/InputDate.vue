<template>
  <div style="display: flex; justify-content: space-between">
    <slot name="label">
      <SubtitleTypography :classes="`pl-4 mb-1 ${labelClasses || ''}`">
        {{ label }} <span v-if="required" class="color-red"> (*) </span>
      </SubtitleTypography>
    </slot>
    <slot name="iconTooltip"></slot>
  </div>

  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ props }">
      <v-text-field
        dense
        v-model="txtDateTime"
        variant="outlined"
        persistent-placeholder
        persistent-hint
        :readonly="true"
        :error-messages="errorMessage || error"
        :placeholder="placeholder"
        :class="inputClasses || null"
        :hide-details="hideDetails"
        v-bind="readonly ? undefined : props"
        append-inner-icon="mdi-calendar"
        :disabled="disabled"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="selectedDate"
      hide-actions
      title="Select Date"
      :color="dateColor"
      no-title
    >
      <template #actions>
        <v-btn :color="dateButton" @click="closeDialog"> Cancel </v-btn>
        <v-btn :color="dateButton" @click="saveDate"> Save </v-btn>
      </template>
    </v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import { useField } from "vee-validate";
import { PropType, defineComponent, ref, watch } from "vue";
import SubtitleTypography from "../../atoms/text/SubtitleTypography.vue";
import { colorStatic } from "../../token/color";
import { borderStatic } from "../../token/border";
import {
  formatDateDDMMYYY,
  convertUTCtoLocal,
  checkStringIsDateType,
} from "@/common/date";
import * as yup from "yup";

export default defineComponent({
  name: "InputDate",
  props: {
    modelValue: {
      type: Date,
      required: false,
    },
    id: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
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
    inputClasses: {
      type: String,
      required: false,
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
    readonly: {
      type: Boolean,
      default: false,
    },
    dateColor: {
      type: String,
      default: "primary",
    },
    dateButton: {
      type: String,
      default: "primary",
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
  setup(props, { emit }) {
    const { value, errorMessage } = useField(props.name, props.rules, {
      initialValue: props.defaultValue,
    });
    const { red, border } = colorStatic;
    const inputBorderRadius = borderStatic.input;
    const colorBorderInput = border.input;
    const colorBorderFocused = border.inputFocused;

    const menu = ref(false);
    // const selectedDate = ref(props.modelValue);
    const selectedDate = ref();
    const txtDateTime = ref("");

    watch(selectedDate, (newDate) => {
      if (formatDateDDMMYYY(newDate) !== txtDateTime.value) {
        txtDateTime.value = formatDateDDMMYYY(newDate);
        emit("modelValue", newDate);
        value.value = newDate?.toLocaleDateString() as string;
      } else if (!props.required) {
        emit("modelValue", newDate);
        value.value = newDate?.toLocaleDateString() as string;
      }
    });

    const closeDialog = () => {
      menu.value = false;
    };

    const saveDate = () => {
      watch(selectedDate, (newDate) => {
        if (formatDateDDMMYYY(newDate) !== txtDateTime.value) {
          txtDateTime.value = formatDateDDMMYYY(newDate);
          emit("modelValue", newDate);
          value.value = newDate?.toLocaleDateString() as string;
        } else if (!props.required) {
          emit("modelValue", newDate);
          value.value = newDate?.toLocaleDateString() as string;
        }
      });
      menu.value = false;
    };

    watch(
      () => props.defaultValue,
      (newValue) => {
        selectedDate.value = checkStringIsDateType(newValue ?? "");
      },
      { immediate: true },
    );

    watch(
      selectedDate,
      (newValue) => {
        if (newValue) {
          txtDateTime.value = convertUTCtoLocal(newValue);
        } else {
          txtDateTime.value = "";
        }
      },
      { immediate: true },
    );

    return {
      value,
      errorMessage,
      colorStatic,
      red,
      inputBorderRadius,
      colorBorderInput,
      colorBorderFocused,
      menu,
      selectedDate,
      txtDateTime,
      checkStringIsDateType,
      closeDialog,
      saveDate,
    };
  },
});
</script>

<style scoped>
.color-red {
  color: v-bind(red);
}
</style>
