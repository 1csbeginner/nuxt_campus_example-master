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
      <el-form-item label="商品图片" prop="image">
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :on-success="handleUploadSuccess"
          :file-list="fileList"
          :limit="1"
          :accept="accept"
          :list-type="listType"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
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
import shopApi from "@/api/shop"; // 确保调用正确的 API

export default {
  props: {
    product: {
      type: Object,
      default: () => ({
        name: "",
        price: 0,
        stock: 0,
        image: "",
      }),
    },
    uploadUrl: {
      type: String,
      default: "/upload", // 默认上传接口
    },
    accept: {
      type: String,
      default: "image/*", // 默认接受图片类型
    },
    listType: {
      type: String,
      default: "picture-card", // 默认展示为图片卡片
    },
  },
  data() {
    return {
      form: { ...this.product }, // 初始化表单数据
      fileList: [], // 上传的文件列表
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        stock: [{ required: true, message: "请输入商品库存", trigger: "blur" }],
        image: [{ required: true, message: "请上传商品图片", trigger: "change" }],
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
              url: this.getImg(newProduct.image), // 使用 getImg 方法生成图片 URL
            },
          ];
        } else {
          this.fileList = [];
        }
        this.form = { ...newProduct }; // 初始化表单数据
      },
    },
  },
  methods: {
    getImg(img) {
      return shopApi.getProductImg(img); // 调用 API 生成图片 URL
    },
    handleUploadSuccess(response, file) {
      this.form.image = response.url; // 假设后端返回图片的 URL
      this.fileList = [
        {
          name: file.name,
          url: response.url,
        },
      ];
    },
    handleCancel() {
      this.$emit("close"); // 通知父组件关闭弹窗
    },
    handleSubmit() {
      this.$refs.productForm.validate((valid) => {
        if (valid) {
          this.$emit("submit", this.form); // 提交表单数据给父组件
        } else {
          console.error("表单验证失败");
        }
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
