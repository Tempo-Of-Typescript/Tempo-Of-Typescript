import Phaser from "phaser";
import { GridPhysics } from "./GridPhysics";
export default class Weapon {
  constructor(
    public input: Phaser.Input.InputPlugin,
    private isAttacking: boolean,
    private hitbox?: Phaser.GameObjects.Sprite,
    private player?: Phaser.Physics.Arcade.Sprite,
    private gridPhysics?: GridPhysics
  ) {}
  public attack(
    directionOffsetX: number,
    directionOffsetY: number,
    angle: number
  ): void {
    //check if currently in an attack already
    if (!this.isAttacking) {
      //play the attack animation
      this.hitbox?.anims.play("attack");

      //Set teh angle of the hitbox to correspond with the direction attacking
      this.hitbox!.angle = 0;
      this.hitbox!.angle += angle;

      //set attacking to true to prevent two attacks
      this.isAttacking = true;

      //move the hitbox - the physics should kill the enemy
      this.hitbox?.setPosition(directionOffsetX, directionOffsetY);
      console.log("hitting position", this.hitbox?.x, this.hitbox?.y);

      //return the hitbox to the starting location after .5 seconds
      setTimeout(() => {
        this.hitbox?.setPosition(0, 0);
        this.isAttacking = false;
      }, 500);
    }
  }
  update(): void {
    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.space?.isDown && this.gridPhysics?.canMove) {
      if (cursors.up?.isDown) {
        this.attack(this.player!.x, this.player!.y - 48, 270);
      }
      if (cursors.down?.isDown) {
        this.attack(this.player!.x, this.player!.y + 48, 90);
      }
      if (cursors.left?.isDown) {
        this.attack(this.player!.x - 48, this.player!.y, 180);
      }
      if (cursors.right?.isDown) {
        this.attack(this.player!.x + 48, this.player!.y, 0);
      }
    }
  }
}
