<template>
  <div class="order-container">
    <ShopNaviBar />

    <!-- 使用 OrderItem 组件 -->
    <OrderItem
      v-for="(order, index) in orderList"
      :key="index"
      :order="order"
      @confirm-receive="handleConfirmReceive"
      @refresh-order="refreshSingleOrder"
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
import userInfoApi from "@/api/userInfo";
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
      },
      userId: 0,
    };
  },
  created() {
    shopApi.getUserId().then(userId => {
      if (userId) {
        this.userId = userId
        this.getOrderList(this.orderFilter)
      }
    })
  },
  mounted() {
    this.userId = sessionStorage.getItem("userId");
    this.mainMinHeight = document.documentElement.clientHeight - 45;
  },
  methods: {
    getOrderList(filter) {
      shopApi.getList("shoppingorder", filter, { createUser: this.userId}).then((response) => {
        console.log(filter)
        this.orderList = response.rows.map((item) => ({
          id: item.id,
          price: item.price,
          createTime: item.createTime,
          quantity: item.quantity,
          isFinished: item.isFinished,
          product: item.product,
          bcomment: item.bcomment,
          pcomment: item.pcomment,
        }));
        this.total = parseInt(response.total);
      });
    },
    handleCurrentChange(val) {
      this.orderFilter.pageNum = val;
      this.currentPage = this.orderFilter.pageNum;
      this.getOrderList(this.orderFilter);
    },
    handleConfirmReceive(orderId) {
      shopApi.finishOrder(orderId).then(() => {
        this.refreshSingleOrder(orderId)
      });
    },
    getImg(path) {
      return shopApi.getProductImg(path);
    },
    getUserId(){
      userInfoApi.getUserProfile().then((response) => {
        this.userId = response.userId;
      });
    },
    refreshSingleOrder(orderId) {
      shopApi.getDetail("shoppingorder", orderId).then((res) => {
        const updated = res.data;
        const idx = this.orderList.findIndex(o => o.id === orderId);
        if (idx !== -1) {
          // 只更新特定字段，而不是替换整个对象
          this.orderList[idx].isFinished = updated.isFinished;
          this.orderList[idx].bcomment = updated.bcomment;
          this.orderList[idx].pcomment = updated.pcomment;
        }
      });
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

