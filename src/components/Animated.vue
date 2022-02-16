<template>
  <div
    v-show="asSubassembly || visibility"
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
  name: "Animated",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      required: false,
    },
    enterClass: {
      type: String,
      required: false,
      default() {
        return this.$parent.$props.enterClass || "animate__fadeIn";
      },
    },
    leaveClass: {
      type: String,
      required: false,
      default() {
        return this.$parent.$props.leaveClass || "animate__fadeOut";
      },
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
    asSubassembly() {
      return this.$parent && this.$parent.$options.name === "AnimatedGroup";
    },
  },
  watch: {
    value: {
      handler() {
        if (this.asSubassembly && this.value !== undefined) {
          console.warn(
            "Animated作为AnimatedGroup的子组件时不支持v-model/:value受控模式"
          );
        } else {
          if (this.value) {
            this.enter();
          } else {
            this.leave();
          }
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
        if (this.leaveTimerHandle) {
          // 如果正在退场，立即终止
          this.clearTimerHandle(this.leaveTimerHandle);
          this.animateClass = "";
        }

        this.enterTimerHandle = setTimeout(() => {
          if (this.visibility) {
            return resolve("already enter");
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
            resolve("done enter");
          }, this.duration * 1000);
        }, delay || 0);
      });
    },
    leave(delay) {
      return new Promise((resolve) => {
        if (this.enterTimerHandle) {
          // 如果正在进场，立即终止
          this.clearTimerHandle(this.enterTimerHandle);
          this.animateClass = "";
        }

        this.leaveTimerHandle = setTimeout(() => {
          if (!this.visibility) {
            return resolve("already leave");
          }

          this.animateClass = "animate__animated " + this.leaveClass;
          this.$emit("leaveStart");

          this.leaveTimerHandle = setTimeout(() => {
            this.visibility = false;

            this.animateClass = "";
            this.clearTimerHandle(this.leaveTimerHandle);
            this.$emit("leaveEnd");
            resolve("done leave");
          }, this.duration * 1000);
        }, delay || 0);
      });
    },
  },
};
</script>

<style>
</style>
