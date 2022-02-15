<template>
  <div v-show="keepDomLayout || visibility"
    :class="currentAnimateName"
    :style="{
      'animation-duration': duration + 's',
      visibility: visibility ? 'visible' : 'hidden',
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
// TODO 组件开启 keepDomLayout 模式 

export default {
  name: "AnimateBox",
  props: {
    enterClass: {
      type: String,
      required: false,
      default: 'animate__fadeInLeft'
    },
    leaveClass: {
      type: String,
      required: false,
      default: 'animate__fadeOutLeft'
    },
    duration: {
      type: Number,
      required: false,
      default: 0.5
    },
  },
  data() {
    return {
      offstage: false,
      currentAnimateName: "",
      visibility: false,
    };
  },
  computed: {
    keepDomLayout(){
      return this.$parent && (this.$parent.$options.name === 'AnimateGroup')
    }
  },
  methods: {
    enter(delay) {
      this.offstage = false;
      return new Promise(resolve => {
        setTimeout(() => {
          this.visibility = true;
          this.currentAnimateName = "animate__animated " + this.enterClass;
          this.$emit('enterStart')
          setTimeout(() => {
            this.currentAnimateName = "";
            this.$emit('enterEnd')
            resolve(true)
          }, this.duration * 1000)
        }, delay || 0);
      })
    },
    leave(delay) {
      this.offstage = true;
      return new Promise(resolve => {
          setTimeout(() => {
              this.currentAnimateName = "animate__animated " + this.leaveClass;
              this.$emit('leaveStart')
              setTimeout(() => {
                  this.visibility = false;
                  this.currentAnimateName = "";
                  this.$emit('leaveEnd')
                  resolve(true)
              }, this.duration * 1000)
              
          }, delay || 0)
      })
    },
  },
};
</script>

<style>
</style>
