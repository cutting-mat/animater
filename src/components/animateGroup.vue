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
      enterQueue: null,
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
      if (this.enterQueue) {
        // 丢弃未开始的进场动画
        window.clearTimeout(this.enterQueue);
        this.enterQueue = null;
      }
      this.enterQueue = setTimeout(
        () => {
          console.log("开始进场", this.name);
          this.enterQueue = null;
          this.$animatePlugin.currentGroupName = this.name;

          Promise.all(
            this.$children.map((c, i) => c.enter(this.animateDelay * i * 1000))
          ).then((values) => {
            console.log("进场完成", this.name);
          });
        },
        this.$animatePlugin.currentGroupName ? this.groupDelay * 1000 : 0
      );
    },
    hideAnimateBox() {
      if (this.enterQueue) {
        // 丢弃未开始的进场动画
        window.clearTimeout(this.enterQueue);
        this.enterQueue = null;
      }
      this.enterQueue = setTimeout(() => {
        console.log("开始退场", this.name);
        Promise.all(
          this.$children.map((c, i) => c.leave(this.animateDelay * i * 1000))
        ).then((values) => {
          console.log("退场完成", this.name);
          if (this.$animatePlugin.orderGroupName !== this.name) {
            this.visibility = false;
          }
        });
      }, 0);
    },
  },
};
</script>

<style>
</style>
