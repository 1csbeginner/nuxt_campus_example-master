<template>
  <div class="pay-page">
    <AddressCard :address="selectedAddress" />
    <el-card class="order-card">
      <h2>订单信息</h2>
      <div class="order-details">
        <PayItem
          v-for="(order, index) in orders"
          :key="order.id || index"
          :order="order"
          @confirm-receive="handleConfirmReceive"
        />
        <p class="total-price">
          总金额：<span class="price">￥{{ totalPrice }}</span>
        </p>
      </div>
    </el-card>

    <el-card class="payment-card">
      <h2>选择支付方式</h2>
      <el-radio-group v-model="selectedPayment" class="payment-options">
        <el-radio-button label="支付宝">
          <i class="el-icon-wallet"></i> 支付宝
        </el-radio-button>
        <el-radio-button label="微信支付">
          <i class="el-icon-chat-dot-round"></i> 微信支付
        </el-radio-button>
        <el-radio-button label="银行卡">
          <i class="el-icon-bank-card"></i> 银行卡
        </el-radio-button>
      </el-radio-group>
    </el-card>

    <div class="pay-actions">
      <el-button type="primary" size="large" @click="confirmPayment">
        确认付款
      </el-button>
      <el-button type="primary" size="large" @click="goBack">
        返回
      </el-button>
    </div>
  </div>
</template>

<script>
import PayItem from "@/components/PayItem.vue";
import AddressCard from "@/components/AddressCard.vue"; // 假设有一个地址卡片组件
import userInfoApi from "@/api/userInfo"

export default {
  components: {
    PayItem,
    AddressCard,
  },
  data() {
    return {
      orders: [], // 初始化为空数组
      selectedPayment: "支付宝", // 默认支付方式
      selectedAddress: null, // 假设有一个地址数据
    };
  },
  computed: {
    // 计算总价
    totalPrice() {
      return this.orders.reduce((total, order) => {
        return total + order.price * order.quantity;
      }, 0).toFixed(2);
    },
  },
  mounted() {
    if (process.client) {
      const stored = sessionStorage.getItem("tempOrder");
      if (stored) {
        this.orders = JSON.parse(stored);
      }
    }
    this.fetchAddress();
  },
  methods: {
    confirmPayment() {
      if (!this.selectedPayment) {
        this.$message.error("请选择支付方式！");
        return;
      }
      if(!this.selectedAddress) {
        this.$message.error("请先选择收货地址！");
        return;
      }
      this.$message.success(`使用 ${this.selectedPayment} 支付成功！`);
      // 模拟支付成功后的跳转
      setTimeout(() => {
        this.$router.push("/order-success"); // 假设有一个订单成功页面
      }, 1000);
    },
    async fetchAddress() {
      try {
        // 调用 userinfo API 获取地址数据
        const response = await userInfoApi.getUserProfile(); // 假设这个 API 返回用户信息

        // 假设地址信息在 response.data.addresses 中
        const addresses = response.data;

        // 筛选出需要的字段
        if (addresses) {
          this.selectedAddress = {
            userName: addresses.userName,
            phonenumber: addresses.phonenumber,
            address: addresses.address,
          };
        } else {
          this.selectedAddress = null; // 如果没有地址，设置为 null
        }
      } catch (error) {
        console.error("获取用户信息失败:", error);
        this.$message.error("获取用户信息失败，请稍后重试！");
      }
    },
    handleConfirmReceive(orderId) {
      console.log(`确认收货，订单ID: ${orderId}`);
      this.$message.success(`订单 ${orderId} 已确认收货！`);
    },
    goBack() {
      this.$router.back(); // 返回上一页
      sessionStorage.removeItem("tempOrder"); // 清除临时订单数据
    },
  },
};
</script>

<style scoped>
.pay-page {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.order-card,
.payment-card {
  margin-bottom: 20px;
}

.order-details p {
  margin: 5px 0;
}

.price {
  color: #e74c3c;
  font-weight: bold;
}

.payment-options {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.pay-actions {
  text-align: center;
  margin-top: 20px;
}

.total-price {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
}
</style>
