<template>
  <div class="order-card">
    <div class="order-header">
      <span>订单编号：{{ order.id }}</span>
      <span>下单时间：{{ order.createTime }}</span>
    </div>

    <div class="order-body">
      <img
        :src="getImg(order.product.image)"
        alt="商品图片"
        class="order-img"
      />
      <div class="order-info">
        <h3>{{ order.product.name }}</h3>
        <p>价格：¥{{ order.product.price }}</p>
        <p>数量：{{ order.quantity }}</p>
        <p>状态：{{ order.isFinished === 1 ? '已完成' : '待收货' }}</p>
      </div>
      <div class="order-actions">
        <el-button
          v-if="order.isFinished === 0"
          type="primary"
          size="small"
          @click="confirmReceive"
        >
          确认收货
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import shopApi from "@/api/shop";

export default {
  props: {
    order: Object,
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
