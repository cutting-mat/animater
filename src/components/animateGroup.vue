<template>
  <div v-show="visibility">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: `AnimateGroup`,
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
      index: 0
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
    clearAnimateTimerHandle(){
      if (this.animateTimerHandle) {
        window.clearTimeout(this.animateTimerHandle);
        this.animateTimerHandle = null;
      }
    },
    showAnimateBox() {
      this.visibility = true;
      this.clearAnimateTimerHandle()

      this.animateTimerHandle = setTimeout(
        () => {
          this.animateTimerHandle = null;
          this.$animatePlugin.currentGroupName = this.name;
          this.$emit('groupEnterStart')
          Promise.all(
            this.$children.map((c, i) => c.enter(this.animateDelay * i * 1000))
          ).then((values) => {
            this.$emit('groupEnterEnd')
          }).catch(err => {
            console.warn(err)
          })
        },
        this.$animatePlugin.currentGroupName ? this.groupDelay * 1000 : 0
      );
    },
    hideAnimateBox() {
      this.clearAnimateTimerHandle()

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
        }).catch(err => {
          console.warn(err)
        })
      }, 0);
    },
  },
  mounted(){
    this.index = this.$groupCreated(this.name)
  },
  destroyed(){
    this.$groupDestroyed(this.name, this.index)
  }
};
</script>

<style>
</style>
