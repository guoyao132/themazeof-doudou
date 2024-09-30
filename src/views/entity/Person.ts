import Entity from "./Entity";
import * as THREE from "three";
import type {Vector3} from 'three'
import {RoundedBoxGeometry} from "three/examples/jsm/geometries/RoundedBoxGeometry";
import config from "../config";
import {gsap} from 'gsap';

class Person extends Entity{
  public isMove:boolean;
  public target: Vector3;
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
    let target = new THREE.Vector3(1, 0, 0);
    mesh.lookAt(mesh.position.clone().add(target))
    super(mesh);
    this.isMove = false;
    this.target = target;
  }

  setMeshPosition(position: number[]) {
    this.mesh.position.set(position[0], 0, position[1]);
  }

  setTarget(position: number[]){
    if(this.isMove){
      return
    }
    this.isMove = true;
    let mesh = this.mesh;
    let lookPos = mesh.position.clone().add(new THREE.Vector3(position[0], 0, position[1]));
    this.target = new THREE.Vector3(position[0],0, position[1]);
    this.isMove = false;
    mesh.lookAt(lookPos);
  }

  addMoveEvent(position: number[], y = 0.3){
    if(this.isMove){
      return
    }
    this.isMove = true;
    let mesh = this.mesh;
    let startPosition = mesh.position.clone();
    //获取中间位置
    let midPositionX = (startPosition.x + position[0]) / 2;
    let midPositionZ = (startPosition.z + position[1]) / 2;
    let duration = 0.1;
    let lookPos = mesh.position.clone().add(new THREE.Vector3(position[0] - startPosition.x,  0, position[1] - startPosition.z));
    mesh.lookAt(lookPos);
    gsap.to(mesh.position, {
      x: midPositionX,
      y: startPosition.y + y,
      z: midPositionZ,
      duration: duration,
      ease: 'power2.in',
      onComplete: () => {
        // mesh.lookAt(position)
        gsap.to(mesh.position, {
          x: position[0],
          y: startPosition.y,
          z: position[1],
          duration: duration,
          ease: 'power2.out',
          onComplete: () => {
            this.isMove = false;
          }
        })
      }
    })

  }
}

export default Person;
