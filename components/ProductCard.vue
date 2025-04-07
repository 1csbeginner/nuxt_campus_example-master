<template>
  <div class="product-card" @click="viewDetails">
    <img :src="getImg(productObj.image)" alt="商品图片" class="product-image" />
    <div class="product-info">
      <h3 class="product-title">{{ productObj.name }}</h3>
      <p class="product-price">￥{{ productObj.price }}</p>

      <div class="product-bottom">
        <p class="product-stock">库存: {{ productObj.stock || 0 }} 件</p>
      </div>

    </div>
  </div>
</template>

<script>
import shopApi from "@/api/shop";
export default {
  props: {
    productObj: Object,
  },
  methods: {
    viewDetails() {
      // 可以使用 Vue Router 跳转到详情页
      this.$router.push({ path: `/product/${this.productObj.id}` });
    },
    getImg(image) {
      return shopApi.getProductImg(image);
    },

  },
};
</script>

<style scoped>
.product-card {
  width: calc(35% - 8px); /* 每行 4 个卡片，减去间距 */
  max-width: 240px; /* 控制最大宽度，防止过大 */
  max-height: 360px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  margin-right: 30px;
}

.product-card:hover {
  transform: translateY(-5px); /* 鼠标悬停时稍微上移 */
}

.product-image {
  width: 100%;
  height: 200px; /* 固定高度 */
  object-fit: cover; /* 让图片填充整个区域 */
}

.product-info {
  padding: 10px;
  text-align: center;
}

.product-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.product-price {
  color: #f40;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.product-stock{
  font-size: 14px;
  color: #999;
}
.product-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 两端对齐 */
}
</style>
