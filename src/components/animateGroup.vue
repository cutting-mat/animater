<template>
  <div v-show="visibility">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AnimateGroup",
  props: {
    name: {
      type: String,
      required: false,
    },
    animateDelay: {
      type: Number,
      required: false,
      default: 0.3,
    },
    groupDelay: {
      type: Number,
      required: false,
      default: 0.8,
    },
  },

  data() {
    return {
      visibility: false,
      animateTimerHandle: null,
    };
  },
  computed: {
    animatePlugin() {
      return this.$animatePlugin;
    },
  },
  watch: {
    "$animatePlugin.orderGroupName": {
      handler(orderGroupName) {
        if (orderGroupName === this.name) {
          this.showAnimateBox();
        } else {
          this.hideAnimateBox();
        }
      },
      immediate: true,
    },
  },
  methods: {
    showAnimateBox() {
      this.visibility = true;
      if (this.animateTimerHandle) {
        // 丢弃未开始的进场动画
        window.clearTimeout(this.animateTimerHandle);
        this.animateTimerHandle = null;
      }
      this.animateTimerHandle = setTimeout(
        () => {
          // console.log("开始进场", this.name);
          this.animateTimerHandle = null;
          this.$animatePlugin.currentGroupName = this.name;
          this.$emit('groupEnterStart')
          Promise.all(
            this.$children.map((c, i) => c.enter(this.animateDelay * i * 1000))
          ).then((values) => {
            // console.log("进场完成", this.name);
            this.$emit('groupEnterEnd')
          });
        },
        this.$animatePlugin.currentGroupName ? this.groupDelay * 1000 : 0
      );
    },
    hideAnimateBox() {
      if (this.animateTimerHandle) {
        // 丢弃未开始的进场动画
        window.clearTimeout(this.animateTimerHandle);
        this.animateTimerHandle = null;
      }
      this.animateTimerHandle = setTimeout(() => {
        // console.log("开始退场", this.name);
        this.$emit('groupLeaveStart')
        Promise.all(
          this.$children.map((c, i) => c.leave(this.animateDelay * i * 1000))
        ).then((values) => {
          // console.log("退场完成", this.name);
          if (this.$animatePlugin.orderGroupName !== this.name) {
            this.visibility = false;
          }
          this.$emit('groupLeaveEnd')
        });
      }, 0);
    },
  },
};
</script>

<style>
</style>
