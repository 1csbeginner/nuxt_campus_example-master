<template>
  <div class="cart">
    <!-- 购物车头部 -->
    <ShopNaviBar/>
    <div class="cart-header">
      <label>
        <input type="checkbox" v-model="selectAll" @change="toggleSelectAll">
        全选
      </label>
    </div>

    <!-- 购物车商品列表 -->
    <div class="cart-items">
      <CartItem
        v-for="item in cartItems"
        :key="item.id"
        :item="item"
        :is-selected="isItemSelected(item.id)"
        @update-selection="updateItemSelection"
        @remove-item="removeItem"
      />
    </div>
    <!-- 分页 -->
    <div class="fenye" v-if="!loading && cartItems.length > 0">
      <el-pagination
        :hide-on-single-page="true"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="currentPage"
        :page-size="10"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 购物车汇总 -->
    <CartSummary
      :total-price="totalPrice"
      :total-count="selectedCount"
      :is-all-selected="isAllSelected"
      @checkout="checkout"
    />
  </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
import CartSummary from '@/components/CartSummary.vue';
import shopApi from "@/api/shop"; // 确保调用正确的购物车API
import ShopNaviBar from "@/components/ShopNaviBar"; // 导入导航栏组件

export default {
  components: {
    CartItem,
    CartSummary
  },
  data() {
    return {
      selectAll: false,  // 全选框状态
      cartItems: [],      // 购物车商品数据
      cartFilter: {
        pageNum: 1,
      },
      currentPage: 1,
      mainMinHeight: "",
    };
  },
  computed: {
    // 已选择的商品数量
    selectedCount() {
      return this.cartItems.filter(item => item.selected).length;
    },
    // 选中商品的总价
    totalPrice() {
      return this.cartItems
        .filter(item => item.selected)
        .reduce((total, item) => total + item.price * item.quantity, 0);
    },
    // 判断是否全选
    isAllSelected() {
      return this.selectedCount === this.cartItems.length;
    }
  },
  methods: {
    toggleSelectAll() {
      this.cartItems.forEach(item => {
        item.selected = this.selectAll;
      });
    },
    isItemSelected(itemId) {
      const item = this.cartItems.find(item => item.id === itemId);
      return item ? item.selected : false;
    },
    updateItemSelection(itemId) {
      const item = this.cartItems.find(item => item.id === itemId);
      if (item) {
        item.selected = !item.selected;
      }
    },
    removeItem(itemId) {
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      shopApi.delete('shoppinglist', itemId)
        .then(() => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getCartItems(this.cartFilter);
        })
        .catch((error) => {
          this.$message({
            message: '删除失败',
            type: 'error'
          });
        });
    },
    checkout() {
      // 结算逻辑
      console.log('结算');
    },
    // 获取购物车商品列表
    getCartItems(cartFilter) {
      shopApi
        .getList('shoppinglist', cartFilter)
        .then((response) => {
          console.log("购物车商品列表:", response);
          this.cartItems = response.rows.map((item) => ({
            id: item.id,
            product_id: item.product_id,
            image: item.product.image,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            selected: false,
          }));
        })
        .catch((error) => {
          console.error('获取购物车数据失败', error);
        });
    },
    handleCurrentChange(val) {
      this.cartFilter.pageNum = val;
      this.currentPage = this.cartFilter.pageNum;
      this.getCartItems(this.cartFilter);
    },
  },
  created() {
    this.getCartItems(this.cartFilter);
  },
  mounted() {
    this.mainMinHeight = document.documentElement.clientHeight - 45;
  },
};
</script>

<style scoped>
.cart {
  max-width: 1200px; /* 最大宽度限制 */
  margin: 0 auto;    /* 居中显示 */
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #ddd;
}

.cart-items {
  margin-top: 16px;
}

.cart-footer {
  margin-top: 16px;
  padding: 10px 0;
  border-top: 1px solid #ddd;
  text-align: center;
}
</style>
