<template>
  <div class="logo" v-if="refreshMark">
    <animated-group
      v-for="(groupitem, groupindex) in list"
      :key="groupindex"
      v-model="groupVisible"
      class="side flex-col"
      :class="[`side_${groupindex}`]"
      :enterClass="`${enterClass} ${enterClass}${groupindex ? 'Right' : 'Left'}`"
      :leaveClass="`${leaveClass} ${leaveClass}${groupindex ? 'Right' : 'Left'}`"
      :duration="duration"
      :delay="delay"
      :groupDelay="groupDelay"
    >
      <animated
        v-for="(item, index) in groupitem"
        :key="index"
        class="flex-1 block"
        :class="item.animateClass"
      ></animated>
    </animated-group>
  </div>
</template>

<script>
import "animate.css";
/**
 * enterClass: 'animate__fadeInLeft',
      leaveClass: 'animate__fadeOutLeft',
 * */
export default {
  data() {
    return {
      groupVisible: false,
      enterClass: "animate__zoomIn",
      leaveClass: "animate__zoomOut",
      duration: 0.5,
      delay: 0.3,
      groupDelay: 0.8,
      refreshMark: true,
      list: [
        [
          {
            sideClass: "left",
            animateClass: [],
          },
          {
            sideClass: "left",
            animateClass: [],
          },
          {
            sideClass: "left",
            animateClass: [],
          },
        ],
        [
          {
            sideClass: "right",
            animateClass: [],
          },
          {
            sideClass: "right",
            animateClass: [],
          },
          {
            sideClass: "right",
            animateClass: [],
          },
        ],
      ],
    };
  },
  computed: {
    totalTime() {
      return parseInt(
        this.list[0].length * (this.duration + this.delay) * 1000
      );
    },
  },
  methods: {
    start() {
      this.groupVisible = !this.groupVisible;

      setTimeout(() => {
        if (this.groupVisible === false) {
          if (this.enterClass === "animate__zoomIn") {
            this.enterClass = "animate__fadeIn";
            this.leaveClass = "animate__fadeOut";
          } else {
            this.enterClass = "animate__zoomIn";
            this.leaveClass = "animate__zoomOut";
          }
          this.refreshMark = false;
          this.$nextTick(() => {
            this.refreshMark = true;
            this.$nextTick(() => {
              this.start();
            });
          });
        } else {
          this.$nextTick(() => {
            this.start();
          });
        }
      }, this.totalTime);
    },
  },
  created() {
    this.start();
  },
};
</script>

<style scoped>
/* TODO 背景色和色块颜色渐变动画 */
.logo {
  position: relative;
  width: 300px;
  height: 200px;
  margin: 40px auto;
  background: rgba(9, 113, 241, .3);
  border-radius: 4px;
}
.side {
  position: absolute;
  top: 0;
  width: 35%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 8px;
}
.side_0 {
  left: 8px;
}
.side_1 {
  right: 8px;
}

.block {
  background: #4abf8a;
  margin-bottom: 8px;
  border-radius: 4px;
}
</style>
