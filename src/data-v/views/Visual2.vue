<template>
  <div
    class="flex-col visual"
    v-if="screen.width"
    :style="{ width: screen.width + 'px', height: screen.height + 'px' }"
  >
    <div class="header">
      头部logo(受控模式)
      <el-button @click="groupVisible = !groupVisible">toggle</el-button>
      <el-button @click="callEnter">enter()</el-button>
    </div>
    <div class="flex-1 flex-row">
      <animated-group
        class="left flex-col"
        v-model="groupVisible"
        name="group1"
        enterClass="animate__fadeInLeft"
        leaveClass="animate__fadeOutLeft"
        @change="handleChange"
      >
        <animated class="flex-1 visual-block"> left 1 </animated>
        <animated class="flex-1 visual-block"> left 2 </animated>
        <animated class="flex-1 visual-block"> left 3 </animated>
      </animated-group>

      <div class="flex-1 center">main</div>

      <animated-group
        class="right flex-col"
        v-model="groupVisible"
        name="group1"
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
    return {
      screen: {},
      groupVisible: true,
    };
  },
  methods: {
    handleChange(visible){
      console.log('handleChange', visible)
    },
    callEnter(){
      this.$AnimatedGroup.enter('group1').then(res => {
        console.log('callEnter then:', res)
      }).catch(err => {
        console.warn(err)
      })
    }
  },
  created() {
    const { width, height } = window.screen;
    this.screen = {
      width,
      height,
    };
  },
};
</script>

<style scoped>
.visual {
  background: #434343;
  color: #fff;
}
.header {
  height: 80px;
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
}
.left,
.right {
  width: 500px;
  max-width: 40%;
}
.visual-block {
  background: #333;
  border: 1px solid #000;
  margin-bottom: 20px;
}
</style>
