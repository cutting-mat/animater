<template>
  <div class="flex-col visual" v-if="screen.width" :style="{width: screen.width+'px', height: screen.height+'px'}">
    <div class="header">
      头部logo(具名模式)
      <el-button @click="$animateGroup.enter('group-1')">show left1</el-button>
      <el-button @click="$animateGroup.enter('group-2')">show left2</el-button>
      <el-button @click="$animateGroup.leave()">close</el-button>
    </div>
    <div class="flex-1 flex-row">
      <div class="left">
        left
        <animate-group class="group flex-col" name="group-1">
          <animate-box class="flex-1 visual-block">
            group-1 1
          </animate-box>
          <animate-box class="flex-1 visual-block">
            group-1 2
          </animate-box>
          <animate-box class="flex-1 visual-block">
            group-1 3
          </animate-box>
        </animate-group>
        
        <animate-group class="group flex-col" name="group-2">
          <animate-box class="flex-1 visual-block">
            group-2 1
          </animate-box>
          <animate-box class="flex-1 visual-block">
            group-2 2
          </animate-box>
          <animate-box class="flex-1 visual-block">
            group-2 3
          </animate-box>
        </animate-group>
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
