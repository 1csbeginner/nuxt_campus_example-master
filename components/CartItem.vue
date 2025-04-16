<template>
  <div class="cart-item" @click="goToProductDetail">
    <input
      type="checkbox"
      v-model="item.selected"
      @click.stop
    />
    <div class="cart-item-info">
      <img :src="getImg(item.image)" alt="商品图片" />
      <p class="cart-item-name">{{ item.name }}</p>
      <p class="cart-item-price">¥{{ item.price }}</p>
      <div class="cart-item-quantity">
        <button @click.stop="decreaseQuantity" :disabled="isDecreaseDisabled || item.stock === 0">-</button>
        <span>{{ item.quantity }}</span>
        <button @click.stop="increaseQuantity" :disabled="isIncreaseDisabled || item.stock === 0">+</button>
      </div>
      <p v-if="item.stock === 0" class="out-of-stock">商品缺货</p> <!-- 显示缺货提示 -->
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <button @click.stop="removeItem">删除</button>
  </div>
</template>

<script>
import shopApi from "@/api/shop"; // 确保调用正确的购物车API

export default {
  props: {
    item: Object,
    isSelected: Boolean,
  },
  data() {
    return {
      errorMessage: "", // 用于显示错误提示
    };
  },
  computed: {
    isDecreaseDisabled() {
      return this.item.quantity <= 1 || this.item.stock === 0;
    },
    isIncreaseDisabled() {
      return this.item.quantity >= this.item.stock || this.item.stock === 0;
    },
  },
  methods: {
    changeQuantity(delta) {
      const newQuantity = this.item.quantity + delta;

      if (newQuantity < 1) {
        return; // 数量不能小于 1
      }

      if (newQuantity > this.item.stock) {
        // 如果超过库存，调整为最大库存并显示提示
        this.item.quantity = this.item.stock;
        this.errorMessage = `库存不足，已调整为最大库存：${this.item.stock}`;
        this.$emit("update-cart", this.item); // 通知父组件更新购物车
        return;
      }

      // 清空错误提示
      this.errorMessage = "";

      // 更新数量
      this.item.quantity = newQuantity;

      // 调用 API 更新购物车
      shopApi.updateCart(this.item.id, this.item.quantity)
        .then(() => {
          // 更新成功后的逻辑
        })
        .catch(() => {
          // 错误处理
        });

      // 通知父组件更新购物车
      this.$emit("update-cart", this.item);
    },
    increaseQuantity() {
      this.changeQuantity(1);
    },
    decreaseQuantity() {
      this.changeQuantity(-1);
    },
    updateSelection() {
      this.$emit("update-selection", this.item.id);
    },
    removeItem() {
      this.$emit("remove-item", this.item.id);
    },
    getImg(img) {
      return shopApi.getProductImg(img);
    },
    goToProductDetail() {
      this.$router.push({ path: `/product/${this.item.productId}` });
    },
  },
  mounted() {
    // 检查商品数量是否超过库存
    if (this.item.quantity > this.item.stock) {
      this.item.quantity = this.item.stock; // 调整为最大库存
      this.errorMessage = `库存不足，已调整为最大库存：${this.item.stock}`;
      this.$emit("update-cart", this.item); // 通知父组件更新购物车
    }
  },
};
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  background-color: #fff;
  transition: background-color 0.3s;
}

.cart-item:hover {
  background-color: #f9f9f9; /* 鼠标悬停时背景变浅 */
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

/* 数量控制部分 */
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

button:disabled {
  background-color: #f9f9f9;
  cursor: not-allowed;
  color: #aaa;
}

/* 错误提示信息 */
.error-message {
  color: red;
  font-size: 12px;
  margin-top: 8px;
  font-weight: bold;
  text-align: left;
}

/* 缺货提示 */
.out-of-stock {
  color: red;
  font-size: 14px;
  font-weight: bold;
}
</style>
