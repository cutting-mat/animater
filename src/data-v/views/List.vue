<template>
  <div id="app">
    <animate-group name="group1" class="left" @groupEnterEnd="handleGroupEnterEnd('group1')">
      <animate-box
        class="animate-box left1"
        enterClass="animate__zoomIn"
        leaveClass="animate__zoomOut"
        @enterEnd="handleEnterEnd('animate-box left1')"
      >
        <span>1-1</span>
      </animate-box>
      <animate-box
        class="animate-box left1"
        enterClass="animate__zoomIn"
        leaveClass="animate__zoomOut"
      >
        1-2
      </animate-box>
      <animate-box
        class="animate-box left1"
        enterClass="animate__zoomIn"
        leaveClass="animate__zoomOut"
      >
        1-3
      </animate-box>
    </animate-group>
    <animate-group name="group2" class="left">
      <animate-box
        class="animate-box left2"
        enterClass="animate__zoomIn"
        leaveClass="animate__zoomOut"
      >
        2-1
      </animate-box>
      <animate-box
        class="animate-box left2"
        enterClass="animate__zoomIn"
        leaveClass="animate__zoomOut"
      >
        2-2
      </animate-box>
      <animate-box
        class="animate-box left2"
        enterClass="animate__zoomIn"
        leaveClass="animate__zoomOut"
      >
        2-3
      </animate-box>
    </animate-group>

    
    <animate-group name="group1" class="right">
      <animate-box
        class="animate-box left1"
        enterClass="animate__fadeInRight"
        leaveClass="animate__fadeOutRight"
      >
        1-1
      </animate-box>
      <animate-box
        class="animate-box left1"
        enterClass="animate__fadeInRight"
        leaveClass="animate__fadeOutRight"
      >
        1-2
      </animate-box>
      <animate-box
        class="animate-box left1"
        enterClass="animate__fadeInRight"
        leaveClass="animate__fadeOutRight"
      >
        1-3
      </animate-box>
    </animate-group>
    <animate-group name="group2" class="right">
      <animate-box
        class="animate-box left2"
        enterClass="animate__fadeInRight"
        leaveClass="animate__fadeOutRight"
      >
        2-1
      </animate-box>
      <animate-box
        class="animate-box left2"
        enterClass="animate__fadeInRight"
        leaveClass="animate__fadeOutRight"
      >
        2-2
      </animate-box>
      <animate-box
        class="animate-box left2"
        enterClass="animate__fadeInRight"
        leaveClass="animate__fadeOutRight"
      >
        2-3
      </animate-box>
    </animate-group>

    <!-- dialog -->
    <animate-box
      class="zoom-box"
      v-model="windowVisible"
      enterClass="animate__zoomIn"
      leaveClass="animate__zoomOut"
    >
      window
    </animate-box>

    <!-- control -->
    <div class="center">
      <button
        class="button"
        :class="curr == item ? 'currButton' : ''"
        v-for="item in buttonList"
        :key="item"
        @click="tab(item)"
      >
        {{ item }}
      </button>

      <span @click="windowVisible = !windowVisible">toggle window </span>
    </div>

  </div>
</template>

<script>
// import Vue from "vue";

export default {
  data() {
    return {
      curr: 1,
      buttonList: [1, 2],
      windowVisible: false
    };
  },

  methods: {
    tab(v) {
      this.curr = v;
      this.$changeGroup(`group${v}`);
    },
    handleEnterEnd(cname){
      console.log('animateBox进场完成', cname)
    },
    handleGroupEnterEnd(gname){
      console.log('group进场完成', gname)
    }
  },

  created() {
    this.$changeGroup("group1");
  },
};
</script>

<style scoped>

.animate-box {
  width: 300px;
  height: 200px;
  background-color: skyblue;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
.animate-box1 {
  position: absolute;
  top: 20px;
  left: 20px;
}
.animate-box2 {
  position: absolute;
  top: 240px;
  left: 20px;
}
.animate-box3 {
  position: absolute;
  top: 460px;
  left: 20px;
}
.center {
  position: fixed;
  left: 50%;
  bottom: 200px;
  display: flex;
  transform: translateX(-50%);
}
.currButton {
  color: red;
}
.button {
  margin: 10px;
  cursor: pointer;
}
.left {
  width: 400px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}
.left1 {
  background: pink;
}
.left2 {
  background: greenyellow;
}
.right {
  width: 400px;
  position: fixed;
  right: 0;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.zoom-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 300px;
  height: 300px;
  background-color: pink;
}
</style>
