<template>
  <slot name="label">
    <SubtitleTypography :classes="`pl-4 mb-1 ${labelClasses || ''}`">
      {{ label }} <span v-if="required" class="color-red"> (*) </span>
    </SubtitleTypography>
  </slot>

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
        class="mx-4"
        :error-messages="errorMessage || error"
        :placeholder="placeholder"
        :class="inputClasses || null"
        :hide-details="hideDetails"
        v-bind="readonly ? undefined : props"
        :prepend-inner-icon="ICON_CALENDAR"
        :disabled="disabled"
        :clearable="true"
        @click:clear="clearValue"
      ></v-text-field>
    </template>
    <v-tabs v-model="tab" bg-color="primary" fixed-tabs>
      <v-tab value="one">
        <v-icon :color="colorStatic.white">{{ ICON_CALENDAR }}</v-icon>
      </v-tab>
      <v-tab value="two">
        <v-icon :color="colorStatic.white">{{ ICON_CLOCK_TIME }}</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="one">
        <v-date-picker
          v-model="selectedDate"
          hide-actions
          :color="dateColor"
          no-title
        ></v-date-picker>
      </v-tabs-window-item>
      <v-tabs-window-item value="two">
        <v-time-picker
          v-model="selectedTime"
          full-width
          format="24hr"
        ></v-time-picker>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-menu>
</template>

<script lang="ts">
import { useField } from "vee-validate";
import { PropType, defineComponent, ref, watch } from "vue";
import SubtitleTypography from "../../atoms/text/SubtitleTypography.vue";
import { colorStatic } from "../../token/color";
import { borderStatic } from "../../token/border";
import * as yup from "yup";
import { ICON_CALENDAR, ICON_CLOCK_TIME } from "@/app/core/icons_in_use";
import {
  formatDateTimeDDMMYYYYHHMM,
  convertUTCToLocalTime,
  convertUTCToLocalDate,
} from "@/common/date";
export default defineComponent({
  name: "InputDateTime",
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
      type: [String, Date],
      required: false,
      default: undefined,
    },
  },
  inheritAttrs: false,
  components: { SubtitleTypography },
  setup(props, { emit }) {
    const { value, errorMessage } = useField(props.name, props.rules, {
      initialValue: props.defaultValue,
    });
    const { red, border } = colorStatic;
    const inputBorderRadius = borderStatic.input;
    const colorBorderInput = border.input;
    const colorBorderFocused = border.inputFocused;
    const tab = ref("one");
    const menu = ref(false);
    const selectedDate = ref();
    const selectedTime = ref("");
    const txtDateTime = ref(
      props.defaultValue
        ? formatDateTimeDDMMYYYYHHMM(new Date(props.defaultValue))
        : null,
    );

    if (props.defaultValue) {
      selectedDate.value = convertUTCToLocalDate(props.defaultValue + "");
      selectedTime.value = convertUTCToLocalTime(props.defaultValue + "");
    }

    watch(
      () => props.defaultValue,
      (newVal) => {
        if (newVal) {
          txtDateTime.value = formatDateTimeDDMMYYYYHHMM(new Date(newVal));
          selectedDate.value = convertUTCToLocalDate(newVal + "");
          selectedTime.value = convertUTCToLocalTime(newVal + "");
        }
      },
    );

    watch(selectedDate, (newDate) => {
      if (newDate) {
        updateDateTime();
        tab.value = "two";
      }
    });

    watch(selectedTime, (newTime) => {
      if (newTime) {
        updateDateTime();
        closeDialog();
      }
    });

    const updateDateTime = () => {
      const combinedDate = new Date(selectedDate.value!.getTime());
      const [hours, minutes] = selectedTime.value.split(":");
      combinedDate.setHours(Number(hours), Number(minutes));
      txtDateTime.value = formatDateTimeDDMMYYYYHHMM(combinedDate);
      emit("update:modelValue");
      value.value = combinedDate;
    };

    const clearValue = () => {
      selectedDate.value = null;
      selectedTime.value = "";
      value.value = "";
      txtDateTime.value = null;
      emit("update:modelValue", null);
    };

    const closeDialog = () => {
      menu.value = false;
      tab.value = "one";
    };

    return {
      value,
      errorMessage,
      colorStatic,
      red,
      inputBorderRadius,
      colorBorderInput,
      colorBorderFocused,
      menu,
      tab,
      selectedDate,
      txtDateTime,
      selectedTime,
      ICON_CALENDAR,
      ICON_CLOCK_TIME,
      closeDialog,
      clearValue,
    };
  },
});
</script>

<style scoped>
.color-red {
  color: var(--v-bind(red));
}
.v-tab.v-btn {
  color: white !important;
}
</style>
