# @cutting-mat/animater

[![npm](https://img.shields.io/npm/v/@cutting-mat/animater.svg)](https://www.npmjs.com/package/@cutting-mat/animater) [![license](https://img.shields.io/github/license/cutting-mat/animater.svg)]()

## Install

``` bash
npm i @cutting-mat/animater -S
```

## Use

```js
import animater from '@cutting-mat/animater';
Vue.use(animater);
```

``` html
<animated-group>
    <animated>
        1-1
    </animated>
    <animated>
        1-2
    </animated>
    <animated>
        1-3
    </animated>
</animated-group>
```

## AnimatedGroup Props

| 属性  | 说明 | 类型 | 可选值 | 默认值 |
| ----  | ---- | ---- | ---- | ---- |
| v-modle/value | 动画组的进出场状态(受控模式) | Boolean | -- | -- |
| name | 动画组名称(具名模式) | String | -- | -- |
| enterClass | 子AnimateBox元素的进场动画class | String |[Animate.css](https://animate.style/) | 'animate__zoomIn' |
| leaveClass | 子AnimateBox元素的退场动画class | String |[Animate.css](https://animate.style/) | 'animate__zoomOut' |
| delay | 子AnimateBox元素的进出场动画间隔，单位s | Number | -- | 0.3 |
| groupDelay | 具名模式下，相邻动画组进场退场的动画间隔 | Number | -- | 0.8 |

## AnimatedGroup Events

| 事件名  | 说明 | 回调参数 |
| ----  | ---- | ---- |
| change | 进出场状态变化 | 当前进出场状态 visibility[Boolean] |
| groupEnterStart | 进场动画开始 | -- |
| groupEnterEnd | 进场动画结束 | -- |
| groupLeaveStart | 退场动画开始 | -- |
| groupLeaveEnd | 退场动画结束 | -- |

## Animated Props

| 属性  | 说明 | 类型 | 可选值 | 默认值 |
| ----  | ---- | ---- | ---- | ---- |
| v-modle/value | 动画容器的进出场状态(作为子组件时不可用) | Boolean | -- | -- |
| enterClass | 进场动画class，作为子组件时优先级高于AnimateGroup同名属性 | String |[Animate.css](https://animate.style/) | 'animate__fadeIn' |
| leaveClass | 退场动画class，作为子组件时优先级高于AnimateGroup同名属性 | String |[Animate.css](https://animate.style/) | 'animate__fadeOut' |
| duration | 进出场动画时长，单位s | Number | -- | 0.5 |

## Animated Events

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
| $AnimatedGroup.enter | 具名模式，指定具名动画组进场 | 动画组名称 name[String] |
| $AnimatedGroup.leave | 具名模式，前台动画组退场 | -- |
