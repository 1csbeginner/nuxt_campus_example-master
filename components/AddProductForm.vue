<template>
  <div>
    <el-form
      :model="form"
      :rules="rules"
      ref="productForm"
      label-width="100px"
    >
      <!-- 商品名称 -->
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入商品名称" />
      </el-form-item>

      <!-- 商品价格 -->
      <el-form-item label="商品价格" prop="price">
        <el-input-number
          v-model="form.price"
          :min="0"
          placeholder="请输入商品价格"
        />
      </el-form-item>

      <!-- 商品库存 -->
      <el-form-item label="商品库存" prop="stock">
        <el-input-number
          v-model="form.stock"
          :min="0"
          placeholder="请输入商品库存"
        />
      </el-form-item>

      <!-- 商品图片 -->
      <el-form-item label="商品图片">
        <el-upload
          class="upload-demo"
          :http-request="customUpload"
          :file-list="fileList"
          :limit="1"
          accept="image/*"
          list-type="picture-card"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <!-- 商品介绍 -->
      <el-form-item label="商品介绍" prop="introduce">
        <el-input
          type="textarea"
          v-model="form.introduce"
          placeholder="请输入商品介绍"
          rows="4"
        />
      </el-form-item>
    </el-form>

    <!-- 操作按钮 -->
    <div class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
import shopApi from "@/api/shop";
import { getToken } from "@/utils/auth"; // 确保你有这个方法来获取 token

export default {
  props: {
    product: {
      type: Object,
      default: () => ({
        name: "",
        price: 0,
        stock: 0,
        image: "",
        introduce: "",
      }),
    },
    uploadUrl:String
  },
  data() {
    return {
      form: { ...this.product },
      fileList: [],
      upload: {
       headers: {
         Authorization: "Bearer " + getToken(), // 如果有 token
       },
     },
     imageUrl: "", // 用于存储图片地址或 ID
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        stock: [{ required: true, message: "请输入商品库存", trigger: "blur" }],
        image: [{ required: true, message: "请上传商品图片", trigger: "change" }],
        introduce: [
          { required: true, message: "请输入商品介绍", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    product: {
      immediate: true,
      handler(newProduct) {
        if (newProduct && newProduct.image) {
          this.fileList = [
            {
              name: "已上传图片",
              url: this.getImg(newProduct.image),
            },
          ];
        } else {
          this.fileList = [];
        }
        this.form = { ...newProduct };
      },
    },
  },
  methods: {
    beforeUpload(file) {
      const isImage = file.type.startsWith("image/");
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isImage) {
        this.$message.error("只能上传图片格式文件");
        return false;
      }
      if (!isLt5M) {
        this.$message.error("图片大小不能超过5MB");
        return false;
      }
      return true;
    },
    handleUploadError() {
      this.$message.error("图片上传失败！");
    },
    getImg(img) {
      return shopApi.getProductImg(img);
    },
    handleCancel() {
      this.$emit("close");
    },
    handleSubmit() {
      this.$refs.productForm.validate((valid) => {
        if (valid) {
          console.log("表单数据:", this.form);
          this.$emit("submit", this.form);
        } else {
          console.error("表单验证失败");
        }
      });
    },
    handleRemove(file, fileList) {
      console.log("文件移除:", file, fileList);
      this.fileList = fileList;
      if (fileList.length === 0) {
        this.form.image = ""; // 清空图片 URL
      }
    },
    customUpload({ file }) {
    const formData = new FormData();
      formData.append("file", file); // 将文件添加到 FormData 中

      // 使用 axios 或封装的 API 方法发送请求
      shopApi.uploadImage(formData) // 假设你有一个封装的上传方法
        .then((response) => {
          if (response.code === 200) {
            this.form.image = response.data.url; // 假设后端返回图片 URL
            this.fileList = [
              {
                name: file.name,
                url: this.getImg(response.data.url),
              },
            ];
            this.$message.success("图片上传成功");
          } else {
            this.$message.error(response.msg || "图片上传失败");
          }
        })
        .catch((error) => {
          console.error("上传失败:", error);
          this.$message.error("图片上传失败，请重试");
        });
    },
  },

};
</script>

<style scoped>
.upload-demo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
