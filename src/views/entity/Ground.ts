import * as THREE from "three";
import config from "../config";
import Entity from "./Entity";
import computedMazeArr from "../computedMazeArr";

// 地面
class Ground extends Entity{
  constructor(level:number) {

    const size = computedMazeArr.getSize(level);
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry( size * 10, size * 10, 1, 1 ),
      new THREE.MeshPhongMaterial( {
        color: config.groundColor,
        shininess: 150,
        side: THREE.DoubleSide,
      } )
    )
    mesh.rotation.x = - Math.PI / 2; // rotates X/Y to X/Z
    mesh.name = 'ground'
    mesh.position.y = config.groundHeight;
    // level
    super(mesh);
    mesh.castShadow = false
  }
}
export default Ground;
