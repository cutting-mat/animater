# @cutting-mat/vue-animate-layout

[![npm](https://img.shields.io/npm/v/@cutting-mat/vue-animate-layout.svg)](https://www.npmjs.com/package/@cutting-mat/vue-animate-layout) [![license](https://img.shields.io/github/license/cutting-mat/vue-animate-layout.svg)]()

## Install

``` bash
npm i @cutting-mat/vue-animate-layout -S
```

## Use

``` html
<animate-group name="group1" class="left" :animateDelay="0.3" :groupDelay="0.8">
    <animate-box
        class="animate-box left1"
        enterClass="animate__zoomIn"
        leaveClass="animate__zoomOut"
    >
        1-1
    </animate-box>
    <animate-box
        class="animate-box left1"
        enterClass="animate__zoomIn"
        leaveClass="animate__zoomOut"
    >
        1-2
    </animate-box>
    <animate-box
        class="animate-box left1"
        enterClass="animate__zoomIn"
        leaveClass="animate__zoomOut"
    >
        1-3
    </animate-box>
</animate-group>
```

## Props

## Events
