<template>
  <div class="order-card">
    <div class="order-header">
      <span>订单编号：{{ order.id }}</span>
      <span>下单时间：{{ order.createTime }}</span>
    </div>

    <div class="order-body">
      <img
        :src="getImg(order.product.image)"
        alt="商品图片"
        class="order-img"
      />
      <div class="order-info">
        <h3>{{ order.product.name }}</h3>
        <p>价格：¥{{ order.product.price }}</p>
        <p>数量：{{ order.quantity }}</p>
        <h4>总价： ￥{{ order.price }}</h4>
        <p>状态：{{ order.isFinished === 1 ? '已完成' : '待收货' }}</p>
      </div>
      <div class="order-actions">
        <!-- 确认收货按钮 -->
        <el-button
          v-if="order.isFinished === 0"
          type="primary"
          size="small"
          @click="confirmReceive"
        >
          确认收货
        </el-button>

        <!-- 去评价按钮 -->
        <el-button
          v-if="order.isFinished === 1 && !isReviewing"
          type="success"
          size="small"
          @click="startReview"
        >
          去评价
        </el-button>
      </div>
    </div>

    <!-- 显示评论框 -->
    <div v-if="isReviewing" class="review-section">
      <el-input
        v-model="reviewContent"
        type="textarea"
        placeholder="请输入您的评价..."
        rows="4"
        maxlength="500"
      />
      <el-button
        type="primary"
        size="small"
        @click="submitReview"
        :loading="isSubmitting"
      >
        提交评价
      </el-button>

      <el-button
        type="text"
        size="small"
        @click="cancelReview"
      >
        返回
      </el-button>
    </div>
  </div>
</template>

<script>
import shopApi from "@/api/shop";

export default {
  props: {
    order: Object,
  },
  data() {
    return {
      isReviewing: false, // 控制评价框是否显示
      reviewContent: "",  // 存储评价内容
      isSubmitting: false, // 控制提交按钮的加载状态
    };
  },
  methods: {
    getImg(img) {
      return shopApi.getProductImg(img);
    },
    confirmReceive() {
      this.$emit('confirm-receive', this.order.id);
    },
    startReview() {
      this.isReviewing = true; // 显示评论框
    },
    cancelReview() {
      this.isReviewing = false; // 隐藏评论框，恢复显示去评价按钮
      this.reviewContent = "";  // 清空评论内容
    },
    submitReview() {
      if (!this.reviewContent.trim()) {
        this.$message.warning("评价内容不能为空！");
        return;
      }

      this.isSubmitting = true; // 启动加载状态
      // 假设提交评价的 API 为 shopApi.submitReview
      shopApi.submitReview(this.order.id, this.reviewContent)
        .then(() => {
          this.isSubmitting = false;
          this.$message.success("评价提交成功！");
          this.isReviewing = false; // 隐藏评论框
          this.reviewContent = ""; // 清空评论内容
        })
        .catch(() => {
          this.isSubmitting = false;
          this.$message.error("评价提交失败，请稍后再试！");
        });
    },
  },
};
</script>

<style scoped>
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

.review-section {
  margin-top: 16px;
  padding: 12px;
  background-color: #f9f9f9;
  border-radius: 6px;
}

.review-section .el-input {
  margin-bottom: 10px;
}

.review-section .el-button {
  margin-top: 10px;
}
</style>
