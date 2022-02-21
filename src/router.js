import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 加载所有模块路由
import dataV from './test'

// 路由实例
const route = new Router({
  routes: dataV
});

route.beforeEach((to, from, next) => {
  if (to.name) {
    document.title = to.meta && to.meta.title || to.name;
  }
  next()
})

export default route