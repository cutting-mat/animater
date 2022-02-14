import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import customPlugin from './index';
Vue.use(customPlugin);

Vue.config.productionTip = false

new Vue({
    render: function (h) {
        return h(App)
    },
}).$mount('#app')