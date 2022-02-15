import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 加载所有模块路由
import dataV from './data-v'

// 路由实例
const route = new Router({
  routes: dataV
});

export default route