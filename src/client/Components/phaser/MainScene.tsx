import Phaser from "phaser";

//this file would need restructuring, possibly breaking down to different files(i.e preload, create, update)

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

    this.cursors = this.input.keyboard.createCursorKeys();

    this.createAnimations();

    this.createPlayer();
  }

  createAnimations(): void {
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

  createPlayer(): void {
    this.player = this.physics.add.sprite(50, 50, "dude");
    this.player.setCollideWorldBounds(true);
    this.player.setGravity(0, 0);
  }

  createEnemies(): void {
    //create enemies at random spots, add velocity and movements.
  }

  update(): void {
    if (this.player?.body.velocity) {
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;
    }

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
