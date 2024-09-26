import Entity from "./Entity";
import * as THREE from "three";
import {RoundedBoxGeometry} from "three/examples/jsm/geometries/RoundedBoxGeometry";
import config from "@/views/config";

class Wall extends Entity {
  constructor() {

    const mesh  = new THREE.Mesh(
      new RoundedBoxGeometry(0.8, 0.6, 0.3, 5, 0.1),
      new THREE.MeshStandardMaterial({
        color: '#d1d8e0'
      })
    )
    mesh.name = 'wall';

    super(mesh);
    mesh.castShadow = false
  }
}

export default Wall;
