<template>
  <div class="shop-bg woo-box-flex">
    <div class="shop-main">
      <ShopNaviBar />
      <div class="shop-content" :style="{ 'min-height': mainMinHeight + 'px' }">
        <!-- 商品列表 -->
        <div class="product-list">
          <ProductCard
            v-for="(item, key) in productList"
            :key="key"
            :productObj="item"
          />
        </div>

        <!-- 分页 -->
        <div class="fenye" v-if="!loading">
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
      </div>
    </div>
  </div>
</template>

<script>
import shopApi from "@/api/shop";
import ProductCard from "@/components/ProductCard";
import CampusMenu from "@/components/Menu";
import ShopNaviBar from "@/components/ShopNaviBar";

export default {
  components: { ProductCard, CampusMenu, ShopNaviBar },
  props:{
    productObj:Object,
  },
  data() {
    return {
      productList: [], // 商品列表
      shopFilter: {
        pageNum: 1,
        pageSize: 10,
      },
      mainMinHeight: "",
      loading: true,
      total: 0,
      currentPage: 1,
      searchQuery: "",
    };
  },
  created() {
    // this.getProducts(this.shopFilter);
  },
  mounted() {
    this.mainMinHeight = document.documentElement.clientHeight - 45;
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      handler(newSearch) {
        if (newSearch) {
          this.getProducts({
            ...this.shopFilter,
            name: newSearch,
          });
        } else {
          this.getProducts(this.shopFilter);
        }
      }
    }
  },
  methods: {
    // 获取商品列表
    getProducts(shopFilter) {
      this.loading = true;
      shopApi
        .getList('product', shopFilter, {})
        .then((response) => {
          this.productList = response.rows.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price || 0,
            stock: item.stock || 0,
            image: item.image || "https://via.placeholder.com/150",
          }));
          this.total = parseInt(response.total);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 分页
    handleCurrentChange(val) {
      this.shopFilter.pageNum = val;
      this.currentPage = this.shopFilter.pageNum;
      this.getProducts(this.shopFilter);
    },
  },
};
</script>

<style>
.shop-bg {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 10px;
  max-width: 1200px;
  margin: auto;
}

.shop-main {
  flex: 1;
  padding: 20px;
  width: 100%;
}

.shop-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start; /* 可改为 center */
}

.fenye {
  text-align: center;
  margin-top: 20px;
}

</style>
