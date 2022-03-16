<template>
  <div class="flex-col">
    <div class="flex-1 flex-row">
      <div class="left" v-if="refreshMark">
        <animated-group
          class="group flex-col"
          name="group-1"
          :duration="duration"
          :delay="delay"
          :groupDelay="groupDelay"
        >
          <animated class="flex-1 visual-block"> group-1 1 </animated>
          <animated class="flex-1 visual-block"> group-1 2 </animated>
          <animated class="flex-1 visual-block"> group-1 3 </animated>
        </animated-group>

        <animated-group
          class="group flex-col"
          name="group-2"
          :duration="duration"
          :delay="delay"
          :groupDelay="groupDelay"
        >
          <animated class="flex-1 visual-block"> group-2 1 </animated>
          <animated class="flex-1 visual-block"> group-2 2 </animated>
          <animated class="flex-1 visual-block"> group-2 3 </animated>
        </animated-group>
      </div>

      <div class="flex-1 center">
        <el-form label-width="180px" class="myForm">
          <el-form-item label="动画时长(s)">
            <el-slider
              v-model="duration"
              :step="0.1"
              :min="0.1"
              :max="1"
              @change="applyConfig"
            ></el-slider>
          </el-form-item>
          <el-form-item label="子组件进/出场时间间隔(s)">
            <el-slider
              v-model="delay"
              :step="0.1"
              :min="0.1"
              :max="1"
            ></el-slider>
          </el-form-item>
          <el-form-item label="动画组进/出场时间间隔(s)">
            <el-slider
              v-model="groupDelay"
              :step="0.1"
              :min="0.1"
              :max="1"
            ></el-slider>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="callGroup('group-1')">
              group1 进场
            </el-button>
            <el-button type="primary" @click="callGroup('group-2')">
              group2 进场
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="right" v-if="refreshMark">
        <animated-group
          class="group flex-col"
          name="group-1"
          :duration="duration"
          :delay="delay"
          :groupDelay="groupDelay"
        >
          <animated class="flex-1 visual-block"> group-1 4 </animated>
          <animated class="flex-1 visual-block"> group-1 5 </animated>
          <animated class="flex-1 visual-block"> group-1 6 </animated>
        </animated-group>

        <animated-group
          class="group flex-col"
          name="group-2"
          :duration="duration"
          :delay="delay"
          :groupDelay="groupDelay"
        >
          <animated class="flex-1 visual-block"> group-2 4 </animated>
          <animated class="flex-1 visual-block"> group-2 2 </animated>
          <animated class="flex-1 visual-block"> group-2 6 </animated>
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
      duration: 0.5,
      delay: 0.3,
      groupDelay: 0.8,
      refreshMark: true,
      currentGroupName: null,
    };
  },
  methods: {
    applyConfig() {
      this.refreshMark = false;
      this.$nextTick(() => {
        this.refreshMark = true;
        if (this.currentGroupName) {
          this.callGroup(this.currentGroupName);
        }
      });
    },
    callGroup(groupName) {
      this.currentGroupName = groupName;
      this.$AnimatedGroup
        .enter(groupName)
        .then(() => {
          console.log(groupName, "进场完成");
        })
        .catch((err) => {
          console.warn(err);
        });
    },
  },
  created() {
    this.callGroup("group-1");
  },
};
</script>

<style scoped>
.left,
.right {
  position: relative;
  width: 500px;
  max-width: 30%;
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

.myForm {
  background: rgba(255, 255, 255, 1);
  padding: 20px;
  border-radius: 8px;
}
</style>
