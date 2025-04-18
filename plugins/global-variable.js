import Vue from 'vue'

// 一个响应式对象，所有组件都引用同一个实例
const globalVariable = Vue.observable({
  userInfoGlobal: null
})

// Nuxt 插件：inject 会自动挂到 this.$globalVariable、context.$globalVariable
export default ({}, inject) => {
  inject('globalVariable', globalVariable)
}
