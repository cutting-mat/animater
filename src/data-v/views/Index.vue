<template>
<div>
  <HomePage v-if="$route.path == '/data-v/'" />
  <router-view v-else />
</div>
  
</template>

<script>
//import { util } from "@/core";

export default {
  components: {
    HomePage: () => import('../components/HomePage')
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>

<style scoped>
@import url(../assets/style.css);
</style>
