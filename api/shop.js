import request from '@/utils/request'

const api_name = `/api/shop`

export default {
    //获取商品列表
    getList(req, productSet, queryParams) {
        return request({
            url: `campus/${req}/list`,
            method: 'put',
            params: queryParams,  // URL 参数
            data: productSet       // 请求体数据
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
    delete(req, id) {
        return request({
            url: `campus/${req}/${id}`,
            method: 'delete',
        })
    },
    addToCart(id, quantity) {
        return request({
            url: `campus/shoppinglist/add`,
            method: 'post',
            data: {
                productId: id,
                quantity: quantity
            }
        })
    },
    finishOrder(id) {
        return request({
            url: `campus/shoppingorder/finish/${id}`,
            method: 'put',
        })
    }
 }
