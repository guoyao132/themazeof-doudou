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
</script>
<style scoped>
.con {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
}
</style>
