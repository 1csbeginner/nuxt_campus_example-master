<template>
  <div class="pay-page">
    <el-card class="order-card">
      <h2>订单信息</h2>
      <div class="order-details">
        <p>商品名称：{{ order.productName }}</p>
        <p>订单编号：{{ order.orderId }}</p>
        <p>总金额：<span class="price">￥{{ order.totalPrice }}</span></p>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        productName: "商品示例名称",
        orderId: "1234567890",
        totalPrice: 199.99,
      },
      selectedPayment: "支付宝", // 默认支付方式
    };
  },
  methods: {
    confirmPayment() {
      if (!this.selectedPayment) {
        this.$message.error("请选择支付方式！");
        return;
      }
      this.$message.success(`使用 ${this.selectedPayment} 支付成功！`);
      // 模拟支付成功后的跳转
      setTimeout(() => {
        this.$router.push("/order-success"); // 假设有一个订单成功页面
      }, 1000);
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
</style>
