<template>
  <div>
    <div class="wrap">
      <logo />

      <h1 class="maintitle">Animater</h1>
      <h2 class="subtitle">Vue 动画场景编排组件</h2>

      <a
        href="https://github.com/cutting-mat/animater/blob/main/README_CN.md"
        target="_blank"
        class="myBtn"
      >
        <i class="el-icon-reading"></i>
        文档
      </a>

      <h3 class="channeltitle">示例</h3>
      <ul class="exampleList">
        <li v-for="(item, index) in menu" :key="index">
          <h4>
            {{ (item.meta && item.meta.title) || item.name }}
          </h4>
          <div>
            {{ item.meta && item.meta.description }}
            <el-link type="primary" @click="$router.push(item)">
              [ 查看示例 ]
            </el-link>
          </div>
        </li>
      </ul>
    </div>

    <footer class="foot">
      <p>
        © 2022 - 3022 Author
        <a href="https://refined-x.com/" target="_blank">雅X共赏</a>
        Github
        <a href="https://github.com/cutting-mat/animater" target="_blank"
          >Animater</a
        >
      </p>
    </footer>
  </div>
</template>

<script>
import logo from "./logo";

import routes from "../index";

export default {
  components: {
    logo,
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
  font-size: 2.5em;
}
.subtitle {
  color: rgb(71, 101, 130);
  font-size: 1.6em;
  font-weight: normal;
  margin-bottom: 20px;
}
.channeltitle {
  font-size: 1.5em;
  color: #000;
  margin: 40px 0 20px;
  font-weight: normal;
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

.exampleList li {
  margin-bottom: 20px;
}
.exampleList h4 {
  margin-bottom: 0.5em;
}

.foot {
  /* position: absolute;
    left: 0;
    bottom: 0;
    width: 100%; */
  background: #333;
  padding: 24px;
  overflow: hidden;
  color: #999;
  font-size: 14px;
  text-align: center;
  margin-top: 40px;
}
.foot a {
  color: #fff;
  margin: 0 0.5em;
}
</style>
