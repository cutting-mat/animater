# @cutting-mat/animater

[![npm](https://img.shields.io/npm/v/@cutting-mat/animater.svg)](https://www.npmjs.com/package/@cutting-mat/animater) [![license](https://img.shields.io/github/license/cutting-mat/animater.svg)]()

## Feature

- 单独使用 \<animated\> 搭配 [Animate.css](https://animate.style/) 实现进出场动画
- 组合使用 \<animated-group\> 和 \<animated\> 轻松实现多元素进出场动画编排
- 支持匿名模式、受控模式、具名模式，满足各种需求
- 配合Vue `beforeRouteLeave` 钩子还能实现路由切换动画

## Install

``` bash
npm i @cutting-mat/animater -S
```

## Use

```js
import animater from '@cutting-mat/animater';
Vue.use(animater);
```

### 匿名模式

\<animated\> 将依次进场

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

### 受控模式:

展示优先级高于匿名模式

``` html
<animated-group v-modle="groupVisible">
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
<!-- <animated> 也可以单独使用  -->
<animated v-modle="dialogVisible">
    a dialog
</animated>

```

### 具名模式

通过实例方法控制元素批量进场/退场

``` html
<animated-group name="group1">
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

<animated-group name="group2">
    <animated>
        2-1
    </animated>
    <animated>
        2-2
    </animated>
    <animated>
        2-3
    </animated>
</animated-group>


```

## AnimatedGroup Props

| 属性  | 说明 | 类型 | 可选值 | 默认值 |
| ----  | ---- | ---- | ---- | ---- |
| v-modle/value | 动画组的进出场状态(受控模式) | Boolean | -- | -- |
| name | 动画组名称(具名模式) | String | -- | -- |
| enterClass | 子AnimateBox元素的进场动画class | String | [Animate.css](https://animate.style/) | 'animate__zoomIn' |
| leaveClass | 子AnimateBox元素的退场动画class | String | [Animate.css](https://animate.style/) | 'animate__zoomOut' |
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
| v-modle/value | 动画容器的进出场状态(仅独立使用生效，作为AnimatedGroup子组件时不生效) | Boolean | -- | -- |
| enterClass | 进场动画class，作为子组件时优先级高于AnimateGroup同名属性 | String | [Animate.css](https://animate.style/) | 'animate__fadeIn' |
| leaveClass | 退场动画class，作为子组件时优先级高于AnimateGroup同名属性 | String | [Animate.css](https://animate.style/) | 'animate__fadeOut' |
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

| 方法名  | 说明 | 参数 | 返回值 |
| ----  | ---- | ---- | ---- |
| $AnimatedGroup.enter | 具名模式，指定具名动画组进场 | 动画组名称 name[String] | 进场动画 Promise |
| $AnimatedGroup.leave | 具名模式，前台动画组退场 | -- | 退场动画 Promise |

## Notice

- AnimatedGroup & Animated 组合使用时，必须是直接上下级
- 如果 AnimatedGroup 包含于单文件组件中，该组件必须同步加载
