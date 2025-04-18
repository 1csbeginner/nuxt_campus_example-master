<template>
  <div class="campus-side">
    <div class="campus-side-main">
      <!-- 热度榜 -->
      <div class="wbpro-side-tit woo-box-flex woo-box-alignCenter">
        <div class="campus-side-title woo-box-item-flex">热度榜</div>
      </div>
      <div class="woo-divider-main woo-divider-x"><!----></div>
      <div class="campus-side-card">
        <div
          v-for="(item, keys) in simpleHotList"
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
          <div class="woo-divider-main woo-divider-x"><!----></div>
        </div>
      </div>

      <!-- 推荐榜 -->
      <div class="wbpro-side-tit woo-box-flex woo-box-alignCenter" style="margin-top: 20px;">
        <div class="campus-side-title woo-box-item-flex">推荐榜</div>
      </div>
      <div class="woo-divider-main woo-divider-x"><!----></div>

      <!-- 标签编辑区域 -->
      <div class="tag-selection" style="padding: 10px 18px">
        <div class="woo-box-flex woo-box-alignCenter" style="justify-content: space-between;">
          <label>我的兴趣标签：</label>
          <el-button
            v-if="!isEditingTags"
            type="text"
            size="mini"
            @click="isEditingTags = true"
          >编辑</el-button>
          <div v-else>
            <el-button size="mini" @click="saveTags">保存</el-button>
            <el-button size="mini" @click="cancelEdit">取消</el-button>
          </div>
        </div>

        <div class="tag-list" style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 8px;">
          <!-- 非编辑模式 -->
          <template v-if="!isEditingTags && selectedTags.length > 0">
            <div
              v-for="tag in availableTags"
              :key="tag.categoryId"
              class="tag-box"
            >
              <!-- 只渲染已选的标签 -->
              <span v-if="selectedTags.includes(tag.categoryId)">
                {{ tag.categoryName }}
              </span>
            </div>
          </template>

          <!-- 编辑模式 -->
          <template v-else>
            <div
              v-for="tag in availableTags"
              :key="'edit-' + tag.categoryId"
              class="tag-box"
              :class="{ active: tempSelectedTags.includes(tag.categoryId) }"
              @click="toggleTag(tag.categoryId)"
            >
              {{ tag.categoryName }}
            </div>
          </template>
        </div>

      </div>

      <!-- 推荐内容 -->
      <div class="campus-side-card">
        <div
          v-for="(item, keys) in recommendedList"
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
          <div class="woo-divider-main woo-divider-x"><!----></div>
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
      simpleHotList: [],
      recommendedList: [],
      selectedCategories: [],  // 存储选中的分类Id
      isEditingTags: false,
      selectedTags: [],  // 用户已选的标签
      tempSelectedTags: [],  // 编辑时使用的标签
      availableTags: [],  // 可选标签列表
      loginUserId: null,  // 登录用户ID
    };
  },
  created() {
    this.getSimpleHotContent();
    this.fetchUserTags();  // 获取用户的标签
  },

  mounted() {
    if (getToken() !== undefined) {
      // this.loginUserId = this.$globalVariable.userInfoGlobal.userId;
    }
    console.log(this.$globalVariable);
  },

  watch: {
    categoryObj: {
      handler(newVal) {
        if (Array.isArray(newVal) && newVal.length > 0) {
          this.filterCategoryData(); // 处理分类数据
          this.getRecommendedList(); // 等数据真正传进来了再执行
        }
      },
      immediate: true, // 页面加载时如果已经有数据也能触发
      deep: true,
    },
  },
  methods: {
    getSimpleHotContent() {
      touristApi
        .getSimpleHotContent()
        .then((response) => {
          this.simpleHotList = response.data;
        })
        .catch();
    },

    // 获取用户已选标签
    fetchUserTags() {
      // operateApi
      //   .getUserTags( {userId : this.loginUserId} ) // 假设你有一个获取用户标签的 API
      //   .then((response) => {
      //     this.selectedTags = response.data;  // 假设返回的数据是已选择标签的ID列表
      //     console.log("用户标签", this.selectedTags);
      //     this.tempSelectedTags = [...this.selectedTags]; // 初始化临时标签
      //   })
      //   .catch((err) => {
      //     console.error("获取用户标签失败", err);
      //   });
    },

    filterCategoryData() {
      this.availableTags = this.categoryObj.map(item => ({
        categoryId: item.categoryId,
        categoryName: item.categoryName,
      }));
      console.log(this.availableTags);
    },

    getRecommendedList() {
      console.log(this.selectedCategories);  // 这里就用 selectedCategories 来获取已选的分类Id
    },

    toggleCategory(categoryId) {
      const index = this.selectedCategories.indexOf(categoryId);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);  // 如果已经选中，就取消
      } else {
        this.selectedCategories.push(categoryId);  // 否则就添加到已选列表
      }
      this.getRecommendedList();  // 更新推荐列表
    },

    toggleTag(tagId) {
      if (!this.isEditingTags) return;
      const index = this.tempSelectedTags.indexOf(tagId);
      if (index > -1) {
        this.tempSelectedTags.splice(index, 1);
      } else {
        if (this.tempSelectedTags.length < 3) {
          this.tempSelectedTags.push(tagId);
        } else {
          this.$message.warning("最多选择三个标签");
        }
      }
    },

    saveTags() {
      this.selectedTags = [...this.tempSelectedTags];
      this.isEditingTags = false;

      touristApi
        .saveUserTags(this.selectedTags)
        .then(() => {
          this.getRecommendedList();  // 更新推荐内容
        })
        .catch((err) => {
          console.error("保存标签失败", err);
        });
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
  margin: 20px 0 0 0;
  width: 280px;
  margin-left: 8px;
}
.campus-side-main {
  position: sticky;
  width: 280px;
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
  font-size: 14px;
  line-height: 18px;
}
.side-rank-num {
  font-size: 16px;
  font-weight: 700;
  position: absolute;
  left: 0;
  text-align: center;
  width: 20px;
  color: #ff8200;
}
.side-f12 {
  font-size: 12px;
  line-height: 16px;
}

.category-box {
  padding: 4px 10px;
  font-size: 12px;
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
  font-size: 12px;
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
</style>
