<template>
  <div 
    :class="classObj" 
    class="app-wrapper">
    <div 
      v-if="device==='mobile'&&sidebar.opened" 
      class="drawer-bg" 
      @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <tags-view v-if="setting.multiTab"/>
      <app-main/>
      <footer-bar/>
      <setting-pannel/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {Navbar, Sidebar, AppMain, TagsView, FooterBar} from './components';
import SettingPannel from '@/components/SettingPannel';
import ResizeMixin from './mixin/ResizeHandler';

export default {
    name: 'Layout',
    components: {
        Navbar,
        Sidebar,
        AppMain,
        TagsView,
        FooterBar,
        SettingPannel
    },
    mixins: [ResizeMixin],
    computed: {
      ...mapGetters(['setting', 'sidebar', 'device']),
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile'
            };
        }
    },
    methods: {
        handleClickOutside() {
            this.$store.dispatch('closeSideBar', {withoutAnimation: false});
        },
    }
};
</script>

<style  lang="less" scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
