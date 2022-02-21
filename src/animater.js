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
                    if (groupName) {
                        Vue.nextTick(() => {
                            if (PluginData.groups.has(groupName)) {
                                if (PluginData.currentGroupName === groupName) {
                                    // 目标正在前台
                                    resolve(`${groupName} already on the stage`)
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
                                reject(`$AnimatedGroup.enter('${groupName}'): groupName unregistered`)
                            }
                        })
                    } else {
                        reject(`$AnimatedGroup.enter(groupName): Missing param`)
                    }
                })
            },
            leave: function (groupName) {
                return new Promise((resolve, reject) => {
                    if (groupName) {
                        // 指定 name
                        if(PluginData.groups.get(groupName)){
                            if (groupName === PluginData.orderGroupName || (groupName === PluginData.currentGroupName)) {
                                PluginData.groups.get(groupName).forEach(vm => {
                                    resolve(vm.leave())
                                })
                            } else {
                                resolve(`$AnimatedGroup.leave('${groupName}'): The group is not on the stage`)
                            }
                        }else{
                            reject(`$AnimatedGroup.leave('${groupName}'): groupName unregistered`)
                        }
                        
                    } else {
                        // 关闭所有正在展示的group
                        let grousVm = []
                        for(let set of PluginData.groups.values()){
                            grousVm.push(Array.from(set))
                        }
                        const visibleGroup = grousVm.flat().filter(vm => vm.visibility);

                        if(visibleGroup.length){
                            visibleGroup.forEach(vm => {
                                resolve(vm.leave())
                            })
                        }else{
                            resolve(`$AnimatedGroup.leave(): No group is not on the stage`)
                        }
                    }
                })

            }
        }

        Vue.component(Animated.name, Animated)
        Vue.component(AnimatedGroup.name, AnimatedGroup)
    }
}
