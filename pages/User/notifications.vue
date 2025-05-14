<template>
  <div class="inbox-container">
    <h2 class="inbox-title">收件箱</h2>
    <div v-if="comments.length > 0" class="inbox-list">
      <div
        v-for="(comment, index) in comments"
        :key="comment.commentId"
        class="inbox-item"
      >
        <el-avatar
          class="content-box-avatar"
          shape="circle"
          :size="40"
          :src="handleCampusUrl(comment.avatar)"
        ></el-avatar>
        <div class="inbox-content">
          <div class="inbox-header">
            <span class="inbox-nickname">{{ comment.userNickName }} 回复了：</span>
            <span class="inbox-time">{{ formatTime(comment.createTime) }}</span>
          </div>
          <div class="inbox-message">
            {{ comment.coContent }}
          </div>
          <div class="inbox-actions">
            <el-button
              type="text"
              size="mini"
              @click="goToContent(comment.contentId)"
            >
              查看详情
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="inbox-empty">
      暂无消息
    </div>
    <div class="inbox-pagination">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next"
        @current-change="handlePageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import operateApi from "@/api/operate"; // 假设有一个 API 方法来获取收件箱评论

export default {
  name: "Inbox",
  data() {
    return {
      comments: [], // 评论列表
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示条数
      total: 0, // 总评论数
    };
  },
  created() {
    this.fetchComments();
  },
  methods: {
    // 获取评论列表
    fetchComments() {
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      };
      operateApi.getInboxComments(params).then((response) => {
        this.comments = response.rows || [];
        this.total = response.total || 0;
      });
    },
    // 格式化时间
    formatTime(time) {
      const date = new Date(time);
      return date.toLocaleString();
    },
    // 跳转到内容页面
    goToContent(contentId) {
      this.$router.push(`/c/${contentId}`);
    },
    // 分页切换
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchComments();
    },
  },
};
</script>

<style>
.inbox-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.inbox-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}
.inbox-list {
  margin-bottom: 20px;
}
.inbox-item {
  display: flex;
  align-items: flex-start;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}
.inbox-avatar {
  margin-right: 10px;
}
.inbox-content {
  flex: 1;
}
.inbox-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
.inbox-nickname {
  font-weight: bold;
  color: #333;
}
.inbox-time {
  font-size: 12px;
  color: #999;
}
.inbox-message {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}
.inbox-actions {
  text-align: right;
}
.inbox-empty {
  text-align: center;
  color: #999;
  font-size: 16px;
  margin: 20px 0;
}
.inbox-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
