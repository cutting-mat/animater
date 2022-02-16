<template>
  <div class="wrap">
    HomePage

    <div>
      <el-link type="primary" @click="$router.push({name: '演示1'})">演示1</el-link>
      <el-link type="primary" @click="$router.push({name: '演示2'})">演示2</el-link>
      <el-link type="primary" @click="$router.push({name: '演示3'})">演示3</el-link>
      <el-link type="primary" @click="$router.push({name: '演示4'})">演示4</el-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
};
</script>

<style scoped>
</style>
