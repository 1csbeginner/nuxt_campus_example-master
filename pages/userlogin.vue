<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <div class="login-logo">
        <img src="@/assets/images/dzlogo.png" alt="logo"/>
      </div>
      <h3 class="title">校园信息墙</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
          <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon
            slot="prefix"
            icon-class="password"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon
            slot="prefix"
            icon-class="validCode"
            class="el-input__icon input-icon"
          />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: right">
          <router-link class="link-type" :to="'/register'"
            >立即注册</router-link
          >
        </div>
      </el-form-item>
    </el-form>
    <!-- 底部 -->
    <div class="el-login-footer">
      <span>上海理工大学软件协同第八小组</span>
    </div>
  </div>
</template>

<script>
import cookie from "js-cookie";
import userInfoApi from "@/api/userInfo";
import { getCodeImg, login } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";

export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        code: "",
        uuid: "",
      },
      codeUrl: "",
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" },
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }],
      },
      loading: false,
      // 验证码开关
      captchaEnabled: true,
    };
  },
  created() {
    if (getToken() !== undefined) {
      this.$router.push("/");
    } else if (this.$route.query.id != "") {
      if (this.$route.query.id == 1) {
        this.$message.error("请先登录！");
      } else if (this.$route.query.id == 2) {
        this.$message.success("修改成功!请登录!");
      }
      this.$router.push("/userlogin");
    }
    this.getCode();
  },
  methods: {
    //获取验证码
    getCode() {
      getCodeImg().then((res) => {
        this.captchaEnabled =
          res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaEnabled) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    // 用户登录
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          //登录接口
          login(this.loginForm)
            .then((response) => {
              // 登录成功 设置cookie
              this.setCookies(response);

              //重新加载
              window.location.reload();
            })
            .catch((response) => {
              this.loading = false;
              if (this.captchaEnabled) {
                this.getCode();
              }
            });
        }
      });
    },
    //设置COOKIE
    setCookies(res) {
      setToken(res.token);
    },
  },
};
</script>

<style>
.login {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  padding-right: 50px;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.7);
  width: 400px;
  height: 800px;
  padding: 25px 25px 5px 25px;
}
.el-input {
  height: 38px;
}
.el-input input {
  height: 38px;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;
}
.login-code img {
  cursor: pointer;
  vertical-align: middle;
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
.login-logo {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  margin-bottom: 20px; /* 图片与标题之间的间距 */
}

.login-logo img {
  max-width: 200px; /* 设置图片最大宽度 */
  height: 50px; /* 保持图片比例 */
  width: 200px;
}
</style>
