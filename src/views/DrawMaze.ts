import * as THREE from "three";
import initThreeScene from "@/views/InitThreeScene";

import type InitThreeScene from "@/views/InitThreeScene";
import Ground from "@/views/entity/Ground";
import GroundWireframe from "@/views/entity/GroundWireframe";
import Person from "@/views/entity/Person";
import Wall from "@/views/entity/Wall";
import Stone from "@/views/entity/Stone";
import config from "@/views/config";
class DrawMaze {
  level: number;
  private threeObj: typeof InitThreeScene;
  constructor() {
    this.level = 1;
    this.threeObj = initThreeScene;
  }
  init(){
    let ground = new Ground(this.level);
    this.threeObj.scene.add(ground.mesh);

    let person = new Person();
    this.threeObj.scene.add(person.mesh);

    let stone = new Wall();
    stone.mesh.position.set(1,-0.15,0);
    stone.mesh.rotation.y = - Math.PI / 2; // rotates X/Y to X/Z
    this.threeObj.scene.add(stone.mesh);

    let stone1 = new Wall();
    stone1.mesh.position.set(0,-0.15,1);
    this.threeObj.scene.add(stone1.mesh);
    let stone2 = new Stone();
    stone2.mesh.position.set(1,-0.5,1);
    this.threeObj.scene.add(stone2.mesh);


    if(config.addGroundWireframe){
      let groundWireframe = new GroundWireframe(this.level);
      this.threeObj.scene.add(groundWireframe.mesh);
    }
  }
}

export default DrawMaze;
