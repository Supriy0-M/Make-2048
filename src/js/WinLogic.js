import { Constant } from "./Constant.js";

class WinLogic {
  constructor() {
    this.gameReff = null;
    this.currentVal = 0;
    this.currNum = 2;
  }

  async mergeTiles(_col, _row, newCol, newRow) {
    this.currentVal =
      this.gameReff.bucket.gridStatusArr[newCol][newRow].currNum * 2;

    this.gameReff.bucket.gridStatusArr[newCol][newRow].currNum =
      this.currentVal;
    this.gameReff.bucket.gridStatusArr[_col][_row].isOccupied = false;
    this.gameReff.bucket.gridStatusArr[_col][_row].currNum = null;

    await new Promise((resolve) => setTimeout(resolve, 200));

    this.gameReff.bucket.gridElemArr[_col][_row].list[0].setVisible(false);
    this.gameReff.bucket.gridElemArr[_col][_row].list[1].setVisible(false);

    this.gameReff.bucket.gridElemArr[newCol][newRow].list[1].setText(
      this.currentVal
    );

    // Recursive call for further merging
    this.WinLogicScenario(
      newCol,
      newRow,
      this.gameReff.bucket.gridStatusArr[newCol][newRow]
    );
  }

  async WinLogicScenario(_col, _row, _searchElem) {
    this.gameReff = Constant.game.scene.scenes[1];

    if (
      _col > 0 &&
      this.gameReff.bucket.gridElemArr[_col - 1][_row] != null &&
      this.gameReff.bucket.gridStatusArr[_col - 1][_row].currNum ===
        _searchElem.currNum
    ) {
      await this.mergeTiles(_col, _row, _col - 1, _row);
    } else if (
      _col < this.gameReff.bucket.gridElemArr.length - 1 &&
      this.gameReff.bucket.gridElemArr[_col + 1][_row] != null &&
      this.gameReff.bucket.gridStatusArr[_col + 1][_row].currNum ===
        _searchElem.currNum
    ) {
      await this.mergeTiles(_col, _row, _col + 1, _row);
    } else if (
      _row < this.gameReff.bucket.gridElemArr[0].length - 1 &&
      this.gameReff.bucket.gridElemArr[_col][_row + 1] != null &&
      this.gameReff.bucket.gridStatusArr[_col][_row + 1].currNum ===
        _searchElem.currNum
    ) {
      await this.mergeTiles(_col, _row, _col, _row + 1);
    } else if (
      _row > 0 &&
      this.gameReff.bucket.gridElemArr[_col][_row - 1] != null &&
      this.gameReff.bucket.gridStatusArr[_col][_row - 1].currNum ===
        _searchElem.currNum
    ) {
      await this.mergeTiles(_col, _row, _col, _row - 1);
    } else {
      for (let i = 0; i < this.gameReff.bucket.gridStatusArr.length; i++) {
        for (let j = 0; j < this.gameReff.bucket.gridStatusArr[i].length; j++) {
          console.log(this.gameReff.bucket.gridStatusArr[i][j]);
          if (this.gameReff.bucket.gridStatusArr[i][j].currNum > this.currNum) {
            this.currNum = this.gameReff.bucket.gridStatusArr[i][j].currNum;
            this.gameReff.colorGrids.valueArr.push(this.currNum);
            console.log("this.currNum", this.currNum);
          }
        }
      }
      this.gameReff.colorGrids.MovingImageAnimation();
    }
  }
}

let winLogic = new WinLogic();
export { winLogic as WinLogic };
