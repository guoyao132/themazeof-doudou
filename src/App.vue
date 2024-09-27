<template>
  <div class="con" id="three-con" @click="conClick">
    <div class="con-level" id="levelCon">当前关卡：1</div>
    {{mazeObj?.level}}
  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import MazeOfDouDou from "@/views/main";
import config from "./views/config";

let mazeObj: MazeOfDouDou;
onMounted(() => {
  mazeObj = new MazeOfDouDou();
})
const conClick = () => {
  mazeObj.getCameraMsg();
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
</style>
