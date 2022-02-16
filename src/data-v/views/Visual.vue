<template>
  <div class="flex-col visual" v-if="screen.width" :style="{width: screen.width+'px', height: screen.height+'px'}">
    <div class="header">
      头部logo(匿名动画组自动展示)
    </div>
    <div class="flex-1 flex-row">
      <animated-group class="left flex-col" enterClass="animate__fadeInLeft" leaveClass="animate__fadeOutLeft">
        <animated class="flex-1 visual-block">
          left 1
        </animated>
        <animated class="flex-1 visual-block">
          left 2
        </animated>
        <animated class="flex-1 visual-block">
          left 3
        </animated>
      </animated-group>
      
      <div class="flex-1 center">
        main
      </div>

      <animated-group class="right flex-col" enterClass="animate__fadeInRight" leaveClass="animate__fadeOutRight">
        <animated class="flex-1 visual-block">
          right 1
        </animated>
        <animated class="flex-1 visual-block">
          right 2
        </animated>
        <animated class="flex-1 visual-block">
          right 3
        </animated>
      </animated-group>
    </div>
  </div>
</template>

<script>
//import { util } from "@/core";

export default {
  data() {
    return {
      screen: {},
    };
  },
  methods: {},
  created() {
    const {width, height} = window.screen;
    this.screen = {
      width,
      height
    }
  },
};
</script>

<style scoped>
.visual{
  background:#434343;
  color: #fff;
}
.header{
  height: 80px;
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
}
.left, .right{
  width: 500px;
  max-width: 40%;
}
.visual-block{
  background: #333;
  border:1px solid #000;
  margin-bottom: 20px;
}

</style>
