import Vue from 'vue';
import Animated from "./components/Animated.vue";
import AnimatedGroup from "./components/AnimatedGroup.vue";
import 'animate.css';

// 组件变量
export const PluginData = Vue.observable({
    currentGroupName: undefined,
    orderGroupName: undefined,
    groups: new Map()
})

// 组注册
export const registerGroup = function (vm) {
    const groupName = vm.name || 'anonymous';

    if (!PluginData.groups.size) {
        PluginData.currentGroupName = undefined
        PluginData.orderGroupName = undefined
    }
    if (!PluginData.groups.has(groupName)) {
        PluginData.groups.set(groupName, new Set())
    }
    PluginData.groups.get(groupName).add(vm)
}

// 组注销
export const destroyGroup = function (vm) {
    const groupName = vm.name || 'anonymous';

    if (PluginData.groups.has(groupName)) {
        PluginData.groups.get(groupName).delete(vm)

        if (!PluginData.groups.get(groupName).size) {
            PluginData.groups.delete(groupName)
        }
        // console.log('delete', groupName, PluginData.groups.keys())
    }
}

export default {
    install: function (Vue) {

        Vue.prototype.$AnimatedGroup = {
            enter: function (groupName) {
                return new Promise((resolve, reject) => {
                    Vue.nextTick(() => {
                        if (groupName && PluginData.groups.has(groupName)) {
                            if (PluginData.currentGroupName === groupName) {
                                // 目标正在前台
                                resolve(`${groupName} already on show`)
                            } else {
                                PluginData.orderGroupName = groupName;
                                // 前台退场
                                if (PluginData.currentGroupName) {
                                    PluginData.groups.get(PluginData.currentGroupName).forEach(vm => {
                                        vm.leave()
                                    })
                                    
                                } 
                                // 开始进场
                                PluginData.groups.get(groupName).forEach(vm => {
                                    resolve(vm.enter())
                                })
                            }

                        } else {
                            reject(`groupName "${groupName}" 未注册`)
                        }
                    })
                })
            },
            leave: function () {
                PluginData.orderGroupName = undefined;

                return new Promise((resolve, reject) => {
                    if (PluginData.currentGroupName) {
                        PluginData.groups.get(PluginData.currentGroupName).forEach(vm => {
                            resolve(vm.leave())
                        })
                    } else {
                        resolve('当前没有正在展示的 group')
                    }
                })
            }
        }

        Vue.component(Animated.name, Animated)
        Vue.component(AnimatedGroup.name, AnimatedGroup)
    }
}
