<template>
  <div class="page-container">
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="50"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in layout"
        :key="item.i"
        :i="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
      >
        <component :is="item.component" />
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import widgets from './widgets'
export default {
    name: "Dashboard",
    components: {
        GridLayout: VueGridLayout.GridLayout,
        GridItem: VueGridLayout.GridItem,
        ...widgets
    },
    data() {
      return {
        layout: []
      }
    },
    created(){
      this.getDashboardLayout();
    },
    methods: {
      getDashboardLayout() {
        this.$client.getDashboardLayout().then(({data}) => {
          this.layout = data || [];
        })
      }
    },
   
};
</script>
<style lang="less" scope>
.walk-page {
    background: #e3e3e3;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
