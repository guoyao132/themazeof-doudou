import type InitThreeScene from "@/views/InitThreeScene";
import * as THREE from "three";
import initThreeScene from "@/views/InitThreeScene";
import DrawMaze from "@/views/DrawMaze";
import computedMazeArr from "@/views/computedMazeArr";

class MazeOfDouDou {
  private threeObj!: typeof InitThreeScene;
  public level:number

  constructor() {
    this.level = 1;
    this.threeObj = initThreeScene;
    this.threeObj.init();
    this.init();
  }

  getCameraMsg(){
    console.log(this.threeObj.camera.position)
    console.log(this.threeObj.controls.target)
  }

  init() {
    const mazeArr = computedMazeArr.getLevelMaze(this.level);
    const drawMaze = new DrawMaze();
    drawMaze.init(mazeArr!, this.level);
    this.changeCameraPosition();

  }

  changeCameraPosition(){
    this.threeObj.changeCamera(
      [-3.575202802800737,11.116745335949188,8.59618775968135],
      [-0.5382067615242148, 2.397269431096525e-18, 1.1530877707380645]
    )

  }

}

export default MazeOfDouDou;
