<template>
  <div class="con" id="three-con">
    123
  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import MazeOfDouDou from "@/views/main";

onMounted(() => {
  const mazeOfDouDou = new MazeOfDouDou();
})
</script>
<style scoped>
.con {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  background: rgb(250, 250, 250);
  border-left: 1px solid rgb(225, 225, 225);
  border-right: 1px solid rgb(225, 225, 225);
}
</style>
