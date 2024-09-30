<template>
  <div class="con" id="three-con" @dblclick.stop.prevent="changeControl">
    <div class="con-btn-list">
      <div class="con-btn-list-item">
        <div class="btn" id="btnW" @click="personMoveFun('w')">W</div>
      </div>
      <div class="con-btn-list-item">
        <div class="btn" id="btnA" @click="personMoveFun('a')">A</div>
        <div class="btn" v-show="showBtnS" id="btnS" @click="personMoveFun('s')">S</div>
        <div class="btn" id="btnD" @click="personMoveFun('d')">D</div>
      </div>
    </div>
    <canvas id="threeCanvas" ref="threeCanvas" class="con-three"></canvas>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import type {Ref} from 'vue'
import MazeOfDouDou from "@/views/main";
import {getStorage} from '@/views/mazeUnit'
import config from "@/views/config";

let mazeObj: MazeOfDouDou;
let threeCanvas:Ref<HTMLCanvasElement | null> = ref(null);
const showBtnS = ref<boolean>(true);
onMounted(() => {
  mazeObj = new MazeOfDouDou({
    canvas: threeCanvas.value!,
    onLevelUpgrade() {
      if(this.level >= 10){
        showBtnS.value = false;
      }
    },
  });
})
let levelStorage = +(getStorage('mazeLevel') || '1');
if(levelStorage >= 10){
  showBtnS.value = false;
}
const personMoveFun = (key: string) => {
  if(mazeObj && mazeObj.drawMaze){
    mazeObj.drawMaze.addPersonMoveFun(key);
  }
}
const changeControl = (e: MouseEvent) => {
  (e.ctrlKey && e.shiftKey) && (config.isDisabledControls = !config.isDisabledControls)
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
  user-select: none;
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
  width: 100% !important;
  height: 100% !important;
  outline: none;
}
</style>
