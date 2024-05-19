import { Constant } from "./Constant.js";
import Bucket from "./Bucket.js";
import ColorGrids from "./ColorGrids.js";
export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.bucket = null;
    this.colorGrids = null;
  }
  init() {
    this.bucket = new Bucket(this);
    this.colorGrids = new ColorGrids(this);
  }
  preload() {}
  create() {
    this.bucket.CreateBucket();
    this.colorGrids.CreateFirstGrid();
  }
  update() {
    // this.colorGrids.MoveLeftRight();
  }
}
