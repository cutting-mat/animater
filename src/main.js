// 根据.browserslistrc 配置加载polyfill, 需同时替换babel.config.js中注释的presets配置
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 全局样式
import '@/test/assets/global.css';

// 安装 animater
import animater from "../lib/animater"
Vue.use(animater)

import router from './router';
import App from './App.vue'

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
