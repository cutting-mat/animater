<template>
  <div class="flex-col">
    <div class="flex-1 flex-row">
      <div class="left">
        <animated-group
          class="group flex-col"
          v-model="groupVisible"
          enterClass="animate__fadeInLeft"
          leaveClass="animate__fadeOutLeft"
        >
          <animated class="flex-1 visual-block"> left 1 </animated>
          <animated class="flex-1 visual-block"> left 2 </animated>
          <animated class="flex-1 visual-block"> left 3 </animated>
        </animated-group>
      </div>

      <div class="flex-1 center">
        <el-button @click="groupVisible = !groupVisible"> 进场/退场 </el-button>
        <el-button @click="windowVisible = !windowVisible">
          弹窗打开/关闭
        </el-button>

        <!-- dialog -->
        <animated
          class="zoom-box"
          v-model="windowVisible"
          enterClass="animate__zoomIn"
          leaveClass="animate__zoomOut"
        >
          window
        </animated>
      </div>

      <div class="right">
        <animated-group
          class="group flex-col"
          v-model="groupVisible"
          enterClass="animate__fadeInRight"
          leaveClass="animate__fadeOutRight"
        >
          <animated class="flex-1 visual-block"> right 1 </animated>
          <animated class="flex-1 visual-block"> right 2 </animated>
          <animated class="flex-1 visual-block"> right 3 </animated>
        </animated-group>
      </div>
    </div>
  </div>
</template>

<script>
//import { util } from "@/core";

export default {
  data() {
    return {
      groupVisible: true,
      windowVisible: false,
    };
  },
  methods: {
    callEnter() {
      this.$AnimatedGroup
        .enter("group1")
        .then((res) => {
          console.log("callEnter then:", res);
        })
        .catch((err) => {
          console.warn(err);
        });
    },
  },
  created() {},
};
</script>

<style scoped>
.left,
.right {
  position: relative;
  width: 500px;
  max-width: 40%;
}

.left {
  margin-right: 20px;
}
.right {
  margin-left: 20px;
}

.group {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
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
