<template>
  <div>
    <router-link 
      key="collapse" 
      class="sidebar-logo-link" 
      to="/">
      <img 
        src="~@/assets/images/logo-left.png" 
        class="sidebar-logo__left" >
      <h1 class="sidebar-logo__right">{{ $t('app.name') }}</h1>
    </router-link>
    <el-scrollbar 
      wrap-class="scrollbar-wrapper" 
      style="height: 100%;">
      <el-menu
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        mode="vertical"
      >
        <sidebar-item 
          v-for="route in permission_routers" 
          :key="route.name" 
          :item="route" 
          :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import SidebarItem from './SidebarItem';
import variables from '@/assets/style/variables.less';

export default {
    components: {SidebarItem},
    data() {
      return {
        variables
      }
    },
    computed: {
        ...mapGetters([
            'permission_routers',
            'sidebar'
        ]),
        isCollapse() {
            return !this.sidebar.opened;
        }
    },
};
</script>
<style lang="less" scoped>
@import  '~@/assets/style/variables.less';
.sidebar-logo-link{
  height: 60px;
  display: flex !important;
  background: @menuBg;
  box-sizing: border-box;
  .sidebar-logo__left{
    width: 50px;
    padding: 7px;
    box-sizing: border-box;
  }
  .sidebar-logo__right{
    margin: auto 10px;
    font-size: 22px;
    color: white;
    white-space: nowrap;
  }
}
</style>
