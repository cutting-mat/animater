<template>
  <div
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

  methods: {
    enter(delay) {
      this.offstage = false;
      return new Promise(resolve => {
        setTimeout(() => {
          this.visibility = true;
          this.currentAnimateName = "animate__animated " + this.enterClass;
          setTimeout(() => {
            this.currentAnimateName = "";
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
              setTimeout(() => {
                  this.visibility = false;
                  this.currentAnimateName = "";
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
