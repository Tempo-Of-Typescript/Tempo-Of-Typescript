import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private player?: Phaser.Physics.Arcade.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("main-scene");
  }

  preload(): void {
    this.load.image("ToTs_map", "assets/ToTS_map_001.png");
    // this.load.image("star", "assets/platform.png");
    // this.load.image("bomb", "assets/platform.png");
    this.load.spritesheet("dude", "assets/sprites/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create(): void {
    this.add.image(798, 455, "ToTs_map");

    // const playground = platforms.create(
    //   400,
    //   568,
    //   "ground"
    // ) as Phaser.Physics.Arcade.Sprite;

    // playground.setScale(2).refreshBody();

    // platforms.create(600, 400, "ground");
    // platforms.create(50, 250, "ground");
    // platforms.create(750, 220, "ground");

    this.player = this.physics.add.sprite(50, 50, "dude");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update(): void {
    if (this.cursors?.left?.isDown) {
      this.player?.setVelocityX(-160);

      this.player?.anims.play("left", true);
    } else if (this.cursors?.right?.isDown) {
      this.player?.setVelocityX(160);

      this.player?.anims.play("right", true);
    } else if (this.cursors?.up?.isDown) {
      this.player?.setVelocityY(-160);

      this.player?.anims.play("turn", true);
    } else if (this.cursors?.down?.isDown) {
      this.player?.setVelocityY(160);

      this.player?.anims.play("turn", true);
    } else {
      this.player?.setVelocityX(0);

      this.player?.anims.play("turn");
    }

    if (this.cursors?.up?.isDown && this.player?.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}
