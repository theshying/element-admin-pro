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
      style="height: 100%;border-right: 1px solid #cccccc;">
      <el-menu
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
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

export default {
    components: {SidebarItem},
    computed: {
        ...mapGetters([
            'permission_routers',
            'sidebar'
        ]),
        isCollapse() {
            return !this.sidebar.opened;
        }
    }
};
</script>
<style lang="less" scoped>
.sidebar-logo-link{
  height: 60px;
  display: flex !important;
  background-image: linear-gradient(180deg,#495aff,#0acffe 100%,#04befe 0);
  box-sizing: border-box;
  padding: 8px;
  .sidebar-logo__left{
    width: 43px;
  }
  .sidebar-logo__right{
    margin: auto;
    font-size: 22px;
    color: white;
    white-space: nowrap;
  }
}
</style>
