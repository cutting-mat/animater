<template>
  <div class="flex-col visual" v-if="screen.width" :style="{width: screen.width+'px', height: screen.height+'px'}">
    <div class="header">
      头部logo(具名模式)
      <el-button @click="callGroup('group-1')">show left1</el-button>
      <el-button @click="callGroup('group-2')">show left2</el-button>
      <el-button @click="$AnimatedGroup.leave()">close</el-button>
    </div>
    <div class="flex-1 flex-row">
      <div class="left">
        left
        <animated-group class="group flex-col" name="group-1">
          <animated class="flex-1 visual-block">
            group-1 1
          </animated>
          <animated class="flex-1 visual-block">
            group-1 2
          </animated>
          <animated class="flex-1 visual-block">
            group-1 3
          </animated>
        </animated-group>
        
        <animated-group class="group flex-col" name="group-2">
          <animated class="flex-1 visual-block">
            group-2 1
          </animated>
          <animated class="flex-1 visual-block">
            group-2 2
          </animated>
          <animated class="flex-1 visual-block">
            group-2 3
          </animated>
        </animated-group>
      </div>
      

      <div class="flex-1 center" style="background:#999">
        main
      </div>

      <div class="right">
        right
      </div>
    </div>
  </div>
</template>

<script>
//import { util } from "@/core";

export default {
  data() {
    return {
      screen: {},
      groupVisible: false
    };
  },
  methods: {
    callGroup(groupName){
      this.$AnimatedGroup.enter(groupName).then(() => {
        console.log(groupName, '进场完成')
      }).catch(err => {
        console.warn(err)
      })
    }
  },
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
  background:#dedede;
}
.header{
  height: 80px;
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
}
.left, .right{
  position: relative;
  width: 500px;
  max-width: 40%;
  background: #434343;
  color: #fff;
}
.visual-block{
  background: #333;
  border:1px solid #000;
  margin-bottom: 20px;
}

.group{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
