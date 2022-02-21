<template>
  <div class="logo" :class="logoClass">
    <div class="c" v-if="refreshMark">
      <animated-group
        v-for="(groupitem, groupindex) in list"
        :key="groupindex"
        v-model="groupVisible"
        class="side flex-col"
        :class="[`side_${groupindex}`]"
        :enterClass="`${enterClass} ${enterClass}${
          groupindex ? 'Right' : 'Left'
        }`"
        :leaveClass="`${leaveClass} ${leaveClass}${
          groupindex ? 'Right' : 'Left'
        }`"
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
      logoClass: "",
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
            this.logoClass = "logo2";
          } else {
            this.enterClass = "animate__zoomIn";
            this.leaveClass = "animate__zoomOut";
            this.logoClass = "";
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
  width: 200px;
  height: 200px;
  margin: 40px auto;
  background: rgba(9, 113, 241, 0.3);
  border-radius: 8px;
  transition: background-color ease 0.3s;
}
.c {
  position: relative;
  width: 100%;
  height: 100%;
}
.side {
  position: absolute;
  top: 0;
  width: 40%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 7%;
}
.side_0 {
  left: 7%;
}
.side_1 {
  right: 7%;
}

.block {
  background: rgba(9, 113, 241, 0.6);
  margin-bottom: 14%;
  border-radius: 4px;
}

.logo2 {
  background: #dedede;
}
.logo2 .block {
  background: #fff;
}
</style>
