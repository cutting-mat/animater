import containerComponent from "./components/animateGroup.vue";
import animateComponent from "./components/animate.vue";
import 'animate.css';

export default {
    install: function (Vue) {
        let PluginData = Vue.observable({
            currentGroupName: undefined,
            orderGroupName: undefined,
            groups: new Map()
        })

        Vue.prototype.$animatePlugin = PluginData;

        Vue.prototype.$groupCreated = function (groupName = 'anonymous') {
            // 组注册
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

        Vue.prototype.$groupDestroyed = function(groupName = 'anonymous', index){
            // 组注销
            if(PluginData.groups.has(groupName)){
                PluginData.groups.get(groupName).delete(index)

                if(!PluginData.groups.get(groupName).size){
                    PluginData.groups.delete(groupName)
                }
                // console.log('delete', groupName, PluginData.groups.keys())
            }
        }

        Vue.prototype.$changeGroup = function (groupName) {
            Vue.nextTick(() => {
                if(PluginData.groups.has(groupName)){
                    PluginData.orderGroupName = groupName
                }else{
                    console.warn('groupName 未注册', groupName)
                }
                
            })
        }

        Vue.component(containerComponent.name, containerComponent)
        Vue.component(animateComponent.name, animateComponent)
    }
}
