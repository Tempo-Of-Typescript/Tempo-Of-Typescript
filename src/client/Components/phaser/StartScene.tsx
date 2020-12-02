import Phaser from "phaser";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }
  create() {
    this.add.text(
      300,
      300,
      "Tempo of Typescript!\nClick to start you adventure!",
      { fill: "#FFFFFF", fontSize: "20px" }
    );
    this.input.on("pointerdown", () => {
      this.scene.stop("StartScene");
      this.scene.start("MainScene");
    });
  }
}
