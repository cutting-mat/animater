import containerComponent from "./components/animateGroup.vue";
import animateComponent from "./components/animate.vue";
import 'animate.css';

export default {
    install: function (Vue) {
        Vue.prototype.$animatePlugin = Vue.observable({
            currentGroupName: '',
            orderGroupName: ''
        })
    
        Vue.prototype.$groupInit = function(){
            Vue.prototype.$animatePlugin.currentGroupName = '';
            Vue.prototype.$animatePlugin.orderGroupName = '';
        }

        Vue.prototype.$changeGroup = function (groupName) {
            Vue.nextTick(() => {
                Vue.prototype.$animatePlugin.orderGroupName = groupName
            })
        }
    
        Vue.component(containerComponent.name, containerComponent)
        Vue.component(animateComponent.name, animateComponent)
    }
}
