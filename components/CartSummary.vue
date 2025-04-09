<template>
  <div class="cart-summary">
    <p>已选商品：{{ totalCount }}件</p>
    <p>总价：¥{{ totalPrice }}</p>
    <button @click="checkout" :disabled="totalCount === 0">结算</button>
  </div>
</template>

<script>
export default {
  props: {
    totalPrice: Number,
    totalCount: Number,
    isAllSelected: Boolean
  },
  methods: {
    checkout() {
      this.$emit('checkout');
    }
  }
};
</script>

<style scoped>
.cart-summary {
  position: fixed; /* 固定定位 */
  bottom: 0; /* 距离页面底部 0 */
  left: 50%; /* 水平居中 */
  transform: translateX(-50%); /* 水平居中偏移 */
  max-width: 1200px; /* 设置最大宽度，与主页内容一致 */
  width: 100%; /* 在小屏幕下占满宽度 */
  background-color: #fff; /* 背景色 */
  border-top: 1px solid #ddd; /* 添加顶部边框 */
  padding: 16px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  z-index: 1000; /* 确保在其他内容之上 */
  text-align: center;
}

button {
  background-color: #ff6700;
  color: white;
  padding: 10px 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:disabled {
  background-color: #ccc;
}
</style>

