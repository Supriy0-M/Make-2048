import { WinLogic } from "./WinLogic.js";
class ColorGrids {
  constructor(scene) {
    this.scene = scene;
    this.baseLineArr = [];
    this.gridContainer = null;
    this.colorCodeArr = [
      "0X4BAE4B",
      "0XE3A816",
      "0X1692E3",
      "0X8016E3",
      "0XCA16E3",
      "0X3B16E3",
      "0XE7DB50",
      "0XE7273E",
      "0X8127E7",
    ];
    this.valueArr = [2];
    this.movingImage = null;
    this.movingImageData = {};
    this.movingImageValue = null;
    // this.movingContainer = null;

    this.isCursorActive = true;
    this.currentStack = null;
    this.randomNumber = null;
  }

  CreateFirstGrid() {
    for (let i = 0; i < this.scene.bucket.gridStatusArr.length; i++) {
      this.baseLineArr.push(this.scene.bucket.gridStatusArr[i][0]);
    }
    let gridReff = this.RandomNumberGenerator(0, this.baseLineArr.length);
    let xPos = this.baseLineArr[gridReff].xPos;
    let yPos = this.baseLineArr[gridReff].yPos;

    this.CreateInitial(
      xPos,
      yPos,
      this.colorCodeArr[gridReff],
      this.baseLineArr,
      this.baseLineArr[gridReff].iIndex,
      this.baseLineArr[gridReff].jIndex
    );
    this.SetDataForFirstGrid(
      this.baseLineArr[gridReff].iIndex,
      this.baseLineArr[gridReff].jIndex
    );
  }

  CreateInitial(_xPos, _yPos, _colorCode, _baseGrids, _i, _j) {
    this.gridContainer = this.scene.add.container(0, 0);
    let grid = this.scene.add
      .image(_xPos, _yPos, "piller")
      .setScale(130)
      .setOrigin(0.5)
      .setTint(_colorCode);

    let value = this.scene.add
      .text(_xPos, _yPos, "2", {
        fontFamily: "Montserrat-Bold",
        fontSize: "65px",
        fill: "#F0E8E8",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);

    this.gridContainer.add(grid);
    this.gridContainer.add(value);
    this.scene.bucket.gridElemArr[_i][_j] = this.gridContainer;
    this.MovingImageAnimation();

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.scene.input.keyboard.on("keydown-LEFT", this.MoveLeft, this);
    this.scene.input.keyboard.on("keydown-RIGHT", this.MoveRight, this);
  }

  SetDataForFirstGrid(_i, _j) {
    for (let i = 0; i < this.scene.bucket.gridStatusArr.length; i++) {
      for (let j = 0; j < this.scene.bucket.gridStatusArr[i].length; j++) {
        if (
          this.scene.bucket.gridStatusArr[i][j].iIndex == _i &&
          this.scene.bucket.gridStatusArr[i][j].jIndex == _j
        ) {
          this.scene.bucket.gridStatusArr[i][j].currNum = 2;
          this.scene.bucket.gridStatusArr[i][j].isOccupied = true;
        }
      }
    }
  }

  MovingImageAnimation() {
    this.isCursorActive = true;
    let randomIndx = this.RandomNumberGenerator(0, this.baseLineArr.length);
    let randomX = this.baseLineArr[randomIndx].xPos;
    this.currentStack = this.baseLineArr[randomIndx].iIndex;
    console.log("this.valueArr", this.valueArr);
    this.randomNumber =
      this.valueArr[this.RandomNumberGenerator(0, this.valueArr.length)];
    let rndColor =
      this.colorCodeArr[
        this.RandomNumberGenerator(0, this.colorCodeArr.length)
      ];
    let movingContainer = null;
    movingContainer = this.scene.add.container(0, 0);
    this.movingImage = this.scene.add
      .image(randomX, 300, "piller")
      .setOrigin(0.5)
      .setScale(130)
      .setTint(rndColor);

    this.movingImageText = this.scene.add
      .text(randomX, 300, this.randomNumber, {
        fontFamily: "Montserrat-Bold",
        fontSize: "65px",
        fill: "#F0E8E8",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);

    movingContainer.add([this.movingImage, this.movingImageText]);

    this.ApplyInitialTween(movingContainer);
  }

  ApplyInitialTween(_movingCont) {
    this.scene.tweens.add({
      targets: [this.movingImage, this.movingImageText],
      ease: "Linear",
      duration: 2000,
      y: 800,
      onComplete: () => {
        this.isCursorActive = false;
        this.PlaceMovingGridToBucket(_movingCont);
      },
    });
  }

  MoveLeft() {
    if (
      this.movingImage.x > 200 &&
      this.isCursorActive &&
      this.currentStack != 0
    ) {
      this.movingImage.x -= 135;
      this.movingImageText.x -= 135;
      this.currentStack -= 1;
    }
  }

  MoveRight() {
    if (
      this.movingImage.x < 765 &&
      this.isCursorActive &&
      this.currentStack < 5
    ) {
      this.movingImage.x += 135;
      this.movingImageText.x += 135;
      this.currentStack += 1;
    }
  }
  PlaceMovingGridToBucket(_movingCont) {
    let bucketGridInfoArr = this.scene.bucket.gridStatusArr[this.currentStack];

    for (let i = 0; i < bucketGridInfoArr.length; i++) {
      if (bucketGridInfoArr[i].isOccupied == false) {
        this.AnimateToBucket(
          bucketGridInfoArr[i].xPos,
          bucketGridInfoArr[i].yPos,
          this.currentStack,
          i,
          _movingCont
        );
        break;
      }
    }
  }
  AnimateToBucket(_xPosition, _yPosition, _currStack, _index, _movingCont) {
    this.scene.tweens.add({
      targets: [this.movingImage, this.movingImageText],
      ease: "Linear",
      duration: 200,
      x: _xPosition,
      y: _yPosition,
      onComplete: () => {
        this.scene.bucket.gridStatusArr[_currStack][_index].isOccupied = true;
        this.scene.bucket.gridStatusArr[_currStack][_index].currNum =
          this.randomNumber;

        this.scene.bucket.gridElemArr[_currStack][_index] = _movingCont;
        WinLogic.WinLogicScenario(
          _currStack,
          _index,
          this.scene.bucket.gridStatusArr[_currStack][_index]
        );
        // this.MovingImageAnimation();
      },
    });
  }
  RandomNumberGenerator(_min, _max) {
    return Math.floor(Math.random() * (_max - _min)) + _min;
  }
}

export default ColorGrids;
