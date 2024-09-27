import type {Mesh} from "three";
import initThreeScene from "@/views/InitThreeScene";
import type InitThreeScene from "@/views/InitThreeScene";
import Ground from "@/views/entity/Ground";
import GroundWireframe from "@/views/entity/GroundWireframe";
import Person from "@/views/entity/Person";
import Wall from "@/views/entity/Wall";
import computedMazeArr from "@/views/computedMazeArr";
import Stone from "@/views/entity/Stone";
import Tree from "@/views/entity/Tree";
import config from "@/views/config";
import {floatSub, floatAdd} from "@/views/mazeUnit";
import {gsap} from "gsap";
import type {MYMESH} from "@/views/entity/Entity";

type DrawMazeOptions = {
  upgradeLevel: () => void
}

class DrawMaze {
  public level: number = 1;
  private threeObj: typeof InitThreeScene;
  private mazeArr: string[][] = [];
  private personObj: Person | null = null;
  private removeObjArr: Array<Wall | Stone | Tree> = [];
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
    console.log(treeNum);
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
    // let person = new Person();
    // this.personObj = person;
    // this.threeObj.scene.add(person.mesh);
  }

  init(mazeArr: string[][], level: number){
    if(this.isInit){
      return
    }
    this.isUpLevel = false;
    this.isInit = true;
    this.level = level;
    if(level === 1){
      let ground = new Ground(this.level);
      this.threeObj.scene.add(ground.mesh);

    }
    let size = computedMazeArr.getSize(this.level);
    this.size = size;
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
          duration: 1,
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
          duration: 1,
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

  addPersonMoveEvent(){
    if(window){}
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if(this.personObj){
        let key = e.key;
        let offset:number[][] = [[0, -1], [0, 1], [-1, 0], [1, 0]];
        let position = this.personObj.mesh.position.clone();
        let offsetIndex = 0;
        switch (key){
          case 'ArrowUp':
          case 'w':
            offsetIndex = 0;
            break;
          case 'ArrowDown':
          case 's':
            offsetIndex = 1;
            break;
          case 'ArrowLeft':
          case 'a':
            offsetIndex = 2;
            break;
          case 'ArrowRight':
          case 'd':
            offsetIndex = 3;
            break
        }
        this.movePerson(offset[offsetIndex])
      }
    })
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
          this.personObj.addMoveEvent([newX, newY])
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
