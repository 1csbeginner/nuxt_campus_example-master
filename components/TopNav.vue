<!-- TopNav.vue -->
<template>
  <div class="top-nav">
    <div class="nav-container">
      <div class="nav-item" @click="goToHome">
        <span>首页</span>
      </div>
      
      <div class="nav-item" @click="goToShop">
        <span>购物</span>
      </div>

      <el-dropdown 
        v-for="(item, i) in categoryTree" 
        :key="i"
        v-if="item.children && item.children.length"
        placement="bottom"
        trigger="hover"
      >
        <div class="nav-item">
          <span>{{ item.categoryName }}</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item 
            v-for="(child, j) in item.children" 
            :key="j"
            @click.native="selectCategory(child.categoryId)"
          >
            {{ child.categoryName }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <div 
        class="nav-item" 
        v-for="(item, i) in categoryTree" 
        :key="'single-'+i"
        v-if="!item.children || !item.children.length"
        @click="selectCategory(item.categoryId)"
      >
        <span>{{ item.categoryName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
//import { handleTree } from "@/utils/index";
import touristApi from "@/api/tourist";
import operateApi from "@/api/operate";

import { getToken, setToken, removeToken } from "@/utils/auth";
//组件
import CommentUser from "@/components/CommentUser";
import CommentChild from "@/components/CommentChild";
import Vue from "vue";
import { handleTree } from "@/utils/ruoyi"
export default {
  props: ["categoryObj"],
  data() {
    return {
      categoryTree: []
    };
  },
  created() {
    this.categoryTree = handleTree(this.categoryObj, "categoryId");
  },
  methods: {
    selectCategory(id) {
      this.$emit("handleCategory", id);
    },
    goToHome() {
      this.$router.push("/");
    },
    goToShop() {
      this.$router.push("/shop");
    }
  }
};
</script>

<style scoped>
.top-nav {
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  display: flex;
  max-width: 1122px;
  margin: 0 auto;
  padding: 0 10px;
}

.nav-item {
  padding: 0 15px;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s;
}

.nav-item:hover {
  color: #d2691e;
  background-color: #f5f5f5;
}

.el-dropdown {
  height: 100%;
}

.el-icon-arrow-down {
  margin-left: 5px;
  font-size: 12px;
}
</style>