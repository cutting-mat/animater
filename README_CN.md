[English](README.md) | 中文

# @cutting-mat/animater

[![npm](https://img.shields.io/npm/v/@cutting-mat/animater.svg)](https://www.npmjs.com/package/@cutting-mat/animater) [![license](https://img.shields.io/github/license/cutting-mat/animater.svg)]()

## 特性

- \<animated\> 组件搭配 [Animate.css](https://animate.style/) 实现进出场动画
- \<animated-group\> 和 \<animated\> 组合，轻松实现动画编排
- 支持匿名模式、受控模式、编组模式，满足多种动画需求
- 配合 VueRouter 的 `beforeRouteLeave` 钩子还能实现页面离场动画

## 安装

``` bash
npm i @cutting-mat/animater -S
```

## 使用

```js
import animater from '@cutting-mat/animater';
Vue.use(animater);
```

### 匿名模式

最简单的应用方式，匿名动画组元素依次进场

``` html
<animated-group>
    <animated>
        内容 1
    </animated>
    <animated>
        内容 2
    </animated>
    <animated>
        内容 3
    </animated>
</animated-group>

```

### 受控模式

\<animated\> 和 \<animated-group\> 均支持 `v-modle / value`, 通过数据驱动进出场状态

``` html
<animated-group v-modle="groupVisible">
    <animated>
        内容 1
    </animated>
    <animated>
        内容 2
    </animated>
    <animated>
        内容 3
    </animated>
</animated-group>

<animated v-modle="dialogVisible">
    一个弹窗
</animated>

```

### 编组模式

通过为 \<animated-group\> 组件命名将他们分成多个动画组，用实例方法控制各动画组切换

``` html
<!-- 组 1 -->
<animated-group name="group1" class="group1-part1">
    <animated>
        内容 1-1
    </animated>
    <animated>
        内容 1-2
    </animated>
    <animated>
        内容 1-3
    </animated>
</animated-group>

<animated-group name="group1" class="group1-part2">
    <animated>
        内容 1-4
    </animated>
    <animated>
        内容 1-5
    </animated>
    <animated>
        内容 1-6
    </animated>
</animated-group>

<!-- 组 2 -->
<animated-group name="group2" class="group2-part1">
    <animated>
        内容 2-1
    </animated>
    <animated>
        内容 2-2
    </animated>
    <animated>
        内容 2-3
    </animated>
</animated-group>

<animated-group name="group2" class="group2-part2">
    <animated>
        内容 2-4
    </animated>
    <animated>
        内容 2-5
    </animated>
    <animated>
        内容 2-6
    </animated>
</animated-group>

```

``` js
// 在组件中使用Vue实例方法
this.$AnimatedGroup.enter('group1')

```

## \<AnimatedGroup\> Props

| 属性  | 说明 | 类型 | 可选值 | 默认值 |
| ----  | ---- | ---- | ---- | ---- |
| v-modle / value | 动画组的进出场状态 | Boolean | -- | -- |
| name | 动画组名称 | String | -- | -- |
| enterClass | \<Animated\> 子组件的进场动画 class | String | [Animate.css](https://animate.style/) | 'animate__zoomIn' |
| leaveClass | \<Animated\> 子组件的退场动画 class | String | [Animate.css](https://animate.style/) | 'animate__zoomOut' |
| duration | \<Animated\> 子组件动画时长，单位s | Number | -- | 0.5 |
| delay | \<Animated\> 子组件之间的进/出场时间间隔，单位s | Number | -- | 0.3 |
| groupDelay | 具名动画组之间的进/出场时间间隔，单位s | Number | -- | 0.8 |

## \<AnimatedGroup\> Events

| 事件名  | 说明 | 回调参数 |
| ----  | ---- | ---- |
| change | 进出场状态变化事件 | 当前进出场状态: visibility[Boolean] |
| groupEnterStart | 进场动画开始事件 | -- |
| groupEnterEnd | 进场动画结束事件 | -- |
| groupLeaveStart | 退场动画开始事件 | -- |
| groupLeaveEnd | 退场动画结束事件 | -- |

## \<Animated\> Props

| 属性  | 说明 | 类型 | 可选值 | 默认值 |
| ----  | ---- | ---- | ---- | ---- |
| v-modle / value | 进出场状态 (作为AnimatedGroup子组件时无效) | Boolean | -- | -- |
| enterClass | 进场动画 class (优先级高于父组件设置) | String | [Animate.css](https://animate.style/) | 'animate__fadeIn' |
| leaveClass | 退场动画 class (优先级高于父组件设置) | String | [Animate.css](https://animate.style/) | 'animate__fadeOut' |
| duration | 动画时长，单位s  (优先级高于父组件设置) | Number | -- | 0.5 |

## \<Animated\> Events

| 事件名  | 说明 | 回调参数 |
| ----  | ---- | ---- |
| change | 进出场状态变化事件 | 当前进出场状态: visibility[Boolean] |
| enterStart | 进场动画开始事件 | -- |
| enterEnd | 进场动画结束事件 | -- |
| leaveStart | 退场动画开始事件 | -- |
| leaveEnd | 退场动画结束事件 | -- |

## 实例方法

| 方法名  | 说明 | 参数 | 返回值 |
| ----  | ---- | ---- | ---- |
| $AnimatedGroup.enter | 指定动画组进场 | 动画组名称: name[String] | Promise |
| $AnimatedGroup.leave | 前台动画组退场 | 动画组名称: name[String]，非必须，无参数将关闭所有当前正在展示的动画组 | Promise |

## 注意

- AnimatedGroup 与 Animated 组合使用时，必须是直接上下级
- 如果 AnimatedGroup 包含于单文件组件中，该组件必须同步加载


## 退场动画

`beforeRouteLeave钩子` 配合 `$AnimatedGroup.leave()` 实现页面退场动画

``` js
    beforeRouteLeave(to, from, next) {
        this.$AnimatedGroup.leave().then(() => {
        next();
        })
    },
```