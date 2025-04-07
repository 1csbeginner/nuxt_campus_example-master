<template>
  <div class="product-detail">
    <ShopNaviBar />
    <div class="product-container">
      <!-- 左侧商品图片 -->
      <div class="product-image">
        <img :src="getImg(product.image)" alt="商品图片" class="product-img" />
      </div>

      <!-- 右侧商品信息 -->
      <div class="product-info">
        <h2 class="product-title">{{ product.name }}</h2>
        <p class="product-price">￥{{ product.price }}</p>
        <p class="product-stock">库存: {{ product.stock || 0 }} 件</p>
        <p class="product-introduce">{{ product.introduce }}</p>
        <p class="product-desc">{{ product.description }}</p>

        <!-- 数量选择 -->
        <div class="quantity-selector">
          <button @click="decreaseQuantity">-</button>
          <span>{{ quantity }}</span>
          <button @click="increaseQuantity">+</button>
        </div>

        <!-- 按钮 -->
        <div class="btn-group">
          <el-button type="warning" @click="buyNow">立即购买</el-button>
          <el-button type="primary" @click="addToCart">加入购物车</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shopApi from "@/api/shop";
import ShopNaviBar from "@/components/ShopNaviBar";

export default {
  data() {
    return {
      product: {}, // 存储商品信息
      quantity: 1, // 存储商品数量，初始值为1
      productId: null, // 存储商品ID
    };
  },
  components: {
    ShopNaviBar
  },
  created() {
    this.loadCartCount();
    this.loadProductDetails();
  },
  methods: {
    async loadProductDetails() {
      this.productId = this.$route.params.productId;
      if (!this.productId) return;

      try {
        const response = await shopApi.getProductDetail(this.productId);
        this.product = response.data;
      } catch (error) {
        console.error("加载商品详情失败", error);
      }
    },
    async loadCartCount() {
      this.productId = this.$route.params.productId;
      try {
        // 获取用户ID
        const userId = await shopApi.getUserId();
        if (!userId) {
          console.error("用户未登录或获取用户ID失败");
          this.cartCount = 0;
          return;
        }

        // 调用 API 获取购物车中该商品的详细信息
        const response = await shopApi.getList('shoppinglist', { createUser: userId, productId: this.productId });

        // 从 rows 中找到与当前 productId 匹配的商品
        const productInCart = response.rows.find(item => item.productId === this.productId);

        // 如果购物车中有该商品，设置其数量，否则为 0
        this.cartCount = productInCart ? productInCart.quantity : 0;

      } catch (error) {
        console.error("加载购物车数量失败", error);
        this.cartCount = 0; // 出错时设置默认值
      }
    },
    getImg(image) {
      return shopApi.getProductImg(image);
    },
    // 增加数量
    increaseQuantity() {
      if (this.quantity < (this.product.stock - this.cartCount)) {
        this.quantity++;
      }
    },
    // 减少数量
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    buyNow() {
      const orderData = [
        {
          id: this.productId, // 注意 id 字段要和支付页对应
          image: this.product.image,
          name: this.product.name,
          price: this.product.price,
          quantity: this.quantity,
        },
      ];
      // 存储订单信息到 sessionStorage
      sessionStorage.setItem("tempOrder", JSON.stringify(orderData));

      // 跳转支付页（不要传参了）
      this.$router.push("/pay");
    },
    async addToCart() {
      // 检查库存是否足够
      if (this.quantity > (this.product.stock - this.cartCount)) {
        this.$message.error("库存不足");
        return;
      }

      try {
        // 调用 API 处理加入购物车
        await shopApi.add("shoppinglist", { productId: this.productId, quantity: this.quantity});
        this.$message.success("商品已加入购物车");

        // 立即刷新购物车计数
        await this.loadCartCount();
      } catch (error) {
        console.error("加入购物车失败", error);
        this.$message.error("加入购物车失败，请稍后重试");
      }
    }
  },
};
</script>

<style scoped>
.product-detail {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.product-container {
  display: flex;
  gap: 20px;
}

.product-image {
  width: 40%;
}

.product-img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.product-info {
  width: 60%;
}

.product-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-price {
  font-size: 20px;
  color: red;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-stock {
  font-size: 16px;
  color: #555;
}

.product-desc {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

.quantity-selector {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.quantity-selector button {
  padding: 5px 10px;
  font-size: 18px;
  cursor: pointer;
}

.quantity-selector span {
  margin: 0 10px;
  font-size: 18px;
}

.btn-group {
  margin-top: 20px;
}

.btn-group .el-button {
  margin-right: 10px;
  padding: 12px 30px;
  font-size: 16px;
}
</style>
