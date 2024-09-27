import * as THREE from "three";
import Entity from "./Entity";
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'

// 墙拐歪处
class Tree extends Entity{
  constructor() {
    const mesh = new THREE.Mesh()
    let treeMesh;
    if(Math.random() > 0.5){
      const treeGeometry = new THREE.CylinderGeometry(0.3, 0.2, 0.8, 4)
      const treeMaterial = new THREE.MeshStandardMaterial({
        flatShading: true,
        color: 0xA3CB38
      })
      treeMesh = new THREE.Mesh(treeGeometry, treeMaterial)
      treeMesh.position.y = 0.2
      treeMesh.rotation.y = Math.PI / 4
      treeMesh.castShadow = true
      treeMesh.receiveShadow = true
    }else{
      const treeGeometry1 = new THREE.ConeGeometry( 0.3, 1, 8 );
      const treeMaterial1 = new THREE.MeshBasicMaterial( {color: 0xA3CB38} );
      treeMesh = new THREE.Mesh( treeGeometry1, treeMaterial1 );
      treeMesh.position.y = 0.8
      treeMesh.castShadow = true
      treeMesh.receiveShadow = true
    }

    const trunkGeometry = new RoundedBoxGeometry(0.1, 1.35, 0.1, 5, 0.02)
    const trunkMaterial = new THREE.MeshStandardMaterial({
      flatShading: true,
      color: 0x795548
    })
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
    trunk.position.y = -0.35
    trunk.castShadow = true
    trunk.receiveShadow = true


    mesh.add(trunk, treeMesh)
    mesh.scale.setScalar(0.6 + Math.random() * 0.6)
    mesh.rotation.y = Math.random() * Math.PI * 2

    mesh.castShadow = false
    super(mesh)
  }
}


export default Tree;
