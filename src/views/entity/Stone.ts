import * as THREE from "three";
import Entity from "./Entity";

// 墙拐歪处
class Stone extends Entity{
  constructor() {
    const verticesOfCube = [
      -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1,
      -1, 1, 1
    ]

    const indicesOfFaces = [
      2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2,
      3, 7, 7, 6, 2, 4, 5, 6, 6, 7, 4
    ]

    const geometry = new THREE.PolyhedronGeometry(
      verticesOfCube,
      indicesOfFaces,
      0.26,
      1
    )

    const material = new THREE.MeshStandardMaterial({
      color: '#d1d8e0',
      flatShading: true
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.scale.set(1.3, 3.5, 1.3, )
    mesh.rotation.z = Math.random() * -0.5

    super(mesh);
    mesh.castShadow = false
  }
}


export default Stone;
