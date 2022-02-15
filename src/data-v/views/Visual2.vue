<template>
  <div class="flex-col visual" v-if="screen.width" :style="{width: screen.width+'px', height: screen.height+'px'}">
    <div class="header">
      头部logo(受控模式)
      <el-button @click="groupVisible=!groupVisible">toggle</el-button>
    </div>
    <div class="flex-1 flex-row">
      <animate-group class="left flex-col" v-model="groupVisible" enterClass="animate__fadeInLeft" leaveClass="animate__fadeOutLeft">
        <animate-box class="flex-1 visual-block">
          left 1
        </animate-box>
        <animate-box class="flex-1 visual-block">
          left 2
        </animate-box>
        <animate-box class="flex-1 visual-block">
          left 3
        </animate-box>
      </animate-group>

      <div class="flex-1 center">
        main
      </div>
      
      <animate-group class="right flex-col" v-model="groupVisible" enterClass="animate__fadeInRight" leaveClass="animate__fadeOutRight">
        <animate-box class="flex-1 visual-block">
          right 1
        </animate-box>
        <animate-box class="flex-1 visual-block">
          right 2
        </animate-box>
        <animate-box class="flex-1 visual-block">
          right 3
        </animate-box>
      </animate-group>
    </div>
  </div>
</template>

<script>
//import { util } from "@/core";

export default {
  data() {
    return {
      screen: {},
      groupVisible: true
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
