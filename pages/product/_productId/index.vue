<template>
  <div class="product-detail">
    <ShopNaviBar />
    <div class="product-container">
      <!-- 左侧商品图片 -->
      <div class="product-image">
        <img :src="getImg(product.image)" alt="商品图片" class="product-img" />
      </div>

      <!-- 右侧商品信息 -->
      <div class="product-info">
        <h2 class="product-title">{{ product.name }}</h2>
        <p class="product-price">￥{{ product.price }}</p>
        <p class="product-stock">库存: {{ product.stock || 0 }} 件</p>
        <p class="product-introduce">{{ product.introduce }}</p>
        <p class="product-desc">{{ product.description }}</p>

        <!-- 按钮 -->
        <div class="btn-group">
          <el-button type="warning" @click="buyNow">立即购买</el-button>
          <el-button type="primary" @click="addToCart">加入购物车</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shopApi from "@/api/shop";
import ShopNaviBar from "@/components/ShopNaviBar";

export default {
  data() {
    return {
      product: {}, // 存储商品信息
    };
  },
  created() {
    this.loadProductDetails();
  },
  methods: {
    async loadProductDetails() {
      const productId = this.$route.params.productId;
      if (!productId) return;

      try {
        const response = await shopApi.getProductDetail(productId);
        console.log("商品详情:", response);
        this.product = response.data;
      } catch (error) {
        console.error("加载商品详情失败", error);
      }
    },
    getImg(image) {
      return shopApi.getProductImg(image);
    },
    buyNow() {
      this.$message.success("购买功能暂未实现");
    },
    addToCart() {
      this.$message.success("商品已加入购物车");
    },
  },
};
</script>

<style scoped>
.product-detail {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.product-container {
  display: flex;
  gap: 20px;
}

.product-image {
  width: 40%;
}

.product-img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.product-info {
  width: 60%;
}

.product-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-price {
  font-size: 20px;
  color: red;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-stock {
  font-size: 16px;
  color: #555;
}

.product-desc {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

.btn-group {
  margin-top: 20px;
}

.btn-group .el-button {
  margin-right: 10px;
  padding: 12px 30px;
  font-size: 16px;
}
</style>
