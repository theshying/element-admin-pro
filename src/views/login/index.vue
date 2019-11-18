<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">请登录</h3>
      </div>
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
          >
           <span class="svg-container" slot="prefix">
              <svg-icon icon-class="user" />
          </span>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">

          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.enter.native="handleLogin">
           <span class="svg-container" slot="prefix">
              <svg-icon icon-class="password" />
          </span>
          </el-input>
        </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码至少包含六个字符'));
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                username: 'admin',
                password: '111111'
            },
            loginRules: {
                password: [{required: true, trigger: 'blur', validator: validatePassword}]
            },
            passwordType: 'password',
            capsTooltip: false,
            loading: false,
            showDialog: false,
            redirect: undefined,
            otherQuery: {}
        };
    },
    mounted() {
        if (this.loginForm.username === '') {
            this.$refs.username.focus();
        } else if (this.loginForm.password === '') {
            this.$refs.password.focus();
        }
    },
    methods: {

        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store.dispatch('doLogin', this.loginForm)
                        .then(() => {
                            this.$router.push({path: this.redirect || '/', query: this.otherQuery});
                            this.loading = false;
                        })
                        .catch((e) => {
                            console.log(e);
                            this.loading = false;
                        });
                } else {
                    console.error('error submit!!');
                    return false;
                }
            });
        },
    }
};
</script>

<style lang="less" scope>
@bgColor:#283443;
@light_gray:#fff;
@cursor: #fff;
@font-color: #fff;
/* reset element-ui css */
.login-container {
  background: @bgColor;
  min-height: 100vh;
  color: @font-color;
  display: flex;
  justify-content: center;
  .login-form{
    text-align: center;
    margin-top: 100px;
    width: 400px;

  }
}
</style>
