<template>
  <div class="comment-card">
    <img class="avatar" :src="comment.userAvatar" alt="头像" />
    <div class="comment-content">
      <div class="comment-header">
        <span class="username">{{ comment.userName }}</span>
        <span class="time">{{ formatDate(comment.createTime) }}</span>
      </div>
      <!-- 星级评分 -->
      <div class="stars">
        <i
          v-for="n in 5"
          :key="n"
          class="el-icon-star-on"
          :class="{ filled: n <= comment.rating }"
        ></i>
      </div>
      <div class="comment-text">{{ comment.content }}</div>
      <!-- 商家回复 -->
      <div v-if="comment.reply" class="reply">
        <strong>商家回复：</strong>{{ comment.reply }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCommentCard",
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(timeStr) {
      const date = new Date(timeStr);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    },
  },
};
</script>

<style scoped>
.comment-card {
  display: flex;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  align-items: flex-start;
  background: #fff;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 12px;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #888;
  margin-bottom: 6px;
}

.username {
  font-weight: bold;
  color: #333;
}

.stars {
  margin: 4px 0;
}

.el-icon-star-on {
  color: #ccc;
  font-size: 16px;
  margin-right: 2px;
}

.filled {
  color: #f7ba2a; /* Element UI 默认的星星颜色 */
}

.comment-text {
  font-size: 15px;
  color: #444;
  line-height: 1.5;
  margin: 6px 0;
}

.reply {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
  background: #f9f9f9;
  padding: 8px;
  border-radius: 4px;
}
</style>
