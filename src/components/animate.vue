<template>
  <div
    v-show="keepDomLayout || visibility"
    :class="animateClass"
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
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
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
      animateClass: "",
      enterTimerHandle: null,
      leaveTimerHandle: null,
      visibility: false,
    };
  },
  computed: {
    keepDomLayout() {
      return this.$parent && this.$parent.$options.name === "AnimateGroup";
    },
  },
  watch: {
    value: {
      handler() {
        if (this.value) {
          this.enter();
        } else {
          this.leave();
        }
      },
      immediate: true,
    },
    visibility: {
      handler() {
        this.$emit("change", this.visibility);
      },
      immediate: true,
    },
  },
  methods: {
    clearTimerHandle(handle) {
      if (handle) {
        window.clearTimeout(handle);
        handle = null;
      }
    },
    enter(delay) {
      return new Promise((resolve) => {
        if(this.leaveTimerHandle){
          // 如果正在退场，立即终止
          this.clearTimerHandle(this.leaveTimerHandle);
          this.animateClass = "";
        }

        this.enterTimerHandle = setTimeout(() => {
          if (this.visibility) {
            return resolve('already enter');
          }
          
          this.visibility = true;
          // 执行动画
          this.animateClass = "animate__animated " + this.enterClass;
          this.$emit("enterStart");

          this.enterTimerHandle = setTimeout(() => {
            // 动画结束
            this.animateClass = "";
            this.clearTimerHandle(this.enterTimerHandle);
            this.$emit("enterEnd");
            resolve('done enter');
          }, this.duration * 1000);
        }, delay || 0);
      });
    },
    leave(delay) {
      return new Promise((resolve) => {
        if(this.enterTimerHandle){
          // 如果正在进场，立即终止
          this.clearTimerHandle(this.enterTimerHandle);
          this.animateClass = "";
        }

        this.leaveTimerHandle = setTimeout(() => {
          if (!this.visibility) {
            return resolve('already leave');
          }

          this.animateClass = "animate__animated " + this.leaveClass;
          this.$emit("leaveStart");

          this.leaveTimerHandle = setTimeout(() => {
            this.visibility = false;

            this.animateClass = "";
            this.clearTimerHandle(this.leaveTimerHandle);
            this.$emit("leaveEnd");
            resolve('done leave');
          }, this.duration * 1000);
        }, delay || 0);
      });
    },
  },
};
</script>

<style>
</style>
