<template>
  <div class="order-card">
    <div class="order-header">
    </div>

    <div class="order-body">
      <img :src="getImg(order.image)" alt="商品图片" class="product-img" />
      <div class="order-info">
        <h3>{{ order.name }}</h3>
        <p>价格：¥{{ order.price }}</p>
        <p>数量：{{ order.quantity }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import shopApi from "@/api/shop";

export default {
  props: {
    order: Object,
    required: true,
  },
  methods: {
    getImg(img) {
      return shopApi.getProductImg(img);
    },
    confirmReceive() {
      this.$emit('confirm-receive', this.order.id);
    },
  },
};
</script>

<style scoped>
.order-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 12px 16px;
  background: #fff;
}

.order-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
}

.order-body {
  display: flex;
  align-items: center;
}

.order-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 16px;
  border-radius: 6px;
  border: 1px solid #f1f1f1;
}

.order-info {
  flex: 1;
}

.order-actions {
  text-align: right;
}
</style>
