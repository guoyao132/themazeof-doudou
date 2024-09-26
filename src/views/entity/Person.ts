import Entity from "./Entity";
import * as THREE from "three";
import {RoundedBoxGeometry} from "three/examples/jsm/geometries/RoundedBoxGeometry";
import config from "@/views/config";

class Person extends Entity{
  constructor() {
    const mesh  = new THREE.Mesh(
      new RoundedBoxGeometry(0.8, 0.8, 0.8, 5, 0.1),
      new THREE.MeshStandardMaterial({
        color: config.personColor
      })
    )
    mesh.name = 'personHeader';

    const leftEye = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0xffffff
      })
    )
    leftEye.scale.z = 0.1
    leftEye.position.x = 0.2
    leftEye.position.y = 0.16
    leftEye.position.z = 0.4

    const leftEyeHole = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 100, 100),
      new THREE.MeshStandardMaterial({ color: 0x333333 })
    )

    leftEyeHole.position.z += 0.08
    leftEye.add(leftEyeHole)

    const rightEye = leftEye.clone()
    rightEye.position.x = -0.2

    const smileShape = new THREE.Shape();
    smileShape.moveTo(-0.15, 0.15); // 开始点
    smileShape.quadraticCurveTo(
      0, -0.1,
      0.15, 0.15
    ); // 控制点，结束点
    const geometry = new THREE.ExtrudeGeometry(smileShape, {
      steps: 1,
      depth: 0.02,
      bevelEnabled: false
    });
    const material = new THREE.MeshBasicMaterial({ color: 0x5f27cd });
    const smileMesh = new THREE.Mesh(geometry, material);
    smileMesh.position.set(0, -0.2, 0.4)

    mesh.add(leftEye, rightEye, smileMesh)
    super(mesh);
  }
}

export default Person;
