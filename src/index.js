import Vue from 'vue';
import AnimateBox from "./components/AnimateBox.vue";
import AnimateGroup from "./components/AnimateGroup.vue";
import 'animate.css';

// 组件变量
export const PluginData = Vue.observable({
    currentGroupName: undefined,
    orderGroupName: undefined,
    groups: new Map()
})

// 组注册
export const registerGroup = function (groupName = 'anonymous') {
    if (!PluginData.groups.size) {
        PluginData.currentGroupName = undefined
        PluginData.orderGroupName = undefined
    }
    if(!PluginData.groups.has(groupName)){
        PluginData.groups.set(groupName, new Set())
    }
    const index = PluginData.groups.get(groupName).size + 1;
    PluginData.groups.get(groupName).add(index)

    return index
}

// 组注销
export const destroyGroup = function(groupName = 'anonymous', index){
    if(PluginData.groups.has(groupName)){
        PluginData.groups.get(groupName).delete(index)

        if(!PluginData.groups.get(groupName).size){
            PluginData.groups.delete(groupName)
        }
        // console.log('delete', groupName, PluginData.groups.keys())
    }
}

export default {
    install: function (Vue) {
        
        Vue.prototype.$animateGroup = {
            enter: function (groupName) {
                Vue.nextTick(() => {
                    if(PluginData.groups.has(groupName)){
                        PluginData.orderGroupName = groupName
                    }else{
                        console.warn('[vue-animate-layout] groupName 未注册', groupName)
                    }
                    
                })
            },
            leave: function(){
                PluginData.orderGroupName = undefined
            }
        }

        Vue.component(AnimateBox.name, AnimateBox)
        Vue.component(AnimateGroup.name, AnimateGroup)
    }
}
