<template>
  <div class="con" id="three-con">
    <div class="con-level" id="levelCon">当前关卡：1</div>
    <div class="con-btn-list">
      <div class="con-btn-list-item">
        <div class="btn" id="btnW" @click="personMoveFun('w')">W</div>
      </div>
      <div class="con-btn-list-item">
        <div class="btn" id="btnA" @click="personMoveFun('a')">A</div>
        <div class="btn" id="btnS" @click="personMoveFun('s')">S</div>
        <div class="btn" id="btnD" @click="personMoveFun('d')">D</div>
      </div>
    </div>
    <canvas id="threeCanvas" ref="threeCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import type {Ref} from 'vue'
import MazeOfDouDou from "@/views/main";

let mazeObj: MazeOfDouDou;
let threeCanvas:Ref<HTMLCanvasElement | null> = ref(null);
onMounted(() => {
  mazeObj = new MazeOfDouDou({
    canvas: threeCanvas.value!,
  });
})

const personMoveFun = (key: string) => {
  if(mazeObj && mazeObj.drawMaze){
    mazeObj.drawMaze.addPersonMoveFun(key);
  }
}
</script>
<style scoped>
.con {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
  position: relative;
}
.con-level{
  position: absolute;
  width: max-content;
  padding: 10px;
  height: 30px;
  color: #fff;
  top: 0;
  left: 0;
}
.con-btn-list{
  position: absolute;
  padding: 10px;
  color: #fff;
  bottom: 40px;
  right: 40px;
  transform: rotate3d(1, 0, 6, -9deg);
}

.con-btn-list-item{
  display: flex;
  width: 210px;
  justify-content: center;
}

.btn{
  width: 50px;
  height: 50px;
  border: 1px solid #fff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  cursor: pointer;
}
canvas{
  width: 100%;
  height: 100%;
  outline: none;
}
</style>
