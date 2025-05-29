<template>
  <div class="app-container">
    <el-row>
      <el-col :xs="2" :sm="5" :md="5" :lg="6" :xl="6"
        ><div class="grid-content"></div
      ></el-col>
      <el-col :xs="20" :sm="15" :md="14" :lg="12" :xl="12"
        ><div class="grid-content text">
          发布管理
          <svg
            t="1638267182271"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9319"
            data-spm-anchor-id="a313x.7781069.0.i31"
            width="30"
            height="30"
          >
            <path
              d="M511.3 860.7c-2 0-3.9-0.4-5.9-1.2-1-0.4-104.6-44.1-165.5-44.1-31.7 0-55.8 6.2-79.1 12.2-22.6 5.8-45.9 11.8-74.6 11.8-28.9 0-51.5-15.9-63.8-44.8-8.6-20.2-9.4-40.2-9.4-41V283.8c0-33.1 10.2-59.9 30.3-79.7 28.4-28 75.3-41.1 143.2-40.1h83.1c51.1 0 86.4 8.4 111 26.3 29 21.1 43.1 54.9 43.1 103.5V604c0 8.3-6.7 15-15 15s-15-6.7-15-15V293.8c0-72.8-33.6-99.8-124.1-99.8h-83.4c-58.7-0.9-99.7 9.7-121.8 31.5-14.4 14.1-21.4 33.2-21.4 58.3v468.9c0.2 4.3 3.6 56.7 43.2 56.7 24.9 0 45.4-5.3 67.2-10.9 25.1-6.5 51.1-13.1 86.6-13.1 67 0 172.7 44.6 177.2 46.5 7.6 3.2 11.2 12 7.9 19.7-2.4 5.6-7.9 9.1-13.8 9.1z"
              p-id="9320"
              data-spm-anchor-id="a313x.7781069.0.i35"
              class=""
              fill="#707070"
            ></path>
            <path
              d="M508 860.7c-5.8 0-11.4-3.4-13.8-9.1-3.2-7.6 0.3-16.4 7.9-19.7 4.5-1.9 110.2-46.5 177.2-46.5 35.5 0 61.4 6.7 86.6 13.1 21.7 5.6 42.2 10.9 67.2 10.9 39.5 0 43-52.1 43.2-56.7V283.8c0-25.1-7-44.2-21.3-58.3-22.1-21.8-63.1-32.4-121.8-31.5h-83.4c-90.5 0-124.1 27.1-124.1 99.8V604c0 8.3-6.7 15-15 15s-15-6.7-15-15V293.8c0-48.6 14.1-82.5 43.1-103.5 24.7-17.9 59.9-26.3 111-26.3h83.1c67.9-1 114.7 12.1 143.2 40.1 20.1 19.8 30.3 46.6 30.3 79.7v469.7c0 0.8-0.8 20.8-9.4 41-12.3 28.9-35 44.8-63.8 44.8-28.7 0-52.1-6-74.6-11.8-23.3-6-47.4-12.2-79.1-12.2-60.9 0-164.4 43.7-165.5 44.1-2 0.9-4 1.3-6 1.3zM418 335H222c-8.3 0-15-6.7-15-15s6.7-15 15-15h196c8.3 0 15 6.7 15 15s-6.7 15-15 15zM418 463.1H222c-8.3 0-15-6.7-15-15s6.7-15 15-15h196c8.3 0 15 6.7 15 15s-6.7 15-15 15zM418 590.9H222c-8.3 0-15-6.7-15-15s6.7-15 15-15h196c8.3 0 15 6.7 15 15s-6.7 15-15 15z"
              p-id="9321"
              data-spm-anchor-id="a313x.7781069.0.i32"
              class=""
              fill="#515151"
            ></path>
            <path
              d="M802.1 335h-196c-8.3 0-15-6.7-15-15s6.7-15 15-15h196c8.3 0 15 6.7 15 15s-6.7 15-15 15zM802.1 463.1h-196c-8.3 0-15-6.7-15-15s6.7-15 15-15h196c8.3 0 15 6.7 15 15s-6.7 15-15 15zM802.1 590.9h-196c-8.3 0-15-6.7-15-15s6.7-15 15-15h196c8.3 0 15 6.7 15 15s-6.7 15-15 15z"
              p-id="9322"
              data-spm-anchor-id="a313x.7781069.0.i33"
              class=""
              fill="#1afa29"
            ></path>
          </svg></div
      ></el-col>
      <el-col :xs="2" :sm="4" :md="5" :lg="6" :xl="6"
        ><div class="grid-content"></div
      ></el-col>
    </el-row>

    <!-- 内容展示部分 -->
    <el-row>
      <el-col :xs="0" :sm="2"><div class="grid-content"></div></el-col>
      <el-col :xs="24" :sm="20" style="margin: 0 auto">
        <!-- 卡片网格 -->
        <el-row :gutter="20" class="content-grid">
          <el-col
            v-for="item in contentList"
            :key="item.contentId"
            :xs="24"
            :sm="12"
            class="content-col"
          >
            <content-card
              :content="item"
              @view="lookByCid"
              @delete="dialogOpen"
            />
          </el-col>
        </el-row>

        <!-- 分页 -->
        <el-pagination
          :current-page="currentPage"
          :page-size="limit"
          :total="total"
          layout="prev, pager, next"
          style="padding: 30px 0; text-align: center"
          @current-change="handleCurrentChange"
        />
      </el-col>
      <el-col :xs="0" :sm="2"><div class="grid-content"></div></el-col>
    </el-row>

    <!-- 删除确认对话框 -->
    <el-dialog
      style="font-weight: bolder"
      title="提示"
      :visible.sync="dialogVisible"
    >
      <p style="text-align: center; font-weight: bolder">
        <i
          class="el-icon-warning"
          style="color: red; font-size: 25px"
        />&nbsp;&nbsp;您要确认删除这条内容吗？
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="deleteByCid()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import operateApi from "@/api/operate";
import touristApi from "@/api/tourist";
import { getToken } from "@/utils/auth";
import ContentCard from "@/components/ContentCard.vue";

export default {
  components: {
    ContentCard,
  },
  data() {
    return {
      dialogVisible: false,
      currentPage: 1,
      limit: 10,
      contentList: [],
      total: 0,
      multipleSelection: [],
      cid: {},
      selectAid: "",
      messagessd: "",
      form: {
        categoryId: null,
        content: "",
        status: null,
        type: null,
        isAnonymous: null,
        needHelp: null,
      },
      categoryOptions: [],
      dict: {
        type: {
          campus_content_status: [],
          campus_content_type: [],
          campus_anonymous: [],
        },
      },
    };
  },
  created() {
    if (getToken() === undefined) {
      this.$router.push({ path: "/userlogin", query: { id: "1" } });
    } else {
      this.getList(this.currentPage);
    }
  },
  mounted() {
    this.messagessd = this.$route.query.types;
    if (this.messagessd == "1") {
      this.open1();
    }
  },
  methods: {
    handleStatus(status) {
      switch (status) {
        case 0:
          return "审核中";
        case 1:
          return "正常";
        case 2:
          return "下架";
        case 3:
          return "审核不通过";
        default:
          return "审核中";
      }
    },
    lookByCid(value) {
      this.$router.push({ path: "/c/" + value });
    },
    open1() {
      const h = this.$createElement;
      this.$notify({
        title: "提交成功!",
        message: h(
          "i",
          { style: "color: teal" },
          "请耐心等待管理员审核，审核通过后即可在首页显示！"
        ),
      });
    },
    deleteByCid() {
      operateApi.deleteContent(this.selectAid).then((response) => {
        this.$notify({
          title: "提示：",
          message: this.$createElement(
            "i",
            { style: "color: red" },
            "删除成功!"
          ),
        });
        this.getList(this.currentPage);
        this.dialogVisible = false;
      });
    },
    dialogOpen(id) {
      this.dialogVisible = true;
      this.selectAid = id;
    },
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },
    getList(page) {
      this.currentPage = page;
      const params = {
        pageNum: this.currentPage,
        pageSize: this.limit,
      };
      operateApi
        .ownContents(params)
        .then((response) => {
          this.contentList = response.rows;
          this.total = parseInt(response.total);
        })
        .catch((error) => {});
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getList(this.currentPage);
    },
  },
};
</script>

<style>
.text2 {
  text-align: center;
}
.dfg {
  margin: 0 20px 0 20px;
  font-weight: bolder;
}
.texts {
  font-weight: bolder;
}
.text {
  font-size: 20px;
  text-align: center;
  font-weight: bolder;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

/* 卡片网格样式 */
.content-grid {
  margin-top: 20px;
}

.content-col {
  margin-bottom: 20px;
}
</style>
