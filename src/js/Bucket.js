class Bucket {
  constructor(scene) {
    this.scene = scene;
    this.gridsArr = [];
    this.gridStatusArr = [];
    this.gridElemArr = [];
  }
  CreateBucket() {
    this.CreateFrame();
    this.CreateGrids();
  }
  CreateFrame() {
    let left = this.scene.add
      .image(110, 1295, "piller")
      .setOrigin(0.5)
      .setScale(20, 830)
      .setTint("0X458F95");

    let right = this.scene.add
      .image(960, 1295, "piller")
      .setOrigin(0.5)
      .setScale(20, 830)
      .setTint("0X458F95");

    let btm = this.scene.add
      .image(535, 1705, "piller")
      .setOrigin(0.5)
      .setScale(870, 20)
      .setTint("0X458F95");
  }
  CreateGrids() {
    let grid;
    for (let i = 0; i < 6; i++) {
      let arr = [];
      let obj = {};
      let objArr = [];
      let imageElemArr = [];
      for (let j = 0; j < 6; j++) {
        grid = this.scene.add
          .image(200 + i * 135, 1620 - j * 135, "piller")
          .setOrigin(0.5)
          .setScale(130)
          .setTint("0X759C9F");
        arr.push(grid);
        obj = {
          currNum: null,
          isOccupied: false,
          iIndex: i,
          jIndex: j,
          xPos: 200 + i * 135,
          yPos: 1620 - j * 135,
        };
        objArr.push(obj);
        imageElemArr.push(null);
      }
      this.gridsArr.push(arr);
      this.gridStatusArr.push(objArr);
      this.gridElemArr.push(imageElemArr);
    }
  }
}
export default Bucket;
