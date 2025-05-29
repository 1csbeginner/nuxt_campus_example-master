<template>
  <div class="top-nav">
    <el-menu
      mode="horizontal"
      default-active="1"
      @select="handleSelectMenu"
      background-color="#ffffff"
      text-color="#000000"
      active-text-color="#d2691e"
    >
      <el-menu-item index="home">
        <span>首页</span>
      </el-menu-item>

      <el-menu-item index="shop" @click="goToShop">
        <span>购物</span>
      </el-menu-item>

      <el-submenu
        v-for="(item, i) in categoryTree"
        :key="i"
        :index="item.categoryId"
      >
        <template slot="title">
          <span>{{ item.categoryName }}</span>
        </template>
        <el-menu-item
          v-for="(child, i) in item.children"
          :key="i"
          :index="child.categoryId"
        >
          <span>{{ child.categoryName }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["categoryObj"],
  data() {
    return {
      categoryTree: [],
      selectMenuId: null,
    };
  },
  created() {
    this.categoryTree = this.handleTree(this.categoryObj, "categoryId");
  },
  methods: {
    handleSelectMenu(key, keyPath) {
      if (isNaN(key)) {
        console.warn("Invalid category ID:", key);
        return;
      }

      if (this.selectMenuId != key) {
        this.selectMenuId = key;
        this.$emit("handleCategory", key);
      }
    },
    goToShop() {
      this.$router.push({ path: "/shop" });
    },
  },
};
</script>

<style scoped>
.top-nav {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.top-nav .el-menu {
  max-width: 1122px;
  margin: 0 auto;
  border-bottom: none;
}

.top-nav .el-menu--horizontal {
  white-space: normal;
}

.top-nav .el-menu-item,
.top-nav .el-submenu {
  padding: 0 15px;
}
</style>
