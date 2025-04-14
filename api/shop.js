import request from '@/utils/request'
const USER_ID_KEY = 'userId' // 定义一个常量来存储用户ID的键名
const api_name = `/api/shop`

export default {
    //获取商品列表
    getList(req, filter, data) {
      return request({
        url: `campus/${req}/list/${filter.pageNum}/${filter.pageSize}`, // 拼接分页参数到路径
        method: 'put',
        data: data, // 其他过滤条件仍然通过请求体传递
      });
    },
    getCartList(data) {
      return request({
        url: `campus/shoppinglist/list`, // 拼接分页参数到路径
        method: 'put',
        data: data, // 其他过滤条件仍然通过请求体传递
      });
    },

    getDetail(req, id) {
        return request({
            url: `campus/${req}/${id}`,
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

    add(req, data) {
        return request({
            url: `campus/${req}/add`,
            method: 'post',
            data: data
        })
    },
    updateProduct(data){
        return request({
            url: `campus/product/modify`,
            method: 'put',
            data: data
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
    uploadImage(data) {
      return request({
        url: "/campus/imageUpload", // 上传接口地址
        method: "post",
        data, // 直接传递 FormData
        headers: {
          "Content-Type": "multipart/form-data", // 设置请求头
        },
      });
    },
    sendOrder(data) {
        return request({
            url: `campus/shoppingorder/add`,
            method: 'post',
            data: data
        })
    },
    submitReview(orderId, review){
        return request({
            url: `campus/shoppingorder/comment`,
            method: 'put',
            data:{
                id: orderId,
                bcomment: review
            }
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
