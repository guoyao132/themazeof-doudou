<template>
  <div class="con" id="three-con" @click="conClick">
  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import MazeOfDouDou from "@/views/main";
import config from "./views/config";

onMounted(() => {
  new MazeOfDouDou();
})
const conClick = () => {
}


let row = 11;
let col = 11;
let arr = [];
let visited = [];
let start = [1,0]
let end = [row - 2, col - 1];
for (let i = 0; i < row; i++) {
  arr.push(new Array(col).fill('wall'));
  visited.push(new Array(col).fill(false))
  for (let j = 0; j < col; j++) {
    if(i % 2 === 1 && j % 2 === 1) {
      arr[i][j] = 'road'
    }
  }
}
arr[start[0]][start[1]] ='start'
arr[end[0]][end[1]] ='end'
console.log(arr);
function isArea(x:number, y:number){
  return x >= 0 && x < row && y >= 0 && y < col
}

const drawRoad = (x, y) => {
  if(!isArea(x, y)) return

  let dirs = [[0,1], [0,-1], [1,0], [-1,0]];

}
</script>
<style scoped>
.con {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
}
</style>
