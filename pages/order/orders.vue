<template>
  <div class="order-container">
    <ShopNaviBar />

    <!-- 使用 OrderItem 组件 -->
    <OrderItem
      v-for="(order, index) in orderList"
      :key="index"
      :order="order"
      @confirm-receive="handleConfirmReceive"
    />

    <!-- 分页 -->
    <div class="fenye">
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
  </div>
</template>

<script>
import shopApi from "@/api/shop";
import ShopNaviBar from "@/components/ShopNaviBar";

export default {
  components: { ShopNaviBar },
  data() {
    return {
      orderList: [],
      currentPage: 1,
      total: 0,
      orderFilter: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this.getOrderList(this.orderFilter);
  },
  methods: {
    getOrderList(filter) {
      shopApi.getList("shoppingorder", filter).then((response) => {
        console.log("订单列表：", response);
        this.orderList = response.rows.map((item) => ({
          id: item.id,
          createTime: item.createTime,
          quantity: item.quantity,
          isFinished: item.isFinished,
          product: item.product,
        }));
        this.total = parseInt(response.total);
      });
    },
    handleCurrentChange(val) {
      this.orderFilter.pageNum = val;
      this.currentPage = val;
      this.getOrderList(this.orderFilter);
    },
    handleConfirmReceive(orderId) {
      shopApi.finishOrder(orderId).then(() => {
        this.getOrderList(this.orderFilter);
      });
    },
    getImg(path) {
      return shopApi.getProductImg(path);
    }
  }
};
</script>

<style scoped>
.order-container {
  padding: 20px;
  max-width: 1100px;
  margin: auto;
}

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

.fenye {
  text-align: center;
  margin-top: 20px;
}
</style>
