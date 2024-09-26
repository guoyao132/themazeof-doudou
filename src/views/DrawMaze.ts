import * as THREE from "three";
import initThreeScene from "@/views/InitThreeScene";
import type InitThreeScene from "@/views/InitThreeScene";
import Ground from "@/views/entity/Ground";
import GroundWireframe from "@/views/entity/GroundWireframe";
import Person from "@/views/entity/Person";
import Wall from "@/views/entity/Wall";
import computedMazeArr from "@/views/computedMazeArr";
import Stone from "@/views/entity/Stone";
import config from "@/views/config";
class DrawMaze {
  public level: number;
  private threeObj: typeof InitThreeScene;
  private mazeArr: string[][];
  constructor() {
    this.level = 1;
    this.threeObj = initThreeScene;
    this.mazeArr = [];
  }

  isWall(x:number, y:number){

    let size = computedMazeArr.getSize(this.level);

    let isArea = (x:number, y:number) => {
      return x >= 0 && x < size && y >= 0 && y < size
    }


    let offset:number[][] = [[-1, 0], [0, 1], [1, 0],  [0, -1]]
    let wallPosArr = [];
    for (let i = 0; i < 4; i++) {
      let pos = offset[i];
      let newX = x + pos[0];
      let newY = y + pos[1];
      if(isArea(newX, newY)){
        let type = this.mazeArr[newX][newY];
        if(type === 'wall'){
          wallPosArr.push([newX, newY])
        }
      }
    }
    if (wallPosArr.length !== 2) {
      return false;
    }else{
      let p1 = wallPosArr[0];
      let p2 = wallPosArr[1];
      if (p1[0] === p2[0]) {
        return 'x';
      }else if (p1[1] === p2[1]) {
        return 'y';
      }else{
        return false;
      }
    }
  }

  init(mazeArr: string[][], level: number){
    this.level = level;
    let ground = new Ground(this.level);
    this.threeObj.scene.add(ground.mesh);

    let size = computedMazeArr.getSize(this.level);
    this.mazeArr = mazeArr;
    let len = mazeArr.length;
    for (let i = 0; i < len; i++) {
      let typeArr = mazeArr[i];
      let typeLen = typeArr.length;
      for (let j = 0; j < typeLen; j++) {
        let type = typeArr[j];
        let x = i - Math.floor(size / 2);
        let y = j - Math.floor(size / 2);
        switch (type){
          case 'start':
            let person = new Person();
            person.position.set(x, 0, y);
            this.threeObj.scene.add(person.mesh);
            break
          case 'end':
          case 'road':
            break
          case 'wall':
            let isWall = this.isWall(i, j);
            if(isWall){
              let wall = new Wall();
              wall.mesh.position.set(x,-0.15, y);
              if(isWall === 'x')
                wall.mesh.rotation.y = - Math.PI / 2; // rotates X/Y to X/Z
              this.threeObj.scene.add(wall.mesh);
            }else{
              let stone = new Stone();
              stone.mesh.position.set(x,-0.5, y);
              this.threeObj.scene.add(stone.mesh);
            }
            break
        }
      }
    }

    if(config.addGroundWireframe){
      let groundWireframe = new GroundWireframe(this.level);
      this.threeObj.scene.add(groundWireframe.mesh);
    }
  }
}

export default DrawMaze;
