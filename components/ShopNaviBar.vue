<template>
  <div class="nav-bar">
    <!-- 搜索框 -->
    <div class="nav-center">
      <button @click="goBack">返回</button>
      <el-input
        v-model="searchQuery"
        placeholder="搜索商品"
        class="search-box"
        clearable
        @keyup.enter="searchProduct"
      />
      <el-button type="primary" @click="searchProduct">搜索</el-button>
    </div>

    <!-- 右侧按钮 -->
    <div class="nav-right">
      <el-button type="text"  @click="goToMyProduct">我的商品</el-button>
      <el-button type="text" @click="goToAddress">我的地址</el-button>
      <el-button type="text" icon="el-icon-shopping-cart" @click="goToCart">
        购物车
      </el-button>
      <el-button type="text" icon="el-icon-document" @click="goToOrders">
        订单
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    searchProduct() {
      if (!this.searchQuery){
        this.$router.push({ path: "/shop", query: {} });
      }else{
        this.$router.push({ path: "/shop", query: { search: this.searchQuery } });
      }
    },
    goToCart() {
      this.$router.push("/order/cart");
    },
    goToOrders() {
      this.$router.push("/order/orders");
    },
    goToAddress(){
      this.$router.push("/order/address");
    },
    goToMyProduct() {
      this.$router.push("/myProduct");
    },
    goBack(){
      if (this.$route.name === 'shop') {
        this.$router.push('/');  // 商品详情页返回商城
      } else {
        this.$router.push('/shop');  // 商品详情页返回商城
      }
    }
  },

};
</script>

<style scoped>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background: #ffffff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-bottom: 10px;
}

.nav-left .logo {
  font-size: 24px;
  color: #333;
}

.nav-center {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-box {
  width: 300px;
}

.nav-right {
  display: flex;
  gap: 15px;
}
</style>
