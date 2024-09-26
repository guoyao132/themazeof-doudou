import {reactive, watch} from 'vue'
import initThreeScene from "@/views/InitThreeScene";
const config = reactive({
  containerId: 'three-con',     //three 容器ID
  ambientLightColor: '#505050',  //环境光颜色
  ambientLightIntensity: 1, //环境光强度
  directionalLightColor: '#ffffff', //方向光颜色
  directionalLightIntensity: 2.5, //方向光强度

  isDisabledControls: false, //是否禁用控制器

  groundHeight: -0.4, //地面高度,
  groundColor: '#f88443', //地面颜色
  personColor: '#ff470a',

  addGroundWireframe: false, //是否添加地面网格线
})

// 改变控制器状态
watch(() => config.isDisabledControls, () => {
  initThreeScene.changeDisableControls(config.isDisabledControls);
})
// 改变环境光和方向光的颜色和强度
watch([
  () => config.ambientLightColor,
  () => config.ambientLightIntensity,
], () => {
  initThreeScene.changeAmbientLight(config.ambientLightColor, config.ambientLightIntensity);
})
watch([
  () => config.directionalLightColor,
  () => config.directionalLightIntensity,
], () => {
  initThreeScene.changeDirLight(config.directionalLightColor, config.directionalLightIntensity);
})

export default config;
