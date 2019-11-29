<template>
  <div class="setting-pannel">
    <el-drawer
      :visible.sync="visible"
      :append-to-body="true"
      :modal-append-to-body="true"
      size="300px"
    >
      <span slot="title">{{ $t('setting.name') }}</span>
      <div class="setting-pannel__content">
        <el-form 
          :model="formData" 
          label-width="200px" 
          label-position="left">
          <el-form-item :label="$t('setting.showLogo')">
            <el-switch
              v-model="formData.showLogo"/>
          </el-form-item>
          <el-form-item :label="$t('setting.mutliTab')">
            <el-switch
              v-model="formData.multiTab"/>
          </el-form-item>
          <el-form-item :label="$t('setting.fixHeader')">
            <el-switch
              v-model="formData.fixHeader"/>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
    <i 
      class="el-icon-setting" 
      @click="openSettingPannel"/>
  </div>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'SettingPannel',
    data() {
        return {
            visible: false,
            formData: {}
            
        }
    },
    computed: {
        ...mapGetters(['setting'])
    },
    
    watch: {
        formData: {
            handler(val) {
                this.setSetting(val);
            },
            deep: true
        }
    },
    created() {
        this.formData = this.setting;
        this.$set(this, 'formData', this.setting)
    },
    methods: {
        ...mapActions(['setSetting']),
        openSettingPannel() {
            this.visible = true;
        }
    },
}
</script>

<style lang="less" scoped>
@import  '~@/assets/style/variables.less';
.setting-pannel{
    position: fixed;
    right: 0;
    top: 25%;
    padding: 10px;
    border-radius: 10px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background: @color-primary;
    .el-icon-setting{
        font-size: 30px;
        color: white;
        animation:spin 3s linear 0s infinite; 
         &:hover{
           animation-play-state:paused;
           cursor: pointer;
        }
    }
    &__content{
        padding: 20px;
    }
   
}
@keyframes spin {
    from {
        transform: rotate(0deg)
    }
    to{
        transform: rotate(360deg)
    }
}

</style>