<template>
  <div class="address-page">
    <el-card class="address-card">
      <h2>添加地址</h2>
      <el-form :model="form" :rules="rules" ref="addressForm" label-width="100px">
        <!-- 收货人姓名 -->
        <el-form-item label="收货人" prop="name">
          <el-input v-model="form.name" placeholder="请输入收货人姓名" />
        </el-form-item>

        <!-- 手机号码 -->
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号码" />
        </el-form-item>


        <!-- 详细地址 -->
        <el-form-item label="详细地址" prop="address">
          <el-input
            type="textarea"
            v-model="form.address"
            placeholder="请输入详细地址"
            rows="3"
          />
        </el-form-item>

        <!-- 操作按钮 -->
        <el-form-item>
          <el-button type="primary" @click="saveAddress">保存地址</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        phone: "",
        region: [],
        address: "",
        isDefault: false,
      },
      rules: {
        name: [{ required: true, message: "请输入收货人姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号码", trigger: "blur" },
        ],
        region: [{ required: true, message: "请选择所在地区", trigger: "change" }],
        address: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
      },
    };
  },
  methods: {
    saveAddress() {
      this.$refs.addressForm.validate((valid) => {
        if (valid) {
          console.log("保存地址:", this.form);
          this.$message.success("地址保存成功！");
          // 模拟保存成功后的跳转
          this.$router.push("/order/confirm"); // 假设有一个订单确认页面
        } else {
          console.error("表单验证失败");
        }
      });
    },
    cancel() {
      this.$router.back(); // 返回上一页
    },
  },
};
</script>

<style scoped>
.address-page {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.address-card {
  padding: 20px;
}

.el-form-item {
  margin-bottom: 20px;
}
</style>
