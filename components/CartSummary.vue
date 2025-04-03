<template>
  <div class="cart-summary">
    <p>已选商品：{{ totalCount }}件</p>
    <p>总价：¥{{ totalPrice }}</p>
    <button @click="checkout" :disabled="!isAllSelected">结算</button>
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
  padding: 16px;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
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

