<template>
  <el-menu 
    class="navbar" 
    mode="horizontal">
    <div 
      :class="{'hamburger--active': sidebar.opened}" 
      class="hamburger-container">
      <i 
        class="icon-expand" 
        @click="toggleSideBar" />
    </div>
    <div class="right-menu">
      <lang-select class="international right-menu-item"/>
      <el-tooltip 
        :content="$t('navbar.theme')" 
        effect="dark" 
        placement="bottom">
        <theme-picker class="theme-switch right-menu-item"/>
      </el-tooltip>
      <el-dropdown 
        class="avatar-container right-menu-item" 
        trigger="click">
        <div class="avatar-wrapper">
          <img 
            :src="userInfo.avatar+'?imageView2/1/w/80/h/80'" 
            class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span 
              style="display:block;" 
              @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import {mapGetters} from 'vuex';
import LangSelect from '@/components/LangSelect';
import ThemePicker from '@/components/ThemePicker';

export default {
    components: {
        LangSelect,
        ThemePicker
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'userInfo',
        ])
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('toggleSideBar');
        },
        logout() {
            this.$store.dispatch('fedLogOut').then(() => {
                location.reload();// In order to re-instantiate the vue-router object to avoid bugs
            });
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="less" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger--active{
      transform:rotate(180deg);
  }
  .hamburger-container {
    float: left;
    padding: 0 10px;
    transition: all .3s ease-in;
    &:hover{
      background: #f3f2f2;
      cursor: pointer;
    }
    &:focus{
      outline: none;
    }
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
