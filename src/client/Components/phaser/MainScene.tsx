import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private player?: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super("main-scene");
  }

  preload(): void {
    this.load.image("underworld", "assets/Underworld.gif");
    // this.load.image("star", "assets/platform.png");
    // this.load.image("bomb", "assets/platform.png");
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create(): void {
    let { add, platforms, player, anims } = this;
    add.image(400, 300, "underworld");

    platforms = this.physics.add.staticGroup();

    const playground = platforms.create(
      400,
      568,
      "ground"
    ) as Phaser.Physics.Arcade.Sprite;

    playground.setScale(2).refreshBody();

    // platforms.create(600, 400, "ground");
    // platforms.create(50, 250, "ground");
    // platforms.create(750, 220, "ground");

    player = this.physics.add.sprite(100, 450, "dude");
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    anims.create({
      key: "right",
      frames: anims.generateFrameNumbers("dude", {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update(): void {}
}
