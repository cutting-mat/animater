English | [中文](README_CN.md)

# @cutting-mat/animater

[![npm](https://img.shields.io/npm/v/@cutting-mat/animater.svg)](https://www.npmjs.com/package/@cutting-mat/animater) [![license](https://img.shields.io/github/license/cutting-mat/animater.svg)]()

## Feature

- \<animated\> component matching [animate. CSS](https://animate.style/) Achieve entry and exit animation
- The combination of \<animated-group\> and \<animated\> can easily realize animation arrangement
- Support anonymous mode, controlled mode and grouping mode to meet a variety of animation needs
- With VueRoter's `beforerouteleave` hook, the page departure animation can also be realized

## Install

``` bash
npm i @cutting-mat/animater -S
```

## Use

```js
import animater from '@cutting-mat/animater';
Vue.use(animater);
```

### Anonymous Mode

The simplest application method is that the \<animated\> components in the anonymous \<animated-group\> will enter the site in turn

``` html
<animated-group>
    <animated>
        Content 1
    </animated>
    <animated>
        Content 2
    </animated>
    <animated>
        Content 3
    </animated>
</animated-group>

```

### Controlled Mode

Both \<animated\> and \<animated-group\> support `v-mode / value` to drive the entry and exit status through data

``` html
<animated-group v-modle="groupVisible">
    <animated>
        Content 1
    </animated>
    <animated>
        Content 2
    </animated>
    <animated>
        Content 3
    </animated>
</animated-group>

<animated v-modle="dialogVisible">
    a dialog
</animated>

```

### Marshalling Mode

By naming \<animated-group\> components, they are divided into multiple animation groups, and the instance method is used to control the switching of each animation group

``` html
<!-- group 1 -->
<animated-group name="group1" class="group1-part1">
    <animated>
        Content 1-1
    </animated>
    <animated>
        Content 1-2
    </animated>
    <animated>
        Content 1-3
    </animated>
</animated-group>

<animated-group name="group1" class="group1-part2">
    <animated>
        Content 1-4
    </animated>
    <animated>
        Content 1-5
    </animated>
    <animated>
        Content 1-6
    </animated>
</animated-group>

<!-- group 2 -->
<animated-group name="group2" class="group2-part1">
    <animated>
        Content 2-1
    </animated>
    <animated>
        Content 2-2
    </animated>
    <animated>
        Content 2-3
    </animated>
</animated-group>

<animated-group name="group2" class="group2-part2">
    <animated>
        Content 2-4
    </animated>
    <animated>
        Content 2-5
    </animated>
    <animated>
        Content 2-6
    </animated>
</animated-group>

```

``` js
// Using Vue instance methods in components
this.$AnimatedGroup.enter('group1')

```

## \<AnimatedGroup\> Props

| Props  | Description  | Type | Optional | Default |
| ----  | ---- | ---- | ---- | ---- |
| v-modle / value | Entry and exit status of animation group | Boolean | -- | -- |
| name | Animation group name | String | -- | -- |
| enterClass | Approach animation class of \<Animated\> subcomponent | String | [Animate.css](https://animate.style/) | 'animate__zoomIn' |
| leaveClass | Exit animation class of \<Animated\> subcomponents | String | [Animate.css](https://animate.style/) | 'animate__zoomOut' |
| duration | Animation duration of \<Animated\> subcomponents, unit: S | Number | -- | 0.5 |
| delay | Entry / exit time interval between \<Animated\> subcomponents, unit: S | Number | -- | 0.3 |
| groupDelay | Entry / exit time interval between named animation groups, unit: S | Number | -- | 0.8 |

## \<AnimatedGroup\> Events

| Event Name  | Description | Callback Arguments |
| ----  | ---- | ---- |
| change | Entry and exit status change event | Current entry and exit status: visibility[Boolean] |
| groupEnterStart | Entry animation start event | -- |
| groupEnterEnd | Entry animation end event | -- |
| groupLeaveStart | Exit animation start event | -- |
| groupLeaveEnd | Exit animation end event | -- |

## \<Animated\> Props

| Props  | Description  | Type | Optional | Default |
| ----  | ---- | ---- | ---- | ---- |
| v-modle / value | Inbound and outbound status (invalid as a child of animatedgroup) | Boolean | -- | -- |
| enterClass | Approach animation class (priority over parent component setting) | String | [Animate.css](https://animate.style/) | 'animate__fadeIn' |
| leaveClass | Exit animation class (priority over parent component setting) | String | [Animate.css](https://animate.style/) | 'animate__fadeOut' |
| duration | Animation duration, in S (priority over parent component setting) | Number | -- | 0.5 |

## \<Animated\> Events

| Event Name  | Description | Callback Arguments |
| ----  | ---- | ---- |
| change | Entry and exit status change event | Current entry and exit status: visibility[Boolean] |
| enterStart | Entry animation start event | -- |
| enterEnd | Entry animation end event | -- |
| leaveStart | Exit animation start event | -- |
| leaveEnd | Exit animation end event | -- |

## Instance Methods

| Method Name  | Description | Arguments | Return |
| ----  | ---- | ---- | ---- |
| $AnimatedGroup.enter | Specify animation group approach | Animation group name: name[String] | Promise |
| $AnimatedGroup.leave | Front desk animation team exit | -- | Promise |

## Notice

- When AnimatedGroup and Animated are used in combination, they must be direct superiors and subordinates
- If AnimatedGroup is included in a single file component, the component must be loaded synchronously
