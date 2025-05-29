<template>
  <div class="index-container">
    <!-- 顶部导航菜单 -->
    <CampusMenu
      v-if="categoryObj != null"
      :categoryObj="categoryObj"
      @handleCategory="selectCatrgory"
    ></CampusMenu>

    <div class="index-bg">
      <div class="woo-box-flex" :style="{ 'min-height': mainMinHeight + 'px' }">
        <!-- 消息盒子 -->
        <div class="content-t" v-loading="loading">
          <Content
            v-for="(item, key) in contentObj"
            :key="item.contentId"
            :contentObj="item"
            :loveContentIds="loveContentIds"
          ></Content>
          <!-- 分页 -->
          <div class="fenye" v-if="!loading">
            <el-pagination
              :hide-on-single-page="true"
              background
              layout="prev, pager, next"
              :total="total"
              :current-page="currentPage"
              :page-size="5"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//api
import touristApi from "@/api/tourist";
import operateApi from "@/api/operate";

import cookie from "js-cookie";

import { getToken, setToken, removeToken } from "@/utils/auth";
//引用组件
import Content from "@/components/Content";
import CampusMenu from "@/components/Menu";

export default {
  components: { Content, CampusMenu },
  data() {
    return {
      //菜单分类
      categoryObj: null,
      //墙内容
      contentObj: [],
      //点赞的墙列表
      loveContentIds: [],
      contentVo: {
        pageNum: 1,
        categoryId: null,
      },
      //最低高度
      mainMinHeight: "",
      //是否加载
      loading: true,
      total: 0,
      currentPage: 1,
    };
  },

  //创建的时候自动调用
  created() {
    this.getAllCategorys();
    this.getContent(this.contentVo);
  },
  //创建后
  mounted() {
    this.mainMinHeight = document.documentElement.clientHeight - 45;
    this.contentVo.pageNum = 1;
  },
  methods: {
    //点击菜单后（子组件传递数据）
    selectCatrgory(data) {
      this.contentVo.categoryId = data;
      this.getContent(this.contentVo);
    },

    //获取全部分类
    getAllCategorys() {
      touristApi
        .getCategoryList()
        .then((response) => {
          this.categoryObj = response.data;
        })
        .catch();
    },
    //获取所有内容
    getContent(contentVo) {
      this.loading = true;
      touristApi
        .getContent(contentVo)
        .then((response) => {
          this.contentObj = response.rows;
          this.total = parseInt(response.total);
          this.loveContentIds = response.loveContentIds;
          this.loading = false;
        })
        .catch((response) => {});
    },
    //当页数改变的时候
    handleCurrentChange(val) {
      this.contentVo.pageNum = val;
      this.currentPage = this.contentVo.pageNum;
      this.getContent(this.contentVo);
    },
  },
};
</script>
<style>
  .index-container {
    max-width: 1122px; /* 设置最大宽度与 index-bg 一致 */
    margin: 0 auto; /* 居中对齐 */
  }

  .index-bg {
    max-width: 1122px; /* 设置最大宽度 */
    margin: 0 auto; /* 水平居中 */
    border-radius: 10px;
    display: flex; /* 启用弹性布局 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    flex-direction: column; /* 垂直排列内容 */
  }

  .campus-menu {
    width: 100%; /* 确保导航栏宽度与容器一致 */
  }

  .content-t {
    margin: 20px 0;
  }

  .fenye {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
</style>
