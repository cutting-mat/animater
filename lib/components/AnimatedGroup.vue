<template>
  <div v-show="visibility">
    <slot></slot>
  </div>
</template>

<script>
import { PluginData, registerGroup, destroyGroup } from "../animater";

export default {
  name: `AnimatedGroup`,
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      required: false,
    },
    name: {
      type: String,
      required: false,
      default: 'anonymous'
    },
    enterClass: {
      type: String,
      required: false,
      default: "animate__zoomIn",
    },
    leaveClass: {
      type: String,
      required: false,
      default: "animate__zoomOut",
    },
    duration: {
      type: Number,
      required: false,
      default: 0.5
    },
    delay: {
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
      PluginData,
      visibility: false,
      animateTimerHandle: null,
      index: 0,
    };
  },
  watch: {
    value: {
      handler() {
        if (this.value) {
          this.enter();
        } else if (this.value !== undefined) {
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
    }
  },
  methods: {
    clearAnimateTimerHandle() {
      if (this.animateTimerHandle) {
        window.clearTimeout(this.animateTimerHandle);
        this.animateTimerHandle = null;
      }
    },
    enter() {
      this.visibility = true;
      this.clearAnimateTimerHandle();

      return new Promise((resolve, reject) => {
        this.animateTimerHandle = setTimeout(() => {
            this.animateTimerHandle = null;
            this.PluginData.currentGroupName = this.name || 'anonymous';
            this.$emit("groupEnterStart");

            Promise.all(
              this.$children
                .filter((c) => typeof c.enter === "function")
                .map((c, i) => c.enter(this.delay * i * 1000))
            )
              .then((values) => {
                // console.log(this.name, '进场完成', values)

                if(this.PluginData.orderGroupName === this.name && this.name){
                  // 进场结束清理 orderGroupName 变量
                  this.PluginData.orderGroupName = undefined
                }
                this.$emit("groupEnterEnd");
                resolve(this.visibility);
              })
              .catch((err) => {
                console.warn(err);
                reject(err);
              });
          }, this.PluginData.currentGroupName ? this.groupDelay * 1000 : 0 );
      });
    },
    leave() {
      this.clearAnimateTimerHandle();

      return new Promise((resolve, reject) => {
        this.animateTimerHandle = setTimeout(() => {
          this.animateTimerHandle = null;
          this.$emit("groupLeaveStart");

          Promise.all(
            this.$children
              .filter((c) => typeof c.leave === "function")
              .map((c, i) => c.leave(this.delay * i * 1000))
          )
            .then((values) => {
              // console.log(this.name, "退场完成", values, 'orderGroupName=', this.PluginData.orderGroupName);
              if (!(this.PluginData.orderGroupName === this.name && this.name!=='anonymous')) {
                // 排除 受控模式紧接着需要进场 的情况
                this.visibility = false;
              }
              if(this.PluginData.currentGroupName === this.name){
                // 退场结束清理 currentGroupName 变量
                this.PluginData.currentGroupName = undefined
              }
              this.$emit("groupLeaveEnd");
              resolve(this.visibility);
            })
            .catch((err) => {
              console.warn(err);
              reject(err);
            });
        }, 0);
      });
    },
  },
  created() {
    if (
      this.name === 'anonymous' && this.value === undefined
    ) {
      // 匿名 非受控 自动展示
      this.enter();
    }
  },
  mounted() {
    registerGroup(this);
  },
  destroyed() {
    destroyGroup(this);
  },
};
</script>

<style>
</style>
