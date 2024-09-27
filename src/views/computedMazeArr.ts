import config from "@/views/config";
const {
  levelStep,
  levelStart,
  levelSplitNum,
  startPoint,
} = config;
class CusArr  {
  cusArr: number[][];
  constructor() {
    this.cusArr = []
  }
  push(pos:number[]) {
    this.cusArr.push(pos)
  }
  pop():number[] | undefined {
    let randomIndex = Math.floor(Math.random() * this.cusArr.length)
    let temp = this.cusArr[0]
    this.cusArr[0] = this.cusArr[randomIndex]
    this.cusArr[randomIndex] = temp
    return this.cusArr.shift()
  }
  empty():boolean {
    return !this.cusArr.length
  }
}

class ComputedMazeArr {
  public historyLevelMaze: string[][][]
  constructor() {
    this.historyLevelMaze = [];
  }

  getSize(level:number):number{
    let splitNum = Math.floor(level / levelSplitNum);
    let stepNum = levelStep * splitNum;
    return levelStart + stepNum;
  }

  getLevelMaze(level:number){
    if(this.historyLevelMaze[level]){
      return this.historyLevelMaze[level];
    }
    let size = this.getSize(level);
    let row:number = size;
    let col:number = size;
    let arr:string[][] = [];
    let visited:boolean[][] = [];
    let start:number[] = startPoint;
    let end:number[] = [row - 2, col - 1];
    for (let i:number = 0; i < row; i++) {
      arr.push(new Array(col).fill('wall'));
      visited.push(new Array(col).fill(false))
      for (let j = 0; j < col; j++) {
        if(i % 2 === 1 && j % 2 === 1) {
          arr[i][j] = 'road'
        }
      }
    }
    arr[start[0]][start[1]] = 'start';
    arr[end[0]][end[1]] = 'end';
    function isArea(x:number, y:number):boolean{
      return x >= 0 && x < row && y >= 0 && y < col
    }
    // 上右下左
    let offset:number[][] = [[-1, 0], [0, 1], [1, 0],  [0, -1]]
    let cusArr = new CusArr()
    let startX:number = start[0] + 1;
    let startY:number = start[1];
    cusArr.push([startX, startY])
    visited[startX][startY] = true;
    while (!cusArr.empty()) {
      let pos = cusArr.pop()!;
      for (let i = 0; i < 4; i++) {
        let newX = pos[0] + offset[i][0] * 2  // 两步是 *2
        let newY = pos[1] + offset[i][1] * 2
        // 坐标没有越界 而且 没有被访问过
        if (isArea(newX, newY) && !visited[newX][newY]) {
          // 改变this.maze中对应的数据
          arr[(newX + pos[0]) / 2][(newY + pos[1]) / 2] = 'road';
          cusArr.push([newX, newY]);
          visited[newX][newY] = true;
        }
      }
    }
    this.historyLevelMaze[level] = arr;
    return arr;
  }
}
const computedMazeArr = new ComputedMazeArr();
export default computedMazeArr
