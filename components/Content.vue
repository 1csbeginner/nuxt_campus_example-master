<template>
  <!-- 消息盒子 -->
  <div class="content-box" :style="contentWidth">
    <!-- 头像，用户名 -->
    <div class="content-box-top box--flex">
      <el-avatar
        class="content-box-avatar"
        shape="circle"
        :size="50"
        :src="handleCampusUrl(contentObj.params.avatar)"
      ></el-avatar>
      <div
        class="box--flex"
        style="height: 100%; justify-content: center; flex-direction: column"
      >
        <div class="box--flex" style="margin-bottom: 7px; font-weight: bolder">
          <span class="nickName">
            {{ contentObj.params.nickName }}
          </span>
        </div>
        <div class="box--flex">
          <div class="content-finish-tag" v-if="contentObj.bestanswer !== null">
            <div>已解决</div>
          </div>
          <div class="content-help-tag" v-if="contentObj.needHelp === 1">
            <div>求助</div>
          </div>
          <div class="content-category-tag">
            <div>{{ contentObj.params.categoryName }}</div>
          </div>

          <span class="content-box-time">
            {{ parseTime(contentObj.createTime, "{y}-{m}-{d} {h}:{i}") }}
          </span>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div
      class="content-feed-content"
      style="padding-left: 60px; margin: 0px 10px 0 0"
    >
      <div class="content-feed-ogText">
        <!-- 文字 -->
        <div style="white-space: pre-wrap">{{ contentObj.content }}</div>
      </div>
      <!-- 信息墙的图片/视频 -->
      <div style="margin-top: 10px">
        <ContentFile
          v-if="contentObj.type != 0"
          :fileUrls="contentObj.fileUrl"
          :contentType="contentObj.type"
        ></ContentFile>
      </div>
    </div>

    <!-- 信息墙底部 -->
    <ContentBottom
      :zanBoolean="zanBoolean"
      :contentObj="contentObj"
    ></ContentBottom>
  </div>
</template>

<script>
//组件
import ContentBottom from "@/components/ContentBottom";
import ContentFile from "@/components/ContentFile";

import { getToken, setToken, removeToken } from "@/utils/auth";

export default {
  name: "Content",
  props: ["contentObj", "loveContentIds"],
  //import引入的组件需要注入到对象中才能使用
  components: { ContentBottom, ContentFile },
  data() {
    //这里存放数据
    return {
      //是否点赞
      zanBoolean: false,
      contentWidth: "width:900px;",
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let width = document.documentElement.clientWidth;
    if (width < 642) {
      this.contentWidth = "";
    }
    this.isZan(this.contentObj.contentId);
  },
  watch: {
    contentObj: {
      handler(newVal, oldVal) {
        // console.log(newVal);
        this.isZan(newVal.contentId);
      },
      deep: true,
      immediate: true,
    },
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    //判断是否被点赞
    isZan(contentId) {
      if (this.loveContentIds.indexOf(contentId) == -1) {
        this.zanBoolean = false;
      } else {
        this.zanBoolean = true;
      }
    },
  },
};
</script>
<style>
.content-box {
  /* box-shadow: 0 10px 12px 0 rgba(0, 0, 0, 0.2); */
  margin: 0 0 0 0;
  padding: 20px 20px 0;
  background-color: rgba(255, 255, 255, 0.7);
  /* box-shadow: 0px 0px 25px rgb(0 0 0 / 10%); */
  border: 1px solid rgba(255, 255, 255, 0.5);
  /* border-right: 1px solid rgba(255, 255, 255, 0.2); */
  /* border-bottom: 1px solid rgba(255, 255, 255, 0.2); */
  border-radius: 0px;
}
.box--flex {
  display: flex;
}
.content-box-top {
  height: 50px;
}
.content-feed-ogText {
  color: #333;
  font-size: 14px;
  line-height: 24px;
}
.content-footer {
  height: 40px;
  line-height: 40px;
  margin: 0 15px;
}
.nickName {
  font-size: 15px;
  font-weight: bold;
}
.content-box-time {
  font-size: 12px;
  color: darkgrey;
}
.content-category-tag {
  margin-right: 4px;
  font-size: 12px;
  display: inline-block;
  min-width: 26px;
  height: 13px;
  border: 1px solid #ccc;
  border-radius: 2px;
  line-height: 13px;
  color: #939393;
  text-align: center;
}

.content-box-avatar {
  margin-right: 10px;
}

.content-help-tag{
  margin-right: 4px;
  font-size: 12px;
  display: inline-block;
  min-width: 26px;
  height: 13px;
  border-radius: 2px;
  line-height: 13px;
  color:white;
  background-color: rgb(227, 82, 82);
  text-align: center;
}
.content-finish-tag{
  margin-right: 4px;
  font-size: 12px;
  display: inline-block;
  min-width: 26px;
  height: 13px;
  border-radius: 2px;
  line-height: 13px;
  color:white;
  background-color: rgb(0, 159, 74);
  text-align: center;
}
</style>
