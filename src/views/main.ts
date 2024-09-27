import type InitThreeScene from "@/views/InitThreeScene";
import * as THREE from "three";
import initThreeScene from "@/views/InitThreeScene";
import DrawMaze from "@/views/DrawMaze";
import computedMazeArr from "@/views/computedMazeArr";
import {getElementById} from "@/views/mazeUnit";


class MazeOfDouDou {
  private threeObj: typeof InitThreeScene;
  public level:number
  private drawMaze: DrawMaze;

  constructor() {
    this.level = 1;
    this.threeObj = initThreeScene;
    this.threeObj.init();
    this.drawMaze = new DrawMaze({
      upgradeLevel: () => {
        this.#upgradeLevel();
      }
    });
    this.#init();
  }

  getCameraMsg(){
    console.log(this.threeObj.camera.position)
    console.log(this.threeObj.controls.target)
  }

  #upgradeLevel(){
    this.level++;
    getElementById('levelCon').innerHTML = `当前关卡：${this.level}`;
    this.#init();
  }

  #init() {
    this.#changeCameraPosition().then(() => {
      const mazeArr = computedMazeArr.getLevelMaze(this.level);
      this.drawMaze.init(mazeArr!, this.level);
    })

  }

  #changeCameraPosition(){
    return new Promise(resolve => {
      let cameraLevel = Math.floor(this.level / 10);
      this.threeObj.changeCamera(
        [
          -3.575202802800737 - 10 * cameraLevel * 0.5,
          11.116745335949188 + 10 * cameraLevel * 0.8,
          8.59618775968135 + 10 * cameraLevel * 0.2
        ],
        [
          -0.5382067615242148 ,
          2.397269431096525e-18,
          1.1530877707380645
        ]
      ).then(() => {
        resolve(true);
      })
    })

  }

}

export default MazeOfDouDou;
