import Phaser from "phaser";
import { Direction } from "./Direction";

//Handles enemy movements - in progress
export default class Monster extends Phaser.Physics.Arcade.Sprite {
  private direction = Direction.RIGHT;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    this.anims.play("lizard-idle");
  }

  preUpdate(time: number, deltaTime: number): void {
    super.preUpdate(time, deltaTime);

    const speed = 40;

    //enemy moves based on direction
    switch (this.direction) {
      case Direction.UP:
        this.setVelocity(0, -speed);
        break;
      case Direction.DOWN:
        this.setVelocity(0, speed);
        break;
      case Direction.LEFT:
        this.setVelocity(-speed, 0);
        break;
      case Direction.RIGHT:
        this.setVelocity(speed, 0);
        break;
    }
  }
}
