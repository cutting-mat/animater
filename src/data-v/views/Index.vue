<template>
  <div
    class="flex-col"
    v-if="screen.width"
    :style="{ width: screen.width + 'px', height: screen.height + 'px' }"
  >
    <myHeader />

    <HomePage class="flex-1 scrollbar" v-if="$route.path == '/'" />
    <router-view v-else class="flex-1 visual" />
  </div>
</template>

<script>
//import { util } from "@/core";
import myHeader from "../components/header";

export default {
  components: {
    myHeader,
    HomePage: () => import("../components/HomePage"),
  },
  data() {
    return {
      screen: {},
    };
  },
  methods: {},
  created() {
    // const { width, height } = window.screen;
    const {innerWidth, innerHeight} = window;
    this.screen = {
      width: innerWidth,
      height: innerHeight,
    };
  },
};
</script>

<style scoped>
@import url(../assets/style.css);

.visual {
  background: rgb(21, 21, 21);
  color: #fff;
  padding-top: 20px;
}
.visual >>> .visual-block {
  background: #333;
  margin-bottom: 20px;
  text-align: center;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
}
</style>
