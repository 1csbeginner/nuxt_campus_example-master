<template>
  <div class="header-container">
    <div class="wrapper">
      <!-- logo -->
      <el-row>
        <el-col :xs="4" :sm="6">
          <div style="text-align: right; margin-top: 10px">
            <router-link :to="{ name: 'index' }">
              <img
                src="~assets/images/bt.png"
                alt="网站Logo"
                width="180"
                height="35"
              />
            </router-link>
          </div>
        </el-col>

        <el-col :xs="15" :sm="13">
          <div style="display: inline-block; text-align: center">
          </div>
        </el-col>

        <el-col :xs="5" :sm="5">
          <div style="font-weight: bold; text-align: left; padding-top: 10px">
            <router-link :to="{ name: 'userlogin' }">
              <div v-if="userName == '' && this.$route.path != '/userlogin'">
                <span class="sad">登录/注册</span>
              </div>
            </router-link>
            <el-dropdown
              v-if="userName != ''"
              style="margin-top: 0px; margin-left: 4px"
            >
              <span class="el-dropdown-link">
                <el-avatar
                  v-if="uImages != ''"
                  shape="circle"
                  :size="35"
                  :src="handleCampusUrl(uImages)"
                ></el-avatar>
                <i class="el-icon-caret-bottom" />
              </span>
              <el-dropdown-menu class="user-name-wrapper" slot="dropdown">
                <span @click="profile()">
                  <el-dropdown-item
                    command="/User/edit"
                    style="font-weight: bolder"
                  >
                    个人
                    <svg
                      t="1638274029049"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="2368"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M950.633412 155.602824H73.366588A73.456941 73.456941 0 0 0 0 228.969412v561.031529a73.441882 73.441882 0 0 0 73.366588 73.366588h877.266824A73.441882 73.441882 0 0 0 1024 790.000941V228.969412a73.456941 73.456941 0 0 0-73.366588-73.366588zM993.882353 790.000941a43.294118 43.294118 0 0 1-43.248941 43.248941H73.366588A43.294118 43.294118 0 0 1 30.117647 790.000941V228.969412a43.294118 43.294118 0 0 1 43.248941-43.248941h877.266824A43.294118 43.294118 0 0 1 993.882353 228.969412v561.031529z"
                        p-id="2369"
                        fill="#515151"
                      ></path>
                      <path
                        d="M150.362353 589.718588c34.063059 12.016941 83.215059 15.224471 106.902588 15.224471 25.825882 0 76.378353-4.186353 110.095059-15.841883 16.850824-6.460235 20.389647-17.468235 20.389647-25.569882 0-59.964235-41.140706-110.366118-96.632471-124.822588 23.552-11.956706 39.875765-36.156235 39.875765-64.316235 0-39.905882-32.466824-72.387765-72.387765-72.387765s-72.387765 32.466824-72.387764 72.387765c0 28.16 16.338824 52.359529 39.875764 64.316235-55.491765 14.471529-96.632471 64.858353-96.63247 124.822588 0.030118 16.353882 11.670588 21.865412 20.901647 26.187294z m50.928941-215.326117c0-31.608471 25.720471-57.328941 57.328941-57.328942s57.328941 25.720471 57.328941 57.328942-25.720471 57.328941-57.328941 57.328941-57.328941-25.735529-57.328941-57.328941z m57.328941 75.068235c62.900706 0 114.070588 51.169882 114.070589 114.070588 0 3.659294-1.28 7.890824-10.480942 11.429647-31.503059 10.872471-81.091765 14.923294-104.944941 14.923294-22.723765 0-69.737412-3.026824-101.180235-14.08-9.712941-4.592941-11.550118-6.550588-11.550118-12.272941 0.015059-62.900706 51.184941-114.070588 114.085647-114.070588zM451.764706 328.779294c0 4.141176 6.776471 7.529412 15.058823 7.529412h391.529412c8.282353 0 15.058824-3.388235 15.058824-7.529412s-6.776471-7.529412-15.058824-7.529412H466.823529c-8.282353 0-15.058824 3.388235-15.058823 7.529412zM451.764706 449.249882c0 4.141176 6.776471 7.529412 15.058823 7.529412h391.529412c8.282353 0 15.058824-3.388235 15.058824-7.529412s-6.776471-7.529412-15.058824-7.529411H466.823529c-8.282353 0-15.058824 3.388235-15.058823 7.529411zM451.764706 569.720471c0 4.141176 6.776471 7.529412 15.058823 7.529411h391.529412c8.282353 0 15.058824-3.388235 15.058824-7.529411s-6.776471-7.529412-15.058824-7.529412H466.823529c-8.282353 0-15.058824 3.388235-15.058823 7.529412zM135.529412 690.191059c0 4.141176 6.776471 7.529412 15.058823 7.529412h707.764706c8.282353 0 15.058824-3.388235 15.058824-7.529412s-6.776471-7.529412-15.058824-7.529412H150.588235c-8.282353 0-15.058824 3.388235-15.058823 7.529412z"
                        p-id="2370"
                        fill="#1296db"
                        data-spm-anchor-id="a313x.7781069.0.i0"
                        class=""
                      ></path>
                    </svg> </el-dropdown-item
                ></span>
                <span @click="routingmanagement()">
                  <el-dropdown-item
                    command="/user/management"
                    style="font-weight: bolder"
                    >管理
                    <svg
                      t="1638267182271"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="9319"
                      data-spm-anchor-id="a313x.7781069.0.i31"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M511.3 860.7c-2 0-3.9-0.4-5.9-1.2-1-0.4-104.6-44.1-165.5-44.1-31.7 0-55.8 6.2-79.1 12.2-22.6 5.8-45.9 11.8-74.6 11.8-28.9 0-51.5-15.9-63.8-44.8-8.6-20.2-9.4-40.2-9.4-41V283.8c0-33.1 10.2-59.9 30.3-79.7 28.4-28 75.3-41.1 143.2-40.1h83.1c51.1 0 86.4 8.4 111 26.3 29 21.1 43.1 54.9 43.1 103.5V604c0 8.3-6.7 15-15 15s-15-6.7-15-15V293.8c0-72.8-33.6-99.8-124.1-99.8h-83.4c-58.7-0.9-99.7 9.7-121.8 31.5-14.4 14.1-21.4 33.2-21.4 58.3v468.9c0.2 4.3 3.6 56.7 43.2 56.7 24.9 0 45.4-5.3 67.2-10.9 25.1-6.5 51.1-13.1 86.6-13.1 67 0 172.7 44.6 177.2 46.5 7.6 3.2 11.2 12 7.9 19.7-2.4 5.6-7.9 9.1-13.8 9.1z"
                        p-id="9320"
                        data-spm-anchor-id="a313x.7781069.0.i35"
                        class=""
                        fill="#707070"
                      ></path>
                      <path
                        d="M508 860.7c-5.8 0-11.4-3.4-13.8-9.1-3.2-7.6 0.3-16.4 7.9-19.7 4.5-1.9 110.2-46.5 177.2-46.5 35.5 0 61.4 6.7 86.6 13.1 21.7 5.6 42.2 10.9 67.2 10.9 39.5 0 43-52.1 43.2-56.7V283.8c0-25.1-7-44.2-21.3-58.3-22.1-21.8-63.1-32.4-121.8-31.5h-83.4c-90.5 0-124.1 27.1-124.1 99.8V604c0 8.3-6.7 15-15 15s-15-6.7-15-15V293.8c0-48.6 14.1-82.5 43.1-103.5 24.7-17.9 59.9-26.3 111-26.3h83.1c67.9-1 114.7 12.1 143.2 40.1 20.1 19.8 30.3 46.6 30.3 79.7v469.7c0 0.8-0.8 20.8-9.4 41-12.3 28.9-35 44.8-63.8 44.8-28.7 0-52.1-6-74.6-11.8-23.3-6-47.4-12.2-79.1-12.2-60.9 0-164.4 43.7-165.5 44.1-2 0.9-4 1.3-6 1.3zM418 335H222c-8.3 0-15-6.7-15-15s6.7-15 15-15h196c8.3 0 15 6.7 15 15s-6.7 15-15 15zM418 463.1H222c-8.3 0-15-6.7-15-15s6.7-15 15-15h196c8.3 0 15 6.7 15 15s-6.7 15-15 15zM418 590.9H222c-8.3 0-15-6.7-15-15s6.7-15 15-15h196c8.3 0 15 6.7 15 15s-6.7 15-15 15z"
                        p-id="9321"
                        data-spm-anchor-id="a313x.7781069.0.i32"
                        class=""
                        fill="#515151"
                      ></path>
                      <path
                        d="M802.1 335h-196c-8.3 0-15-6.7-15-15s6.7-15 15-15h196c8.3 0 15 6.7 15 15s-6.7 15-15 15zM802.1 463.1h-196c-8.3 0-15-6.7-15-15s6.7-15 15-15h196c8.3 0 15 6.7 15 15s-6.7 15-15 15zM802.1 590.9h-196c-8.3 0-15-6.7-15-15s6.7-15 15-15h196c8.3 0 15 6.7 15 15s-6.7 15-15 15z"
                        p-id="9322"
                        data-spm-anchor-id="a313x.7781069.0.i33"
                        class=""
                        fill="#1afa29"
                      ></path>
                    </svg> </el-dropdown-item
                ></span>
                <span @click="publish()">
                  <el-dropdown-item
                    command="/User/release"
                    style="font-weight: bolder"
                    >发布
                    <svg
                      t="1638265991107"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="6358"
                      data-spm-anchor-id="a313x.7781069.0.i8"
                      width="15"
                      height="15"
                    >
                      <path
                        d="M92.734962 77.627741h782.658098v490.920693h77.626035V60.140557A60.138851 60.138851 0 0 0 892.453727 0.001706H75.674295A60.138851 60.138851 0 0 0 15.535444 60.140557v902.935801A60.138851 60.138851 0 0 0 75.674295 1023.641726h390.262757v-77.626035H92.734962z"
                        p-id="6359"
                        data-spm-anchor-id="a313x.7781069.0.i6"
                        class="selected"
                        fill="#8a8a8a"
                      ></path>
                      <path
                        d="M996.523796 727.212637L496.219736 537.412717a18.340217 18.340217 0 0 0-23.884933 22.178867l132.646685 451.254642a18.340217 18.340217 0 0 0 28.150101 9.809883l104.070069-73.360868 48.196384 42.651668a18.340217 18.340217 0 0 0 30.709201-12.368984l5.971233-100.657935a17.9137 17.9137 0 0 0-5.544717-14.07505l-235.437204-229.892488 281.927522 202.59542a18.340217 18.340217 0 0 0 20.899317 0l116.439052-78.052551a18.340217 18.340217 0 0 0-3.83865-30.282684zM204.908847 190.65466h550.206511v77.199518H204.908847zM204.908847 383.866714h262.307755v77.199518H204.908847z"
                        p-id="6360"
                        data-spm-anchor-id="a313x.7781069.0.i7"
                        class=""
                        fill="#90EDCD"
                      ></path>
                    </svg> </el-dropdown-item
                ></span>
                <span @click="goToNotifications()">
                  <el-dropdown-item
                    command="/user/notifications"
                    style="font-weight: bolder"
                  >
                    通知
                    <svg
                      t="1638265991107"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="6358"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 832c-211.8 0-384-172.2-384-384S300.2 128 512 128s384 172.2 384 384-172.2 384-384 384z"
                        fill="#515151"
                        p-id="6359"
                      ></path>
                      <path
                        d="M512 288c-17.7 0-32 14.3-32 32v160c0 17.7 14.3 32 32 32s32-14.3 32-32V320c0-17.7-14.3-32-32-32z m0 384c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z"
                        fill="#FF4D4F"
                        p-id="6360"
                      ></path>
                    </svg>
                  </el-dropdown-item>
                </span>
                <span @click="exit()">
                  <el-dropdown-item
                    command="/logout"
                    divided
                    style="font-weight: bolder"
                    >退出
                    <svg
                      t="1638276918283"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="7990"
                      data-spm-anchor-id="a313x.7781069.0.i39"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M966.829213 466.944L762.989213 290.24a61.76 61.76 0 0 0-40.896-15.168 60.096 60.096 0 0 0-61.504 58.88 57.92 57.92 0 0 0 20.352 43.84l85.376 74.048H395.821213a58.944 58.944 0 1 0 0 117.824h371.2l-85.376 74.048a57.6 57.6 0 0 0-20.352 43.712 60.16 60.16 0 0 0 61.12 59.008 62.592 62.592 0 0 0 40.896-15.168l203.84-176.704a57.6 57.6 0 0 0 0-87.744z"
                        fill="#dbdbdb"
                        p-id="7991"
                        data-spm-anchor-id="a313x.7781069.0.i40"
                        class="selected"
                      ></path>
                      <path
                        d="M420.589213 903.808H162.541213V117.76h258.176c35.584 0 64.576-26.368 64.576-58.88S456.429213 0 420.717213 0H97.965213C62.317213 0 33.389213 26.368 33.389213 58.88v903.872c0 32.512 28.864 58.88 64.576 58.88H420.589213c35.584 0 64.576-26.368 64.576-58.88s-28.864-58.944-64.576-58.944z"
                        fill="#8a8a8a"
                        p-id="7992"
                        data-spm-anchor-id="a313x.7781069.0.i36"
                        class=""
                      ></path></svg></el-dropdown-item
                ></span>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import cookie from "js-cookie";
import apiUserInfo from "@/api/userInfo";
import { logout } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";
// import Vue from "vue";
export default {
  data() {
    return {
      nickName: "", // 用户登录显示的名称
      userName: "",
      uImages: "",
    };
  },
  //创建的时候自动调用
  created() {
    this.info();
  },
  mounted() {},

  methods: {
    //获取用户信息
    info() {
      if (getToken() !== undefined) {
        apiUserInfo
          .getUserInfo()
          .then((response) => {
            this.userName = response.user.userName;
            this.nickName = response.user.nickName;
            this.uImages = response.user.avatar;
            sessionStorage.setItem("userId", response.user.userId);
            // 设置全局用户信息
            this.$globalVariable.userInfoGlobal = response.user;
          })
          .catch((response) => {
            removeToken();
          });
      }
    },
    goToNotifications() {
      this.$router.push("/user/notifications");
    },
    // 退出登录
    exit() {
      logout(this.ruleForm).then((response) => {
        removeToken();
      });
      sessionStorage.clear("userId");
      window.location.reload();
    },
    // 跳转个人中心页面
    profile() {
      this.$router.push("/user/profile");
    },
    // 跳转management页面
    routingmanagement() {
      this.$router.push("/user/management");
    },
    // 跳转addContent页面
    publish() {
      this.$router.push("/user/publish");
    },
  },
};
</script>
<style>
.header-container {
  text-align: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1010;
  background-color: #2a4465;
  height: 60px;
}
a {
  color: #919191;
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>
