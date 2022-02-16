<template>
  <div id="app">
    
    <group1 />
    <group2 />

    <!-- dialog -->
    <animated
      class="zoom-box"
      v-model="windowVisible"
      enterClass="animate__zoomIn"
      leaveClass="animate__zoomOut"
    >
      window
    </animated>

    <!-- control -->
    <div class="center">
      <el-button
        :class="curr == item ? 'currButton' : ''"
        v-for="item in buttonList"
        :key="item"
        @click="tab(item)"
      >
       tab {{ item }}
      </el-button>

      <el-button @click="windowVisible = !windowVisible">toggle window </el-button>

      <el-button @click="$router.push({name: '演示2'})">beforeRouteLeave animate</el-button>
    </div>

  </div>
</template>

<script>
// import Vue from "vue";
import group1 from '../components/group1.vue';
import group2 from '../components/group2.vue';

export default {
  components: {
    group1,
    group2
  },
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
      this.$AnimatedGroup.enter(`group${v}`);
    },
  },
  created() {
    this.$AnimatedGroup.enter("group1");
  },
  beforeRouteLeave (to, from, next) {
    this.$AnimatedGroup.leave().then(() => {
      next()
    })
  }
};
</script>

<style scoped>

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
