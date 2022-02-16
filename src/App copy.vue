<template>
  <div id="app">
    <animated-group name="group1" class="left" @groupEnterEnd="handleGroupEnterEnd('group1')">
      <animated
        class="animated left1"
        enterClass="animate__zoomIn"
        leaveClass="animate__zoomOut"
        @enterEnd="handleEnterEnd('animated left1')"
      >
        <span>1-1</span>
      </animated>
      <animated
        class="animated left1"
        enterClass="animate__zoomIn"
        leaveClass="animate__zoomOut"
      >
        1-2
      </animated>
      <animated
        class="animated left1"
        enterClass="animate__zoomIn"
        leaveClass="animate__zoomOut"
      >
        1-3
      </animated>
    </animated-group>
    <animated-group name="group2" class="left">
      <animated
        class="animated left2"
        enterClass="animate__zoomIn"
        leaveClass="animate__zoomOut"
      >
        2-1
      </animated>
      <animated
        class="animated left2"
        enterClass="animate__zoomIn"
        leaveClass="animate__zoomOut"
      >
        2-2
      </animated>
      <animated
        class="animated left2"
        enterClass="animate__zoomIn"
        leaveClass="animate__zoomOut"
      >
        2-3
      </animated>
    </animated-group>

    
    <animated-group name="group1" class="right">
      <animated
        class="animated left1"
        enterClass="animate__fadeInRight"
        leaveClass="animate__fadeOutRight"
      >
        1-1
      </animated>
      <animated
        class="animated left1"
        enterClass="animate__fadeInRight"
        leaveClass="animate__fadeOutRight"
      >
        1-2
      </animated>
      <animated
        class="animated left1"
        enterClass="animate__fadeInRight"
        leaveClass="animate__fadeOutRight"
      >
        1-3
      </animated>
    </animated-group>
    <animated-group name="group2" class="right">
      <animated
        class="animated left2"
        enterClass="animate__fadeInRight"
        leaveClass="animate__fadeOutRight"
      >
        2-1
      </animated>
      <animated
        class="animated left2"
        enterClass="animate__fadeInRight"
        leaveClass="animate__fadeOutRight"
      >
        2-2
      </animated>
      <animated
        class="animated left2"
        enterClass="animate__fadeInRight"
        leaveClass="animate__fadeOutRight"
      >
        2-3
      </animated>
    </animated-group>

    <!-- dialog -->
    <animated
      class="zoom-box"
      ref="zoom"
      enterClass="animate__zoomIn"
      leaveClass="animate__zoomOut"
    >
      window
    </animated>

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

      <span @click="$refs.zoom && $refs.zoom.enter()">open </span>
      <span @click="$refs.zoom && $refs.zoom.leave()">close </span>
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
    };
  },

  methods: {
    tab(v) {
      this.curr = v;
      this.$AnimatedGroup.enter(`group${v}`);
    },
    handleEnterEnd(cname){
      console.log('Animated进场完成', cname)
    },
    handleGroupEnterEnd(gname){
      console.log('group进场完成', gname)
    }
  },

  created() {
    this.$AnimatedGroup.enter("group1");
  },
};
</script>

<style>
.animated {
  width: 300px;
  height: 200px;
  background-color: skyblue;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
.animated1 {
  position: absolute;
  top: 20px;
  left: 20px;
}
.animated2 {
  position: absolute;
  top: 240px;
  left: 20px;
}
.animated3 {
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
