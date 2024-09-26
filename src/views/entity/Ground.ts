import * as THREE from "three";
import config from "../config";

import Entity from "./Entity";

// 地面
class Ground extends Entity{
  constructor(level:number) {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry( 9, 9, 1, 1 ),
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
