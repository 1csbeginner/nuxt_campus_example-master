import request from '@/utils/request'

const api_name = `/api/shop`

export default {
    //获取商品列表
    getProductList(productSet) {
        return request({
            url: `campus/product/list`,
            method: 'get',
            params: productSet
        })
    },
    getProductDetail(id) {
        return request({
            url: `campus/product/${id}`,
            method: 'get',
        })
    },
    getProductImg(image) {
      // 处理图片地址
      if(!image) {
        console.log("没有图片");
        console.log(image)
        return "";
      }
      //直接从后端获取图片
      return process.env.NUXT_ENV.API_BASE_URL + image;
    },
  
 }
