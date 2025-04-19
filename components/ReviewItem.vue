<template>
  <div class="order-card">
    <div class="order-header">
      <span>下单时间：{{ order.createTime }}</span>
    </div>

    <div class="order-body">
      <img :src="getImg(order.product.image || order.image)" alt="商品图片" class="order-img" />
      <div class="order-info">
        <h3>{{ order.product.name }}</h3>
        <p>数量：{{ order.quantity }}</p>
      </div>

      <div class="order-actions">

        <!-- 如果订单已完成，未评价 -->
        <el-button
          v-if="order.isFinished === 1 && !order.pcomment && !isReviewing"
          type="success"
          size="small"
          @click="startReview"
        >
          去评价
        </el-button>
      </div>
    </div>

    <!-- 已评价：展示评论内容 + 修改按钮 -->
    <div v-if="order.bcomment && !isReviewing" class="review-section">
      <p><strong>买家评价：</strong>{{ order.bcomment }}</p>
      <el-button type="text" size="small" @click="editReview">修改评价</el-button>
    </div>

    <!-- 正在编辑或首次评价 -->
    <div v-if="isReviewing" class="review-section">
      <el-input
        v-model="reviewInput"
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
        isReviewing: false,
        reviewInput: "",
        isSubmitting: false,
      };
    },
    methods: {
      getImg(img) {
        return shopApi.getProductImg(img);
      },
      confirmReceive() {
        this.$emit("confirm-receive", this.order.id);
      },
      startReview() {
        this.reviewInput = "";
        this.isReviewing = true;
      },
      editReview() {
        this.reviewInput = this.order.bcomment;
        this.isReviewing = true;
      },
      cancelReview() {
        this.isReviewing = false;
        this.reviewInput = "";
      },
      submitReview() {
        if (!this.reviewInput.trim()) {
          this.$message.warning("评价内容不能为空！");
          return;
        }

        this.isSubmitting = true;

        // 发送修改后的评论内容
        shopApi.submitOrder(this.order.id, this.orderInput)
          .then(() => {
            this.isSubmitting = false;
            this.$message.success("评价提交成功！");
            this.isReviewing = false;

            // 通知父组件刷新评论内容（父组件需要更新 orderList）
            this.$emit("refresh-order", this.order.id);
          })
          .catch(() => {
            this.isSubmitting = false;
            this.$message.error("提交失败，请稍后再试！");
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

