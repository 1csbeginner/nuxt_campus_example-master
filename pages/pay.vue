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
import userInfoApi from "@/api/userinfo"; // 假设有一个获取用户信息的 API
import shopApi from "@/api/shop";

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
    async confirmPayment() {
      if (!this.selectedPayment) {
        this.$message.error("请选择支付方式！");
        return;
      }

      // 检查地址是否有效
      if (!this.selectedAddress || !this.selectedAddress.address) {
        this.$message.error("请先选择收货地址！");
        return;
      }

      try {
        // 循环发送商品信息
        for (const order of this.orders) {
          await this.sendOrderToApi(order);
          // 发送成功后，删除购物车中的商品
          if(order.cartId !== null) {
            await this.removeCartItem(order.cartId);
          }
        }

        // 模拟支付成功后的跳转
        setTimeout(() => {
          this.$message.success("支付成功！");
          this.$router.push("/order/orders"); // 假设有一个订单成功页面
        }, 1000);
      } catch (error) {
        console.error("订单发送失败:", error);
        this.$message.error("订单发送失败，请稍后重试！");
      }
    },

    async sendOrderToApi(order) {
      try {
        // 调用后端 API 发送商品信息
        const response = await shopApi.sendOrder({
          productId: order.id,
          quantity: order.quantity,
          price: (order.price * order.quantity).toFixed(2),
          producer: order.producer,
        });

        if (response.code !== 200) {
          throw new Error(`商品 ${order.id} 发送失败`);
        }

        console.log(`商品 ${order.id} 发送成功`);
        console.log(order.stock - order.quantity)

        shopApi.updateProduct({
          id: order.id,
          stock: (order.stock - order.quantity),
        }).catch((error) => {
          console.error("更新商品数量失败:", error);
        });

        sessionStorage.removeItem("tempOrder"); // 清除临时订单数据
      } catch (error) {
        console.error(`发送商品 ${order.id} 时出错:`, error);
        throw error; // 抛出错误以便在 `confirmPayment` 中捕获
      }
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

    goBack() {
      this.$router.back(); // 返回上一页
      sessionStorage.removeItem("tempOrder"); // 清除临时订单数据
    },
    removeCartItem(itemId) {
      // 调用后端 API 删除商品
      shopApi.delete('shoppinglist', itemId).catch((error) => {
        console.error("删除商品失败:", error);
      });
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
