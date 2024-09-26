import type InitThreeScene from "@/views/InitThreeScene";
import * as THREE from "three";
import initThreeScene from "@/views/InitThreeScene";
import DrawMaze from "@/views/DrawMaze";
class MazeOfDouDou {
  private threeObj!: typeof InitThreeScene;
  public level:number

  constructor() {
    this.level = 1;
    this.threeObj = initThreeScene;
    this.threeObj.init();
    this.init();
  }

  init() {
    const drawMaze = new DrawMaze();
    drawMaze.init();
  }
}

export default MazeOfDouDou;
