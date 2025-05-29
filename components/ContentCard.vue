<template>
  <el-card class="content-card" shadow="hover">
    <div slot="header" class="card-header">
      <span class="category-tag">{{ content.params.categoryName }}</span>
      <span class="post-time">{{ content.createTime }}</span>
    </div>

    <div class="card-content">
      <div class="content-main">
        <span class="content-text">
          {{ content.content }}
          <el-tag
            v-if="content.needHelp === 1"
            type="danger"
            size="small"
            class="help-tag"
          >求助</el-tag>
        </span>
      </div>

      <div class="content-info">
        <el-tag :type="getStatusType(content.status)" size="small">
          {{ handleStatus(content.status) }}
        </el-tag>
        <el-tag type="info" size="small">
          {{ content.type === 0 ? "文字" : content.type === 1 ? "图片" : "视频" }}
        </el-tag>
        <el-tag type="warning" size="small">
          {{ content.isAnonymous === 0 ? "不匿名" : "匿名" }}
        </el-tag>
      </div>

      <div class="content-actions">
        <el-button
          type="text"
          @click="$emit('view', content.contentId)"
        >
          <i class="el-icon-view"></i> 查看
        </el-button>
        <el-button
          type="text"
          style="color: #ff4949;"
          @click="$emit('delete', content.contentId)"
        >
          <i class="el-icon-delete"></i> 删除
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ContentCard',
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleStatus(status) {
      switch (status) {
        case 0: return "审核中";
        case 1: return "正常";
        case 2: return "下架";
        case 3: return "审核不通过";
        default: return "审核中";
      }
    },
    getStatusType(status) {
      switch (status) {
        case 0: return "warning";
        case 1: return "success";
        case 2: return "info";
        case 3: return "danger";
        default: return "warning";
      }
    }
  }
}
</script>

<style scoped>
.content-card {
  margin-bottom: 16px;
  height: 100%;
  transition: all 0.3s;
}

.content-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-tag {
  font-weight: bold;
  color: #409EFF;
}

.post-time {
  color: #909399;
  font-size: 0.9em;
}

.card-content {
  display: flex;
  flex-direction: column;
  height: calc(100% - 60px);
}

.content-main {
  flex-grow: 1;
  margin-bottom: 16px;
}

.content-text {
  font-size: 1.1em;
  line-height: 1.6;
}

.help-tag {
  margin-left: 8px;
}

.content-info {
  margin-bottom: 16px;
}

.content-info .el-tag {
  margin-right: 8px;
}

.content-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
  border-top: 1px solid #EBEEF5;
}

.content-actions .el-button {
  margin-left: 16px;
}
</style>
