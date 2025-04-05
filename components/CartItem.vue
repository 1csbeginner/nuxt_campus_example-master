<template>
  <div class="cart-item">
    <input
      type="checkbox"
      v-model="item.selected"
      @change="updateSelection"
    />
    <div class="cart-item-info">
      <img :src="getImg(item.image)" alt="商品图片" />
      <p class="cart-item-id">{{ item.product_id }}</p>
      <p class="cart-item-name">{{ item.name }}</p>
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
import shopApi from "@/api/shop"; // 确保调用正确的购物车API

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
    getImg(img){
      return shopApi.getProductImg(img);
    }
  }
};
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

/* 图片部分 */
.cart-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* 信息部分横向排布 */
.cart-item-info {
  display: flex;
  flex: 1;
  margin-left: 16px;
  align-items: center;
  gap: 20px;
}

/* 每项宽度控制，防止过长 */
.cart-item-id,
.cart-item-name,
.cart-item-price {
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
  gap: 8px;
}

button {
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: 0.2s;
}

button:hover {
  background-color: #e6e6e6;
}
</style>
