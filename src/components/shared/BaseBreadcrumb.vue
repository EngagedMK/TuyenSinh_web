<script lang="ts">
import { defineComponent } from "vue";
import { ChevronRightIcon, HomeIcon } from "vue-tabler-icons";

type Breadcrumb = {
  title: string;
  disabled: boolean;
  href: string;
};

export default defineComponent({
  name: "BaseBreadCrumb",
  props: {
    title: {
      type: String,
    },
    breadcrumbs: {
      type: Array as () => Breadcrumb[],
    },
    icon: {
      type: String,
    },
  },
  setup() {
    return {
      ChevronRightIcon,
      HomeIcon
    };
  },
});
// const props = defineProps({
//   title: String,
//   breadcrumbs: Array as () => Breadcrumb[],
//   icon: String
// });
</script>

// ===============================|| Theme Breadcrumb
||=============================== //
<template>
  <v-row class="page-breadcrumb mb-1 mt-1">
    <v-col cols="12" md="12">
      <v-card variant="flat" class="px-4 py-3">
        <v-row no-gutters class="align-center">
          <v-col md="5">
            <h3 class="text-h3">{{ title }}</h3>
          </v-col>

          <v-col md="7" sm="12" cols="12">
            <v-breadcrumbs
              :items="breadcrumbs"
              class="text-h5 justify-md-end pa-1"
            >
              <template v-slot:divider>
                <div class="d-flex align-center">
                  <ChevronRightIcon size="17" />
                </div>
              </template>
              <template v-slot:prepend>
                <HomeIcon class="text-secondary mr-2" size="17"/>
                <div class="d-flex align-center">
                  <ChevronRightIcon size="17" />
                </div>
              </template>
            </v-breadcrumbs>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss">
.page-breadcrumb {
  .v-toolbar {
    background: transparent;
  }
}
</style>
