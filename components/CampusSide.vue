<template>
  <div class="campus-side">
    <div class="campus-side-main">
      <!-- 热度榜 -->
      <div class="wbpro-side-tit woo-box-flex woo-box-alignCenter">
        <div class="campus-side-title woo-box-item-flex">热度榜</div>
      </div>
      <div class="woo-divider-main woo-divider-x"></div>
      <div class="campus-side-card">
        <div
          v-for="(item, keys) in simpleHotList.slice(0, 7)"
          :key="keys"
          class="campus-side-panel"
          style="padding: 0 18px;"
        >
          <el-link :href="'c/' + item.contentId" target="_blank">
            <div class="con woo-box-flex woo-box-alignCenter">
              <div class="side-rank-num">{{ keys + 1 }}</div>
              <div class="side-f12" style="margin-right: 10px; color: #333">
                {{ item.content }}
              </div>
              <div class="side-f12" style="color: #939393">
                {{ item.loveCount }}
              </div>
            </div>
          </el-link>
          <div class="woo-divider-main woo-divider-x"></div>
        </div>
      </div>

      <!-- 推荐榜 -->
        <div class="wbpro-side-tit woo-box-flex woo-box-alignCenter" style="margin-top: 20px;">
          <div class="campus-side-title woo-box-item-flex">可能感兴趣的求助</div>
        </div>
        <div class="woo-divider-main woo-divider-x"></div>
      <!-- 推荐榜和标签编辑区域（仅登录时显示） -->
      <div v-if="loginUserId">

        <!-- 推荐内容 -->
        <div class="campus-side-card">
          <div
            v-for="(item, keys) in recommendedList.slice(0, 7)"
            :key="'rec-' + keys"
            class="campus-side-panel"
            style="padding: 0 18px"
          >
            <el-link :href="'c/' + item.contentId" target="_blank">
              <div class="con woo-box-flex woo-box-alignCenter">
                <div class="side-rank-num">{{ keys + 1 }}</div>
                <div class="side-f12" style="margin-right: 10px; color: #333">
                  {{ item.content }}
                </div>
                <div class="side-f12" style="color: #939393">
                  {{ item.loveCount }}
                </div>
              </div>
            </el-link>
            <div class="woo-divider-main woo-divider-x"></div>
          </div>
        </div>

        <!-- 标签编辑区域 -->
        <div class="tag-selection" style="padding: 10px 18px">
          <div class="woo-box-flex woo-box-alignCenter" style="justify-content: space-between;">
            <label>我的兴趣标签：</label>
            <el-button
              v-if="!isEditingTags"
              type="text"
              size="medium"
              @click="isEditingTags = true"
            >编辑</el-button>
            <div v-else>
              <el-button size="mini" @click="saveTags">保存</el-button>
              <el-button size="mini" @click="cancelEdit">取消</el-button>
            </div>
          </div>

          <div class="tag-list" style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 8px;">
            <!-- 非编辑模式 -->
            <template v-if="!isEditingTags">
              <div
                v-for="tag in selectedTags"
                :key="tag.categoryId"
                class="tag-box"
              >
                {{ tag.categoryName }}
              </div>
            </template>

            <!-- 编辑模式 -->
            <template v-else>
              <div
                v-for="tag in availableTags"
                :key="'edit-' + tag.categoryId"
                class="tag-box"
                :class="{ active: tempSelectedTags.find(temptag => temptag.categoryId === tag.categoryId) }"
                @click="toggleTag(tag)"
              >
                <span>{{ tag.categoryName }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import touristApi from "@/api/tourist";
import operateApi from "@/api/operate";
import { getToken } from "@/utils/auth";

export default {
  components: {},
  props: {
    categoryObj: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      simpleHotList: [], // 热度榜数据
      recommendedList: [], // 推荐榜数据
      isEditingTags: false, // 是否处于标签编辑模式
      selectedTags: [], // 用户已选的标签
      tempSelectedTags: [], // 编辑时的临时标签
      availableTags: [], // 可选标签列表
      loginUserId: null, // 登录用户ID
      isInitializing: false, // 控制初始加载状态
      isLoadingTags: false, // 控制标签加载状态
      isLoadingRecommended: false, // 控制推荐列表加载状态
      sessionStoragePollInterval: null, // 轮询定时器
    };
  },
  created() {
    // 加载热度榜（无需登录）
    this.getSimpleHotContent();

  },

  mounted(){
    // 初始化 loginUserId，兼容 SSR
    this.initializeUserId();
    // 启动 sessionStorage 轮询
    this.startSessionStoragePolling();
  },
  watch: {
    loginUserId(newId) {
      console.log("loginUserId 变化:", newId); // 调试用
      if (newId) {
        console.log("loginUserId 有效，开始加载推荐数据");
        this.loadInitialData();
      } else {
        console.log("loginUserId 无效，清除推荐数据");
        this.recommendedList = [];
        this.selectedTags = [];
        this.tempSelectedTags = [];
        this.availableTags = [];
      }
    },
    categoryObj(newVal) {
      // 仅在登录且 categoryObj 有效时更新可用标签
      if (this.loginUserId && Array.isArray(newVal) && newVal.length > 0) {
        this.filterCategoryData();
      }
    },
  },
  methods: {
    async initializeUserId() {
      // 获取 loginUserId，兼容 SSR
      if (typeof window !== "undefined" && getToken()) {
        this.loginUserId = sessionStorage.getItem("userId") || null;
        console.log("loginUserId 初始化 (sessionStorage):", this.loginUserId);
      }
    },
    startSessionStoragePolling() {
      // 仅在浏览器环境中启动轮询，兼容 SSR
      if (typeof window === "undefined") return;

      // 每 500ms 检查 sessionStorage.userId
      this.sessionStoragePollInterval = setInterval(() => {
        const currentUserId = sessionStorage.getItem("userId") || null;
        if (currentUserId !== this.loginUserId) {
          console.log("sessionStorage.userId 变化:", currentUserId);
          this.loginUserId = currentUserId; // 触发 watch: loginUserId
          // 如果检测到有效 userId，立即停止轮询
          if (currentUserId) {
            clearInterval(this.sessionStoragePollInterval);
            this.sessionStoragePollInterval = null;
            console.log("检测到有效 userId，停止轮询");
          }
        }
      }, 500);
    },
    async loadInitialData() {
      this.isInitializing = true;
      try {
        await this.fetchUserTags();
        if (Array.isArray(this.categoryObj) && this.categoryObj.length > 0) {
          this.filterCategoryData();
          await this.getRecommendedList();
        } else {
          console.log("categoryObj 为空或不是数组，跳过推荐列表加载");
        }
      } catch (err) {
        console.error("初始数据加载失败", err);
        this.$message.error("加载推荐数据失败，请刷新重试");
      } finally {
        this.isInitializing = false;
      }
    },
    getSimpleHotContent() {
      touristApi
        .getSimpleHotContent()
        .then((response) => {
          this.simpleHotList = response.data || [];
          console.log("热度榜加载完成", this.simpleHotList);
        })
        .catch((err) => {
          console.error("获取热度榜失败", err);
          this.$message.error("加载热度榜失败");
        });
    },
    async fetchUserTags() {
      if (!this.loginUserId || this.isLoadingTags) return;
      this.isLoadingTags = true;
      try {
        const response = await operateApi.getUserTags({ userid: this.loginUserId });
        const userTags = response.rows || [];
        this.selectedTags = userTags.map((tag) => ({
          categoryId: tag.category,
          categoryName: tag.categoryEntity.categoryName,
        }));
        this.tempSelectedTags = [...this.selectedTags];
        console.log("用户标签加载完成", this.selectedTags);
      } catch (err) {
        console.error("获取用户标签失败", err);
        this.$message.error("加载用户标签失败");
        throw err;
      } finally {
        this.isLoadingTags = false;
      }
    },
    filterCategoryData() {
      if (this.availableTags.length && this.categoryObj[0]?.categoryId === this.availableTags[0].categoryId) {
        console.log("使用缓存的 availableTags");
        return;
      }
      this.availableTags = this.categoryObj
        .filter((item) => !item.categoryName.includes("墙"))
        .map((item) => ({
          categoryId: item.categoryId,
          categoryName: item.categoryName,
        }));
      console.log("availableTags 更新", this.availableTags);
    },
    async getRecommendedList() {
      if (!this.loginUserId || this.isLoadingRecommended || !this.selectedTags.length) {
        console.log("跳过推荐列表加载：", {
          loginUserId: this.loginUserId,
          isLoadingRecommended: this.isLoadingRecommended,
          hasSelectedTags: this.selectedTags.length > 0,
        });
        return;
      }
      this.isLoadingRecommended = true;
      try {
        const tagIds = this.selectedTags.map((tag) => tag.categoryId);
        console.log("获取推荐列表，使用的标签ID：", tagIds);
        const response = await operateApi.getRecommend(tagIds);
        this.recommendedList = response.data;
        console.log("推荐列表加载完成", this.recommendedList);
      } catch (err) {
        console.error("获取推荐列表失败", err);
        this.$message.error("加载推荐列表失败");
        throw err;
      } finally {
        this.isLoadingRecommended = false;
      }
    },
    toggleTag(tag) {
      if (!this.isEditingTags) return;
      const index = this.tempSelectedTags.findIndex(
        (temptag) => temptag.categoryId === tag.categoryId
      );
      if (index > -1) {
        this.tempSelectedTags.splice(index, 1);
      } else {
        this.tempSelectedTags.push(tag);
      }
    },
    async saveTags() {
      this.selectedTags = [...this.tempSelectedTags];
      this.isEditingTags = false;
      const requestData = this.selectedTags.map((tag) => tag.categoryId);
      try {
        await operateApi.addUserTags(requestData);
        this.$message.success("保存标签成功");
        await this.getRecommendedList();
      } catch (err) {
        console.error("保存标签失败", err);
        this.$message.error("保存标签失败");
      }
    },
    cancelEdit() {
      this.tempSelectedTags = [...this.selectedTags];
      this.isEditingTags = false;
    },
  },
};
</script>

<style scoped>
.campus-side {
  background-color: #fff;
  width: 100%;
  margin-left: 8px;
  position: sticky;
  top: 70px; /* 调整为顶部导航栏高度 + 20px */
  height: calc(100vh - 70px);
  overflow-y: auto;
}
.campus-side-main {
  position: sticky;
  width: 100%;
  top: 45px;
}
.campus-side-card .con {
  position: relative;
  height: 40px;
  padding: 0 30px 0 24px;
  overflow: hidden;
  white-space: nowrap;
}
.wbpro-side-tit {
  height: 40px;
  padding: 0 18px;
}
.campus-side-title {
  align-self: center;
  font-size: 24px;
  line-height: 18px;
}
.side-rank-num {
  font-size: 20px;
  font-weight: 700;
  position: absolute;
  left: 0;
  text-align: center;
  width: 20px;
  color: #ff8200;
}
.side-f12 {
  font-size: 17px;
  line-height: 16px;
}

.category-box {
  padding: 4px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  color: #666;
}

.category-box.active {
  background-color: #67C23A;
  color: white;
  border-color: #67C23A;
}

.category-box:hover {
  border-color: #409EFF;
}

.tag-box {
  display: inline-block;
  padding: 4px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  background-color: #f5f5f5;
  color: #333;
  transition: all 0.2s;
}

.tag-box:hover {
  border-color: #409eff;
  background-color: #e6f0ff;
}

.tag-box.active {
  background-color: #67c23a;
  border-color: #67c23a;
  color: #fff;
}

:deep(.el-loading-mask) {
  background-color: rgba(255, 255, 255, 0.8);
}
:deep(.el-loading-spinner) {
  margin-top: -20px;
}
</style>
