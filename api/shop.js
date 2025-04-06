import request from '@/utils/request'
const USER_ID_KEY = 'userId' // 定义一个常量来存储用户ID的键名
const api_name = `/api/shop`

export default {
    //获取商品列表
    getList(req, data) {
      return request({
        url: `campus/${req}/list`,
        method: 'put',
        data: data
      });
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
    updateCart(id, quantity) {
        return request({
            url: `campus/shoppinglist`,
            method: 'put',
            data: {
                id: id,
                quantity: quantity
            }
        })
    },
    finishOrder(id) {
        return request({
            url: `campus/shoppingorder/finish/${id}`,
            method: 'put',
        })
    },

    async getUserId() {
    let userId = sessionStorage.getItem(USER_ID_KEY)
    if (userId) {
      return userId
    }

    try {
      const response = await request({
        url: '/system/user/profile', // 这里替换成实际的获取用户信息的接口
        method: 'get',
      })
      userId = response.data.userId
      sessionStorage.setItem(USER_ID_KEY, userId)
      return userId
    } catch (error) {
      console.error('获取用户信息失败:', error)
      return null
    }
  }
 }
