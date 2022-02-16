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
.button {
  margin: 10px;
  cursor: pointer;
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
