import * as THREE from "three";
import Entity from "./Entity";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import FONT from "three/examples/fonts/gentilis_bold.typeface.json";

const loader = new FontLoader();
const FontObj = loader.parse(FONT);
// 墙拐歪处
class LevelText extends Entity{
  constructor(text: string) {
    let geometry = new TextGeometry(text, {
      size: 1, //字号大小，一般为大写字母的高度
      height: 0.1, //文字的厚度
      curveSegments: 12,//弧线分段数，使得文字的曲线更加光滑
      font: FontObj, //字体，默认是'helvetiker'，需对应引用的字体文件
      bevelSize: 0.01, //倒角宽度
      bevelThickness: 0.01, //倒角厚度
      bevelEnabled: true, //布尔值，是否使用倒角，意为在边缘处斜切
    });
    const textMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color(0x686de0),
      flatShading: true,
      side: 0
    });
    let mesh = new THREE.Mesh(geometry, textMaterial);
    mesh.name = 'text';
    mesh.rotation.x = - Math.PI / 4;
    super(mesh)
    mesh.castShadow = false

  }
}


export default LevelText;
