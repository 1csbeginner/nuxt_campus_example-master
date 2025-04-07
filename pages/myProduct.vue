<template>
  <div class="sell">
    <!-- 导航栏 -->
    <ShopNaviBar />

    <!-- 页面头部 -->
    <div class="sell-header">
      <el-button type="primary" @click="openAddProductDialog">添加商品</el-button>
    </div>

    <!-- 商品列表 -->
    <div class="sell-items">
      <sellItem
        v-for="item in sellItems"
        :key="item.id"
        :item="item"
        @remove-item="removeItem"
        @edit-item="openEditProductDialog"
      />
    </div>

    <!-- 分页 -->
    <div class="fenye" v-if="!loading && sellItems.length > 0">
      <el-pagination
        :hide-on-single-page="true"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="currentPage"
        :page-size="10"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 添加/修改商品弹窗 -->
    <el-dialog
      :title="currentProduct && currentProduct.id ? '修改商品' : '添加商品'"
      :visible.sync="productDialogVisible"
      width="50%"
    >
      <!-- 表单组件 -->
      <add-product-form
        :product="currentProduct"
        :uploadUrl="handleCampusUrl('/campus/imageUpload')"
        @close="closeProductDialog"
        @submit="handleSubmitProduct"
      />
    </el-dialog>
  </div>
</template>

<script>
import sellItem from "@/components/sellItem.vue";
import shopApi from "@/api/shop"; // 确保调用正确的购物车API
import ShopNaviBar from "@/components/ShopNaviBar"; // 导入导航栏组件
import AddProductForm from "@/components/AddProductForm.vue"; // 添加商品表单组件
import { handleCampusUrl } from "../utils/campus";

export default {
  components: {
    sellItem,
    ShopNaviBar,
    AddProductForm,
  },
  data() {
    return {
      sellItems: [], // 商品数据
      sellFilter: {
        pageNum: 1,
      },
      currentPage: 1,
      mainMinHeight: "",
      userId: 0,
      productDialogVisible: false, // 控制添加/修改商品弹窗的显示
      currentProduct: null, // 当前商品数据
    };
  },
  methods: {
    removeItem(itemId) {
      this.sellItems = this.sellItems.filter((item) => item.id !== itemId);
      shopApi
        .delete("shoppinglist", itemId)
        .then(() => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.getsellItems(this.sellFilter);
        })
        .catch(() => {
          this.$message({
            message: "删除失败",
            type: "error",
          });
        });
    },
    // 打开添加商品弹窗
    openAddProductDialog() {
      this.currentProduct = null; // 清空当前商品数据
      this.productDialogVisible = true;
    },
    // 打开修改商品弹窗
    openEditProductDialog(itemId) {
      // 从 sellItems 中找到对应的商品数据
      const product = this.sellItems.find((item) => item.id === itemId);
      if (product) {
        this.currentProduct = { ...product }; // 深拷贝，避免直接修改原数据
        this.productDialogVisible = true; // 打开弹窗
      } else {
        this.$message.error("未找到商品数据");
      }
    },
    // 关闭弹窗
    closeProductDialog() {
      this.productDialogVisible = false;
    },
    // 处理提交商品逻辑
    handleSubmitProduct(productData) {
      if (productData.id) {
        // 修改商品
        console.log("修改商品数据", productData);
        shopApi
          .updateProduct(productData)
          .then(() => {
            this.$message.success("商品修改成功");
            this.getsellItems(this.sellFilter); // 刷新商品列表
            this.closeProductDialog();
          })
          .catch(() => {
            this.$message.error("商品修改失败");
          });
      } else {
        // 添加商品
        console.log("添加商品数据", productData);
        shopApi
          .add("product", productData)
          .then(() => {
            this.$message.success("商品添加成功");
            this.getsellItems(this.sellFilter); // 刷新商品列表
            this.closeProductDialog();
          })
          .catch(() => {
            this.$message.error("商品添加失败");
          });
      }
    },
    // 获取商品列表
    getsellItems(sellFilter) {
      shopApi
        .getList("product", { ...sellFilter, createUser: this.userId })
        .then((response) => {
          this.sellItems = response.rows.map((item) => ({
            id: item.id,
            image: item.image,
            name: item.name,
            price: item.price,
            introduce: item.introduce,
            stock: item.stock,
          }));
        })
        .catch((error) => {
          console.error("获取商品数据失败", error);
        });
    },
    handleCurrentChange(val) {
      this.sellFilter.pageNum = val;
      this.currentPage = this.sellFilter.pageNum;
      this.getsellItems(this.sellFilter);
    },
  },
  created() {
    shopApi.getUserId().then((userId) => {
      if (userId) {
        this.userId = userId;
        this.getsellItems(); // 现在 userId 可用了
      }
    });
  },
  mounted() {
    this.mainMinHeight = document.documentElement.clientHeight - 45;
  },
};
</script>

<style scoped>
.sell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
}

.sell-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #ddd;
}

.sell-items {
  margin-top: 16px;
}

.fenye {
  margin-top: 16px;
  text-align: center;
}
</style>
