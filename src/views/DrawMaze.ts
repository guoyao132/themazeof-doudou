import initThreeScene from "./InitThreeScene";
import type InitThreeScene from "./InitThreeScene";
import Ground from "./entity/Ground";
import GroundWireframe from "./entity/GroundWireframe";
import Person from "./entity/Person";
import Wall from "./entity/Wall";
import computedMazeArr from "./computedMazeArr";
import Stone from "./entity/Stone";
import Tree from "./entity/Tree";
import LevelText from "./entity/LevelText";
import config from "./config";
import {floatSub, floatAdd, getWindowObject} from "./mazeUnit";
import * as THREE from "three";
import type {Vector3} from "three";
import {gsap} from "gsap";
import type {MYMESH} from "./entity/Entity";

type DrawMazeOptions = {
  upgradeLevel: () => void
}

class DrawMaze {
  public level: number = 1;
  private threeObj: typeof InitThreeScene;
  private mazeArr: string[][] = [];
  private personObj: Person | null = null;
  private removeObjArr: Array<Wall | Stone | Tree | Ground | LevelText> = [];
  private options: DrawMazeOptions;
  private isInit: boolean = false;
  private isUpLevel: boolean = false;
  private treePosArr: string[] = [];
  private size: number = 0;
  constructor(options: DrawMazeOptions) {
    this.threeObj = initThreeScene;
    this.options = options;
    this.addPersonMoveEvent();
  }

  isArea(x:number, y:number):boolean{
    return x >= 0 && x < this.size && y >= 0 && y < this.size
  }

  isWall(x:number, y:number):boolean|string{
    let offset:number[][] = [[-1, 0], [0, 1], [1, 0],  [0, -1]]
    let wallPosArr = [];
    for (let i = 0; i < 4; i++) {
      let pos = offset[i];
      let newX = x + pos[0];
      let newY = y + pos[1];
      if(this.isArea(newX, newY)){
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

  getTreePos():number[]{
    let maxNum = Math.floor(this.size / 2) + 1;
    let x = Math.floor(Math.random()  * maxNum + maxNum);
    if (Math.random() > 0.5) {
      x *= -1;
    }

    let y = Math.floor(Math.random() * maxNum);
    if (Math.random() > 0.5) {
      y *= -1;
    }

    if (Math.random() > 0.5) {
      [x, y] = [y, x];
    }
    let key = x + '_' + y;
    if(this.treePosArr.includes(key)){
      return this.getTreePos();
    }
    this.treePosArr.push(key);
    return [x, y];

  }

  drawTree(){
    let center = Math.floor(this.size / 2);
    const treeNum = Math.floor(center * center * 2);
    for (let i = 0; i < treeNum; i++) {
      let tree = new Tree();
      let [x, y] = this.getTreePos();
      tree.mesh.position.set(x,0, y);
      this.removeObjArr.push(tree)
      this.threeObj.scene.add(tree.mesh);
    }
  }

  initOne(mazeArr: string[][], level: number){
    this.mazeArr = mazeArr;
    this.level = level;
    let size = computedMazeArr.getSize(this.level);
    this.size = size;
    let ground = new Ground(this.level);
    this.threeObj.scene.add(ground.mesh);
    let person = new Person();
    this.personObj = person;
    this.threeObj.scene.add(person.mesh);

  }

  setLevelText(text:string){
    let levelText = new LevelText(text);
    levelText.mesh.position.set(-text.length / 3, 1, -this.size / 2);
    this.threeObj.scene.add(levelText.mesh);
    this.removeObjArr.push(levelText);
  }

  init(mazeArr: string[][], level: number){
    if(this.isInit){
      return
    }
    this.isUpLevel = false;
    this.isInit = true;
    this.level = level;

    let ground = new Ground(this.level);
    this.threeObj.scene.add(ground.mesh);
    this.removeObjArr.push(ground);
    let size = computedMazeArr.getSize(this.level);
    this.size = size;
    this.setLevelText(`LEVEL ${this.level}`)
    this.mazeArr = mazeArr;
    let len = mazeArr.length;
    for (let i = 0; i < len; i++) {
      let typeArr = mazeArr[i];
      let typeLen = typeArr.length;
      for (let j = 0; j < typeLen; j++) {
        let type = typeArr[j];
        let x = floatSub(i, Math.floor(this.size / 2));
        let y = floatSub(j, Math.floor(this.size / 2));
        switch (type){
          case 'start':
            if(!this.personObj){
              let person = new Person();
              person.setMeshPosition([x, y]);
              this.threeObj.scene.add(person.mesh);
              this.personObj = person;
            }else{
              this.personObj.setMeshPosition([x, y]);
            }
            if(this.level >= config.firstControlLevel){
              this.personObj.mesh.scale.set(0.25,0.25,0.25)
              this.personObj.mesh.position.y = -0.31;
              this.moveCameraPosition([x, y]);
            }
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
              this.removeObjArr.push(wall)
            }else{
              let stone = new Stone();
              stone.mesh.position.set(x,-0.5, y);
              this.threeObj.scene.add(stone.mesh);
              this.removeObjArr.push(stone)
            }
            break
        }
      }
    }
    this.drawTree()
    this.entityShow(this.removeObjArr.map(item => item.mesh)).then(() => {})

    if(config.addGroundWireframe){
      let groundWireframe = new GroundWireframe(this.level);
      this.threeObj.scene.add(groundWireframe.mesh);
    }
    this.isInit = false;
  }

  entityShow(mesh: MYMESH | Array<MYMESH>){
    if(!Array.isArray(mesh)){
      mesh = [mesh]
    }
    const meshArr = mesh;
    return new Promise(resolve => {
      gsap.from(
        meshArr.map((item:MYMESH) => item.scale),
        {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.3,
          ease: 'elastic.out(1.1, 0.8)',
          stagger: {
            grid: [10, 10],
            amount: 1.2
          },
          onComplete: () => {
            resolve(mesh);
          }
        }
      )
    });
  }

  entityHide(mesh: MYMESH | Array<MYMESH>){
    if(!Array.isArray(mesh)){
      mesh = [mesh]
    }
    const meshArr = mesh;
    return new Promise(resolve => {
      gsap.to(
        meshArr.map((item:MYMESH) => item.scale),
        {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.3,
          ease: 'elastic.out(0.8, 1.1)',
          stagger: {
            grid: [10, 10],
            amount: 1.2
          },
          onComplete: () => {
            resolve(mesh);
          }
        }
      )
    });
  }

  addPersonMoveFun(key:string){
    let offset:number[][] = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    let offsetIndex = -1;
    switch (key){
      case 'ArrowUp':
      case 'w':
        offsetIndex = 0;
        break;
      case 'ArrowDown':
      case 's':
        offsetIndex = 2;
        break;
      case 'ArrowLeft':
      case 'a':
        offsetIndex = 3;
        break;
      case 'ArrowRight':
      case 'd':
        offsetIndex = 1;
        break
    }

    if(offsetIndex !== -1){
      if(this.level >= config.firstControlLevel){
        if(this.personObj){
          let target = [this.personObj.target.x,this.personObj.target.z];
          if(offsetIndex === 0){
            this.movePerson(target);
          }else{
            let index = offset.map(v => v.join(',')).indexOf(target.join(','));
            if(offsetIndex === 3){
              index--;
            }else if(offsetIndex === 1){
              index++;
            }
            (index === -1) && (index = 3);
            (index === 4) && (index = 0);
            this.personObj.setTarget(offset[index]);
            this.moveCameraTarget(offset[index]);
          }
        }
      }else{
        this.movePerson(offset[offsetIndex])
      }
    }
  }
  addPersonMoveEvent(){
    getWindowObject()?.addEventListener('keydown', (e: KeyboardEvent) => {
      if(this.personObj){
        this.addPersonMoveFun(e.key);
      }
    })
  }

  moveCameraTarget(offset: number[]){
    if(this.personObj){
      let position = this.personObj.mesh.position.clone();
      let pos1 = position.clone().sub(new THREE.Vector3(offset[0], 0, offset[1]));
      this.moveCameraPosition([position.x, position.z]);
    }
  }

  moveCameraPosition(position:number[]){
    if(this.personObj){
      let personTarget = this.personObj.target;
      let personY = this.personObj.mesh.position.y;
      let pos = new THREE.Vector3(position[0], personY, position[1]);
      let pos1 = pos.clone().sub(personTarget);
      this.threeObj.changeCamera([
        pos1.x,
        pos1.y + 0.6,
        pos1.z,
      ], [
        pos.x,
        pos.y + 0.4,
        pos.z,
      ]).then(() => {})
    }
  }

  movePerson(offset:number[]){
    if(this.personObj && !this.personObj.isMove && !this.isInit && !this.isUpLevel){
      let position = this.personObj.mesh.position.clone();
      let newX = Math.floor(position.x + offset[0]);
      let newY = Math.floor(position.z + offset[1]);
      let size = this.size;
      let x = floatAdd(newX, Math.floor(size / 2));
      let y = floatAdd(newY, Math.floor(size / 2));
      if(this.isArea(x, y)){
        if(this.mazeArr[x][y] === 'road' || this.mazeArr[x][y] === 'start'){
          let moveY = 0.3;
          this.personObj.addMoveEvent([newX, newY], moveY);
          if(this.level >= config.firstControlLevel){
            // moveY = 0;
            this.moveCameraPosition([newX, newY])
          }
        } else if(this.mazeArr[x][y] === 'end'){
          this.isUpLevel = true;
          this.personObj.addMoveEvent([newX, newY])
          this.entityHide(this.removeObjArr.map(item => item.mesh)).then(() => {
            this.level++;
            this.removeObjArr.forEach(item => {
              item.dispose();
              this.threeObj.scene.remove(item.mesh);
            })
            this.removeObjArr = [];
            this.treePosArr = [];
            if (this.options.upgradeLevel) {
              this.options.upgradeLevel()
            }
          })
        }
      }
    }
  }
}

export default DrawMaze;
