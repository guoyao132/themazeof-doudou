import type InitThreeScene from "./InitThreeScene";
import initThreeScene from "./InitThreeScene";
import DrawMaze from "./DrawMaze";
import computedMazeArr from "./computedMazeArr";
import {getElementById} from "./mazeUnit";

export type DrawMazeOptions = {
  canvas: HTMLCanvasElement;
}
class MazeOfDouDou {
  private threeObj: typeof InitThreeScene;
  public level:number
  public drawMaze: DrawMaze;

  constructor(options: DrawMazeOptions) {
    this.level = 1;
    this.threeObj = initThreeScene;
    this.threeObj.init(options);
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
      this.drawMaze.initOne(mazeArr!, this.level);
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
