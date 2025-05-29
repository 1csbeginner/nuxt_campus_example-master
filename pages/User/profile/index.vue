<template>
  <div class="profile-container">
    <client-only>
      <el-card class="profile-card">
        <div slot="header" class="clearfix">
          <span>基本资料</span>
        </div>
        <div class="profile-content">
          <!-- 左侧头像 -->
          <div class="profile-avatar">
            <userAvatar :user="user" />
          </div>
          <!-- 右侧表格 -->
          <div class="profile-info">
            <el-tabs v-model="activeTab">
              <el-tab-pane label="基本资料" name="userinfo">
                <userInfo :user="user" />
              </el-tab-pane>
              <el-tab-pane label="修改密码" name="resetPwd">
                <resetPwd />
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-card>
    </client-only>
  </div>
</template>

<script>
import userAvatar from "./userAvatar";
import userInfo from "./userInfo";
import resetPwd from "./resetPwd";
import userInfoApi from "@/api/userInfo";

export default {
  name: "Profile",
  components: { userAvatar, userInfo, resetPwd },
  data() {
    return {
      user: {},
      activeTab: "userinfo",
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      userInfoApi.getUserProfile().then((response) => {
        this.user = response.data;
      });
    },
  },
};
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.profile-card {
  width: 800px; /* 调整卡片宽度 */
  padding: 20px;
}

.profile-content {
  display: flex;
  align-items: flex-start; /* 头像和表格顶部对齐 */
}

.profile-avatar {
  flex: 0 0 200px; /* 固定头像区域宽度 */
  margin-right: 20px; /* 头像和表格之间的间距 */
  text-align: center;
}

.profile-info {
  flex: 1; /* 表格区域占据剩余空间 */
}
</style>
