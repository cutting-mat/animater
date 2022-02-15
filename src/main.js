import Vue from 'vue'
Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 全局样式
import '@/assets/global.css';

import customPlugin from './index';
Vue.use(customPlugin);

import router from './router';
import App from './App.vue'

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
