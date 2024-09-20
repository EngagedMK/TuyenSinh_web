<script lang="ts">
import NavItem from '../NavItem/NavItem.vue';
import Icon from '../IconSet.vue';
import { defineComponent, PropType } from 'vue';
import { menu } from '../sidebarItem';

export default defineComponent({
  name: 'NavCollapse',
  components:{
    NavItem, Icon
  },
  props: {
    item: {
      type: Object as PropType<menu>,
      defaul: {} as menu
    },
    level: {
      type: Number,
    }
  }
})

</script>

<template>
  <!-- ---------------------------------------------- -->
  <!---Item Childern -->
  <!-- ---------------------------------------------- -->
  <v-list-group no-action>
    <!-- ---------------------------------------------- -->
    <!---Dropdown  -->
    <!-- ---------------------------------------------- -->
    <template v-slot:activator="{ props }">
      <v-list-item v-bind="props" :value="item?.title" rounded class="mb-1" color="secondary">
        <!---Icon  -->
        <template v-slot:prepend>
          <Icon :item="item?.icon" :level="level" />
        </template>
        <!---Title  -->
        <v-list-item-title class="mr-auto">{{ item?.title }}</v-list-item-title>
        <!---If Caption-->
        <v-list-item-subtitle v-if="item?.subCaption" class="text-caption mt-n1 hide-menu">
          {{ item?.subCaption }}
        </v-list-item-subtitle>
      </v-list-item>
    </template>
    <!-- ---------------------------------------------- -->
    <!---Sub Item-->
    <!-- ---------------------------------------------- -->
    <template v-for="(subitem, i) in item?.children" :key="i">
      <NavCollapse :item="subitem" v-if="subitem?.children" :level="level ? level + 1 : undefined" />
      <NavItem :item="subitem" :level="level ? level + 1 : undefined" v-else></NavItem>
    </template>
  </v-list-group>

  <!-- ---------------------------------------------- -->
  <!---End Item Sub Header -->
  <!-- ---------------------------------------------- -->
</template>
