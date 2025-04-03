<template>
  <div class="cart-item">
    <input
      type="checkbox"
      v-model="item.selected"
      @change="updateSelection"
    />
    <div class="cart-item-info">
      <p class="cart-item-id">{{ item.product_id }}</p>
      <p class="cart-item-price">¥{{ item.price }}</p>
      <div class="cart-item-quantity">
        <button @click="decreaseQuantity">-</button>
        <span>{{ item.quantity }}</span>
        <button @click="increaseQuantity">+</button>
      </div>
    </div>
    <button @click="removeItem">删除</button>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    isSelected: Boolean
  },
  methods: {
    updateSelection() {
      this.$emit('update-selection', this.item.id);
    },
    increaseQuantity() {
      this.item.quantity++;
      this.$emit('update-cart', this.item);
    },
    decreaseQuantity() {
      if (this.item.quantity > 1) {
        this.item.quantity--;
        this.$emit('update-cart', this.item);
      }
    },
    removeItem() {
      this.$emit('remove-item', this.item.id);
    },
  }
};
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.cart-item-info {
  flex: 1;
  margin-left: 16px;
}

.cart-item-name {
  font-size: 16px;
}

.cart-item-price {
  font-size: 14px;
  color: #888;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
}

button {
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  padding: 4px 8px;
  cursor: pointer;
}
</style>
