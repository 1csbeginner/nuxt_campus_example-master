<template>
  <div class="ContentBottom">
    <div
      class="content-bootom-svg woo-box-flex woo-box-alignCenter"
      style="margin: 10px 15px 15px 0px"
    >
      <!-- 分享链接 -->
      <div class="woo-box-item-flex">
        <div
          class="content-bottom-hover woo-box-flex woo-box-alignCenter woo-box-justifyCenter"
          @click="copys($event, contentObj.contentId)"
        >
          <div class="woo-pop-wrap">
            <img width="20" height="20" src="~/assets/images/fenxiang.png" />
            <span>分享链接</span>
          </div>
        </div>
      </div>
      <!-- 评论 -->
      <div class="woo-box-item-flex">
        <div
          class="content-bottom-hover woo-box-flex woo-box-alignCenter woo-box-justifyCenter"
          @click="clickComment()"
        >
          <div class="woo-pop-wrap">
            <img width="20" height="20" src="~/assets/images/pinlun.png" />
            <span>评论</span>
          </div>
        </div>
      </div>
      <!-- 赞 -->
      <div class="woo-box-item-flex">
        <div
          class="content-bottom-hover woo-box-flex woo-box-alignCenter woo-box-justifyCenter"
          @click="setZan(contentObj.contentId)"
        >
          <div class="woo-pop-wrap">
            <img width="20" height="20" :src="zanImg" />
            <span class="zan-num">{{ contentObj.loveCount }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 评论列表 -->
    <div v-if="showComment">
      <Comment :contentObj="contentObj"></Comment>
    </div>
  </div>
</template>

<script>
const dzNotImage = require("~/assets/images/dz.png");
const dzImage = require("~/assets/images/dz1.png");

import operateApi from "@/api/operate";

//复制
import Clipboard from "clipboard";
//认证
import { getToken, setToken, removeToken } from "@/utils/auth";
//组件
import Comment from "@/components/Comment";

export default {
  name: "ContentBottom",
  props: ["zanBoolean", "contentObj"],
  components: { Comment },
  data() {
    return {
      zanImg: "",
      showComment: false,
      isZanBoo: false,
      isOwner: false, // 当前用户是否为楼主
      loginUserId: null, // 当前登录用户ID
    };
  },
  mounted() {
    if (this.$route.name == "c-contentId") {
      this.showComment = true;
    }
    if (getToken() !== undefined) {
      this.loginUserId = this.$globalVariable.userInfoGlobal.userId;
    }
  },
  watch: {
    zanBoolean: {
      handler(newVal, oldVal) {
        this.isZanBoo = this.zanBoolean;
        this.isZan();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    isZan() {
      if (this.isZanBoo == false) {
        this.zanImg = dzNotImage;
        return false;
      } else {
        this.zanImg = dzImage;
        return true;
      }
    },
    clickComment() {
      this.showComment = !this.showComment;
    },
    setZan(contentId) {
      if (getToken() === undefined) {
        this.$router.push({ path: "/userlogin", query: { id: "1" } });
      } else {
        if (this.isZanBoo == true) {
          this.isZanBoo = false;
          this.contentObj.loveCount--;
        } else {
          this.isZanBoo = true;
          this.contentObj.loveCount++;
        }
        this.isZan(contentId);
        operateApi.zanContent(contentId).then((response) => {
          if (response.data == 1) {
            // 点赞成功
          }
          if (response.data == 0) {
            // 取消点赞成功
          }
        });
      }
    },
    copys(e, contentId) {
      const hostname = window.location.origin;
      const clipboard = new Clipboard(e.target, {
        text: () => hostname + "/c/" + contentId,
      });
      clipboard.on("success", (e) => {
        const h = this.$createElement;
        this.$notify({
          title: "复制成功：",
          message: h("i", { style: "color: teal" }, "快去分享给好盆友吧!"),
        });
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        this.$message({
          message: "该浏览器不支持自动复制",
          type: "warning",
        });
        clipboard.destroy();
      });
    },
  },
};
</script>

<style>
.content-bootom-svg {
  font-size: 10px;
  font-weight: bolder;
  color: rgb(110, 110, 110);
}
.zan-num {
  font-weight: bolder;
  cursor: pointer;
  font-size: 10px;
  margin-left: 5px;
}
.content-bottom-hover {
  cursor: pointer;
  color: rgb(110, 110, 110);
}
.content-bottom-hover:hover {
  color: coral;
}
.disabled {
  pointer-events: none; /* 禁止点击 */
  opacity: 0.6; /* 调低透明度 */
  cursor: not-allowed; /* 鼠标样式为不可点击 */
}
</style>
