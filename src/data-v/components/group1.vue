<template>
  <div>
    <animated-group
      name="group1"
      class="leftSide group1"
      enterClass="animate__fadeInLeft"
      leaveClass="animate__fadeOutLeft"
    >
      <animated class="animated">
        <span>1-1</span>
      </animated>
      <animated class="animated"> 1-2 </animated>
      <animated class="animated"> 1-3 </animated>
    </animated-group>

    <animated-group
      name="group1"
      class="rightSide group1"
      enterClass="animate__fadeInRight"
      leaveClass="animate__fadeOutRight"
    >
      <animated class="animated"> 1-1 </animated>
      <animated class="animated"> 1-2 </animated>
      <animated class="animated"> 1-3 </animated>
    </animated-group>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.animated {
  width: 300px;
  height: 200px;
  background-color: skyblue;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}

.leftSide {
  width: 400px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}

.rightSide {
  width: 400px;
  position: fixed;
  right: 0;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.group1 .animated {
  background: pink;
}
.group2 .animated {
  background: greenyellow;
}
</style>
