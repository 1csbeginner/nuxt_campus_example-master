<template>
  <div class="hotlist-container">
    <!-- 顶部导航菜单 -->
    <CampusMenu
      v-if="categoryObj != null"
      :categoryObj="categoryObj"
      @handleCategory="selectCategory"
      class="top-nav"
    ></CampusMenu>

    <!-- 热度榜 -->
    <div class="hidden-xs-only">
      <CampusSide :categoryObj="categoryObj"></CampusSide>
    </div>
  </div>
</template>

<script>
import CampusMenu from "@/components/Menu";
import CampusSide from "@/components/CampusSide";
import touristApi from "@/api/tourist";

export default {
  components: { CampusMenu, CampusSide },
  data() {
    return {
      categoryObj: null, // 分类数据
    };
  },
  created() {
    this.getAllCategorys();
  },
  methods: {
    // 获取全部分类
    getAllCategorys() {
      touristApi
        .getCategoryList()
        .then((response) => {
          this.categoryObj = response.data;
        })
        .catch((error) => {
          console.error("Failed to fetch categories:", error);
        });
    },
    // 处理分类选择
    selectCategory(categoryId) {
      console.log("Selected category:", categoryId);
    },
  },
};
</script>

<style scoped>
.hotlist-container {
  max-width: 1122px;
  margin: 0 auto;
  margin-top: 2px;
}

.top-nav {
  margin-bottom: 20px; /* 给导航菜单和热度榜之间留出间距 */
}

.hidden-xs-only {
  background-color: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.hidden-xs-only:hover {
  background-color: rgba(255, 255, 255, 0.9) !important;
}
</style>
