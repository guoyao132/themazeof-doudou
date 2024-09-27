import * as THREE from "three";
import config from "../config";
import Entity from "./Entity";
import computedMazeArr from "@/views/computedMazeArr";

// 地面网格
class Ground extends Entity{
  constructor(level:number) {
    const size = computedMazeArr.getSize(level);
    // const geometry = new THREE.PlaneGeometry( size, size, size,size )
    // const wireframe = new THREE.WireframeGeometry( geometry );
    //
    // const mesh = new THREE.LineSegments( wireframe );
    // mesh.rotation.x = - Math.PI / 2; // rotates X/Y to X/Z
    // mesh.position.y = config.groundHeight;

    const mesh = new THREE.GridHelper(
      size,
      size,
      0xffffff,
      0xffffff
    )
    mesh.position.y = config.groundHeight;
    // mesh.rotation.x = - Math.PI / 2; // rotates X/Y to X/Z
    super(mesh);
  }
}
export default Ground;
