import * as THREE from "three";
import config from "../config";

import Entity from "./Entity";

// 地面
class Ground extends Entity{
  constructor(level:number) {
    const geometry = new THREE.PlaneGeometry( 9, 9, 9,9 )
    const wireframe = new THREE.WireframeGeometry( geometry );

    const mesh = new THREE.LineSegments( wireframe );
    mesh.rotation.x = - Math.PI / 2; // rotates X/Y to X/Z
    mesh.position.y = config.groundHeight;
    super(mesh);
  }
}
export default Ground;
