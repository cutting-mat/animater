<template>
  <div class="wrap">
    <logo />

    <h1 class="maintitle">Animater</h1>
    <h2 class="subtitle">Vue 动画场景编排组件</h2>

    <a
      href="https://github.com/cutting-mat/animater/blob/main/README.md"
      target="_blank"
      class="myBtn"
    >
      <i class="el-icon-reading"></i>
      文档
      
    </a>
    <h3 class="channeltitle">示例</h3>
    <div class="links">
      <el-link
        v-for="(item, index) in menu"
        :key="index"
        type="primary"
        icon="el-icon-magic-stick"
        @click="$router.push(item)"
      >
        {{ (item.meta && item.meta.title) || item.name }}
      </el-link>
    </div>
  </div>
</template>

<script>
import logo from "./logo";

import routes from "../index";

export default {
  components: {
    logo
  },
  data() {
    return {
      menu: routes[0].children,
    };
  },
};
</script>

<style scoped>
.wrap {
  width: 1200px;
  text-align: center;
}
.maintitle {
  color: #000;
  font-size: 2em;
}
.subtitle {
  color: rgb(71, 101, 130);
  font-size: 1.6em;
  font-weight: normal;
  margin-bottom: 20px;
}
.channeltitle {
  font-size: 1.35em;
  color: #000;
  margin: 20px 0;
}

.links .el-link {
  margin: 0 10px;
}

.myBtn {
  display: inline-block;
  border-radius: 6px;
  padding: 0 24px;
  line-height: 52px;
  font-size: 1.2rem;
  font-weight: 500;
  color: #f8f8f8;
  background-color: #4abf8a;
  border: 2px solid #3eaf7c;
  transition: background-color 0.1s ease;
}
</style>
