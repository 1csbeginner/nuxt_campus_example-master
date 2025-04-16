<template>
  <div class="publish-content">
    <el-row>
      <el-col :span="8" :xs="20">
        <el-dialog title="快捷发布" :visible.sync="dialog" width="600px;">
          <div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 10 }"
              placeholder="请输入内容"
              v-model="contentParam.content"
              maxlength="500"
              show-word-limit
            ></el-input>

            <!-- 求助选项 -->
            <el-checkbox v-model="contentParam.isHelp" label="求助">求助</el-checkbox>

            <!-- 匿名发布选项 -->
            <el-checkbox v-model="contentParam.isAnonymous" label="匿名发布">匿名发布</el-checkbox>

            <div class="woo-box-flex woo-box-alignCenter">
              <div class="woo-box-item-flex" style="align-self: center">
                <!-- 分类 -->
                <div class="woo-box-item-inlineBlock">
                  <el-cascader
                    size="small"
                    placeholder="请选择分类"
                    v-model="cascader"
                    :options="categoryOptions"
                    :props="props"
                    class="c-cascader"
                  ></el-cascader>
                </div>

                <div class="woo-box-item-inlineBlock">
                  <el-button
                    type="text"
                    @click="selectPicture()"
                    :disabled="disabled.picture"
                  >
                    <svg-icon
                      class="woo-font woo-font--emotico"
                      style="width: 18px; height: 18px"
                      icon-class="picture"
                    />
                    <span class="iconbed-text">图片</span>
                  </el-button>
                </div>
                <div class="woo-box-item-inlineBlock">
                  <el-button
                    type="text"
                    @click="selectVideo()"
                    :disabled="disabled.video"
                  >
                    <svg-icon
                      class="woo-font woo-font--emotico"
                      style="width: 18px; height: 18px"
                      icon-class="video"
                    />
                    <span class="iconbed-text">视频</span>
                  </el-button>
                </div>
              </div>
              <el-button
                type="primary"
                round
                style="margin-top: 15px"
                :disabled="contentParam.content.length <= 0"
                @click="publishContent()"
              >
                发布
              </el-button>
            </div>
            <el-upload
              style="height: 15x"
              :headers="upload.headers"
              v-show="upload.show"
              ref="upload"
              :limit="upload.limit"
              :action="upload.action"
              :show-file-list="true"
              :list-type="upload.listType"
              :accept="upload.accept"
              :auto-upload="false"
              :on-change="handleChange"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-exceed="handleExceed"
              :on-success="handleSuccess"
              :on-error="handleError"
            >
              <button id="uploadBtn" v-show="false"></button>
            </el-upload>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import operateApi from "@/api/operate";
import userInfoApi from "@/api/userInfo";
import touristApi from "@/api/tourist";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      props: {
        expandTrigger: "hover",
        value: "categoryId",
        label: "categoryName",
        children: "children",
      },
      contentParam: {
        categoryId: "",
        type: 0,
        isAnonymous: 0,  // 匿名发布字段
        content: "",
        fileList: [],
        isHelp: 0,  // 求助字段
      },
      disabled: {
        picture: false,
        video: false,
      },
      upload: {
        show: false,
        action: "",
        limit: 3,
        accept: "",
        listType: "",
        headers: {},
      },
      cascader: [],
      fileCount: 0,
      fileList: [],
      categoryOptions: [],
      dialog: true,
      selectType: 0,
    };
  },
  created() {
    if (getToken() === undefined) {
      this.$router.push({ path: "/userlogin" });
    }
    this.upload.headers["Authorization"] = "Bearer " + getToken();
    this.haveMail();
  },
  mounted() {
    this.$nextTick(function () {
      this.getTreeselect();
    });
  },
  methods: {
    haveMail() {
      userInfoApi.haveMail().then((response) => {}).catch((response) => {
        var count = 3;
        var times = setInterval(() => {
          count--;
          if (count <= 0) {
            clearInterval(times);
            this.$router.push({ path: "/user/profile" });
          } else {
            this.$message.warning("将再 " + count + " 秒后跳转到绑定邮箱页面");
          }
        }, 1000);
      });
    },
    selectPicture() {
      this.upload.action = this.handleCampusUrl("/campus/imageUpload");
      this.upload.limit = 3;
      this.upload.accept = "image/*";
      this.upload.listType = "picture-card";
      this.selectType = 1;
      document.getElementById("uploadBtn").click();
    },
    selectVideo() {
      console.log("选择视频");
      this.upload.action = this.handleCampusUrl("/campus/videoUpload");
      this.upload.limit = 1;
      this.upload.accept = "video/*";
      this.upload.listType = "text";
      this.selectType = 2;
      document.getElementById("uploadBtn").click();
    },
    getTreeselect() {
      touristApi.getCategoryList().then((response) => {
        let lists = response.data;
        for (let i = 0; i < lists.length; i++) {
          if (lists[i].type == "Y") {
            lists.splice(i, 1);
          }
        }
        this.categoryOptions = this.handleTree(lists, "categoryId");
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.checkBtn();
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(response, file, fileList) {
      if (response.code != 200) {
        fileList.splice(fileList.length - 1, 1);
        this.$message.warning(response.msg);
        setTimeout(() => {
          this.$message.error("上传失败，请重新上传");
        }, 1000);
      }
      this.checkBtn();
    },
    handleError(err, file, fileList) {
      this.$message.error("上传失败");
      this.checkBtn();
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
      let fileNum = fileList.length;
      if (this.fileCount < fileNum) {
        if (file.raw.type.startsWith("image")) {
          this.disabled.video = true;
        } else {
          this.disabled.picture = true;
        }
        this.validated(file);
        this.$refs.upload.submit();
      }
      this.fileCount = fileNum;
      if (fileNum > 0) {
        this.upload.show = true;
      }
      this.checkBtn();
    },
    handleExceed(files, fileList) {
      this.$message.warning(`上传数量超过限制`);
    },
    validated(file) {
      const size = file.size / 1024 / 1024;
      if (this.selectType == 1) {
        if (!file.raw.type.startsWith("image")) {
          this.$message.warning(`请选择图片`);
          this.fileList.splice(this.fileList.length - 1, 1);
        }
        if (size > 5) {
          this.fileList.splice(this.fileList.length - 1, 1);
          this.$message.warning("上传的图片大小不能超过 5MB!");
        }
      } else {
        if (!file.raw.type.startsWith("video")) {
          this.$message.warning(`请选择视频`);
          this.fileList.splice(this.fileList.length - 1, 1);
        }
        if (size > 20) {
          this.fileList.splice(this.fileList.length - 1, 1);
          this.$message.warning("上传的视频大小不能超过 20MB!");
        }
      }
    },
    checkBtn() {
      if (this.fileList.length == 0) {
        this.upload.show = false;
        this.disabled.picture = false;
        this.disabled.video = false;
      }
    },
    publishContent() {
      this.contentParam.fileList = [];
      console.log(this.fileList);
      for (let file of this.fileList) {
        if (file.raw.type.startsWith("image")) {
          this.contentParam.type = 1;
        }
        if (file.raw.type.startsWith("video")) {
          this.contentParam.type = 2;
        }
        if (file.response !== undefined && file.response.code == 200) {
          this.contentParam.fileList.push(file.response.data.fileId);
        } else {
          console.log("禁止");
        }
      }
      if (this.cascader.length != 2) {
        this.$message.warning("请选择分类");
        return;
      } else {
        this.contentParam.categoryId = this.cascader[1];
      }

      // 将布尔值转换为整数
      this.contentParam.isAnonymous = this.contentParam.isAnonymous ? 1 : 0;

      // 发布时传递转换后的匿名状态
      operateApi.publishContent(this.contentParam).then((response) => {
        this.$message.success("发表成功，请等待管理的审核");
        this.$router.push({ path: "/User/management?types=1" });
      });
    }
  },
};
</script>

<style scoped>
.iconbed-text {
  margin: 0 8px 0 2px;
  font-size: 13px;
}
.c-cascader {
  border-radius: 0;
}
.help-tag {
  color: red;
  font-weight: bold;
  font-size: 14px;
}
</style>
