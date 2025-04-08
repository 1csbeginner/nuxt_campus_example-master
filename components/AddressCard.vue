<template>
  <el-card class="address-card" shadow="hover" @click.native="goToAddress">
    <div v-if="address && address.address" class="address-info">
      <h2>{{ address.address }}</h2>
      <h3>{{ address.userName }}</h3>
      <p>{{ address.phonenumber }}</p>
    </div>
    <div v-else class="no-address">
      <h2>添加收货地址</h2>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    address: {
      type: Object,
      default: null,
    },
  },
  methods: {
    goToAddress() {
      this.$router.push("/order/address");
    },
  },
};
</script>

<style scoped>
.address-card {
  margin-bottom: 20px;
  padding: 16px;
  cursor: pointer;
  transition: box-shadow 0.3s;
}

.address-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.no-address {
  text-align: center;
  color: #888;
}
</style>
