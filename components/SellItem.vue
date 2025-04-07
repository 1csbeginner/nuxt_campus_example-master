<template>
  <div class="sell-item">
    <input
      type="checkbox"
      v-model="item.selected"
    />
    <div class="sell-item-info">
      <img :src="getImg(item.image)" alt="商品图片" />
      <p class="sell-item-id">{{ item.product_id }}</p>
      <p class="sell-item-name">{{ item.name }}</p>
      <p class="sell-item-price">¥{{ item.price }}</p>
      <p class="sell-item-stock">库存: {{ item.stock }}</p>
    </div>
    <div class="sell-item-actions">
      <button @click="editItem">修改</button>
      <button @click="removeItem">删除</button>
    </div>
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
    removeItem() {
      this.$emit('remove-item', this.item.id);
    },
    editItem() {
      this.$emit('edit-item', this.item.id);
    },
    getImg(img) {
      return shopApi.getProductImg(img);
    }
  }
};
</script>

<style scoped>
.sell-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

/* 图片部分 */
.sell-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* 信息部分横向排布 */
.sell-item-info {
  display: flex;
  flex: 1;
  margin-left: 16px;
  align-items: center;
  gap: 20px;
}

/* 每项宽度控制，防止过长 */
.sell-item-id,
.sell-item-name,
.sell-item-price,
.sell-item-stock {
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 操作按钮部分 */
.sell-item-actions {
  display: flex;
  flex-direction: column;
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
