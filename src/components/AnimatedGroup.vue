<template>
  <div v-show="visibility">
    <slot></slot>
  </div>
</template>

<script>
import { PluginData, registerGroup, destroyGroup } from "../index";

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
    },
    "PluginData.orderGroupName": {
      handler(orderGroupName) {
        if (orderGroupName === this.name) {
          this.enter();
        } else {
          this.leave();
        }
      },
    },
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

      this.animateTimerHandle = setTimeout(
        () => {
          this.animateTimerHandle = null;
          this.PluginData.currentGroupName = this.name;
          this.$emit("groupEnterStart");

          Promise.all(
            this.$children.map((c, i) => c.enter(this.delay * i * 1000))
          )
            .then((values) => {
              // console.log('进场完成', values)
              this.$emit("groupEnterEnd");
            })
            .catch((err) => {
              console.warn(err);
            });
        },
        this.PluginData.currentGroupName ? this.groupDelay * 1000 : 0
      );
    },
    leave() {
      this.clearAnimateTimerHandle();

      this.animateTimerHandle = setTimeout(() => {
        this.animateTimerHandle = null;
        this.$emit("groupLeaveStart");

        Promise.all(
          this.$children.map((c, i) => c.leave(this.delay * i * 1000))
        )
          .then((values) => {
            // console.log("退场完成", values);
            if(this.PluginData.orderGroupName === this.name && this.name){
              this.PluginData.orderGroupName = undefined
            }
            this.visibility = false;
            this.$emit("groupLeaveEnd");
          })
          .catch((err) => {
            console.warn(err);
          });
      }, 0);
    },
  },
  created() {
    if (
      this.PluginData.orderGroupName === this.name &&
      this.value === undefined
    ) {
      this.enter();
    }
  },
  mounted() {
    this.index = registerGroup(this.name);
  },
  destroyed() {
    destroyGroup(this.name, this.index);
  },
};
</script>

<style>
</style>
