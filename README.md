# @cutting-mat/vue-animate-layout

[![npm](https://img.shields.io/npm/v/@cutting-mat/vue-animate-layout.svg)](https://www.npmjs.com/package/@cutting-mat/vue-animate-layout) [![license](https://img.shields.io/github/license/cutting-mat/vue-animate-layout.svg)]()

Base on [Animate.css](https://animate.style/)

## Install

``` bash
npm i @cutting-mat/vue-animate-layout -S
```

## Use

```js
import customPlugin from '@cutting-mat/vue-animate-layout';
Vue.use(customPlugin);
```

``` html
<animate-group>
    <animate-box>
        1-1
    </animate-box>
    <animate-box>
        1-2
    </animate-box>
    <animate-box>
        1-3
    </animate-box>
</animate-group>
```

## AnimateGroup Props

| 属性  | 说明 | 类型 | 可选值 | 默认值 |
| ----  | ---- | ---- | ---- | ---- |
| v-modle/:value | 动画组的进出场状态(受控模式) | Boolean | -- | -- |
| name | 动画组名称(具名模式) | String | -- | -- |
| enterClass | 子AnimateBox元素的进场动画class | String |[Animate.css](https://animate.style/) | 'animate__zoomIn' |
| leaveClass | 子AnimateBox元素的退场动画class | String |[Animate.css](https://animate.style/) | 'animate__zoomOut' |
| delay | 子AnimateBox元素的进出场动画间隔，单位s | Number | -- | 0.3 |
| groupDelay | 具名模式下，相邻动画组进场退场的动画间隔 | Number | -- | 0.8 |

## AnimateGroup Events

| 事件名  | 说明 | 回调参数 |
| ----  | ---- | ---- |
| change | 进出场状态变化 | 当前进出场状态 visibility[Boolean] |
| groupEnterStart | 进场动画开始 | -- |
| groupEnterEnd | 进场动画结束 | -- |
| groupLeaveStart | 退场动画开始 | -- |
| groupLeaveEnd | 退场动画结束 | -- |

## AnimateBox Props

| 属性  | 说明 | 类型 | 可选值 | 默认值 |
| ----  | ---- | ---- | ---- | ---- |
| v-modle/:value | 动画容器的进出场状态(作为子组件时不可用) | Boolean | -- | -- |
| enterClass | 进场动画class，作为子组件时优先级高于AnimateGroup同名属性 | String |[Animate.css](https://animate.style/) | 'animate__fadeIn' |
| leaveClass | 退场动画class，作为子组件时优先级高于AnimateGroup同名属性 | String |[Animate.css](https://animate.style/) | 'animate__fadeOut' |
| duration | 进出场动画时长，单位s | Number | -- | 0.5 |

## AnimateBox Events

| 事件名  | 说明 | 回调参数 |
| ----  | ---- | ---- |
| change | 进出场状态变化 | 当前进出场状态 visibility[Boolean] |
| enterStart | 进场动画开始 | -- |
| enterEnd | 进场动画结束 | -- |
| leaveStart | 退场动画开始 | -- |
| leaveEnd | 退场动画结束 | -- |

## Instance Methods

| 方法名  | 说明 | 参数 |
| ----  | ---- | ---- |
| $animateGroup.enter | 具名模式，指定具名动画组进场 | 动画组名称 name[String] |
| $animateGroup.leave | 具名模式，前台动画组退场 | -- |
