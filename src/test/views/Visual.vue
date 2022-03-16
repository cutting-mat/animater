<template>
  <div class="flex-col">
    <div class="flex-1 flex-row">
      <animated-group
        class="left flex-col"
        enterClass="animate__fadeInLeft"
        leaveClass="animate__fadeOutLeft"
      >
        <animated class="flex-1 visual-block"> left 1 </animated>
        <animated class="flex-1 visual-block"> left 2 </animated>
        <animated class="flex-1 visual-block"> left 3 </animated>
      </animated-group>

      <animated-group class="flex-1 flex-col" :duration="1">
        <animated
          class="visual-block flex-1"
          enterClass="animate__zoomIn"
          leaveClass="animate__zoomOut"
        >
          main
        </animated>
      </animated-group>

      <animated-group
        class="right flex-col"
        enterClass="animate__fadeInRight"
        leaveClass="animate__fadeOutRight"
      >
        <animated class="flex-1 visual-block"> right 1 </animated>
        <animated class="flex-1 visual-block"> right 2 </animated>
        <animated class="flex-1 visual-block"> right 3 </animated>
      </animated-group>
    </div>
  </div>
</template>

<script>
//import { util } from "@/core";

export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>

<style scoped>
.left,
.right {
  width: 500px;
  max-width: 30%;
}
.left {
  margin-right: 20px;
}
.right {
  margin-left: 20px;
}
</style>
