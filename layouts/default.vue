<template>
  <div class="app-container">
    <el-container>
      <!-- 顶栏容器 -->
      <el-header height="60px;">
        <!-- 公共头 -->
        <myheader />
      </el-header>
      <!-- 分割线 -->
      <!-- 主要区域容器 -->
      <el-main style="padding: 0px; margin-top: 0px">
        <div class="main-container">
          <nuxt />
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import myheader from "./myheader";
export default {
  components: {
    myheader,
  },
};
</script>
<style>
.el-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  background-image: url('~assets/images/bg.jpg'); /* 替换为你的图片路径 */
  background-size: cover; /* 背景图片覆盖整个容器 */
  background-position: center; /* 背景图片居中 */
  background-repeat: no-repeat; /* 背景图片不重复 */
}
.el-main {
  overflow: visible !important;
}
/* .el-message {
  z-index: 99999999 !important;
}
.el-notification {
  z-index: 99999999 !important;
} */
</style>
