<template>
  <div
    v-show="keepDomLayout || visibility"
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
export default {
  name: "AnimateBox",
  props: {
    enterClass: {
      type: String,
      required: false,
      default: "animate__fadeInLeft",
    },
    leaveClass: {
      type: String,
      required: false,
      default: "animate__fadeOutLeft",
    },
    duration: {
      type: Number,
      required: false,
      default: 0.5,
    },
  },
  data() {
    return {
      offstage: false,
      currentAnimateName: "",
      visibility: false,
      animateTimerHandle: null,
    };
  },
  computed: {
    keepDomLayout() {
      return this.$parent && this.$parent.$options.name === "AnimateGroup";
    },
  },
  methods: {
    clearAnimateTimerHandle() {
      if (this.animateTimerHandle) {
        window.clearTimeout(this.animateTimerHandle);
        this.animateTimerHandle = null;
      }
    },
    enter(delay) {
      this.offstage = false;
      return new Promise((resolve) => {
        setTimeout(() => {
          if (this.animateTimerHandle) {
            // 动画正在进行
            return null;
          }
          if (this.visibility) {
            // 已展示状态
            return null;
          }
          this.visibility = true;
          this.currentAnimateName = "animate__animated " + this.enterClass;
          this.$emit("enterStart");
          this.animateTimerHandle = setTimeout(() => {
            this.currentAnimateName = "";
            this.clearAnimateTimerHandle();
            this.$emit("enterEnd");
            resolve(true);
          }, this.duration * 1000);
        }, delay || 0);
      });
    },
    leave(delay) {
      this.offstage = true;
      return new Promise((resolve) => {
        setTimeout(() => {
          if (this.animateTimerHandle) {
            // 动画正在进行
            return null;
          }
          if (!this.visibility) {
            // 已展示状态
            return null;
          }
          this.currentAnimateName = "animate__animated " + this.leaveClass;
          this.$emit("leaveStart");
          this.animateTimerHandle = setTimeout(() => {
            this.visibility = false;
            this.currentAnimateName = "";
            this.clearAnimateTimerHandle();
            this.$emit("leaveEnd");
            resolve(true);
          }, this.duration * 1000);
        }, delay || 0);
      });
    },
  },
};
</script>

<style>
</style>
