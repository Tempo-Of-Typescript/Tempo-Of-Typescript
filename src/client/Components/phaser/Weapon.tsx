import Phaser from "phaser";

export default class Weapon {
  constructor(
    public input: Phaser.Input.InputPlugin,
    private isAttacking: boolean,
    private hitbox?: Phaser.GameObjects.Sprite,
    private player?: Phaser.Physics.Arcade.Sprite
  ) {}
  public attack(directionOffsetX: number, directionOffsetY: number): void {
    //check if currently in an attack already
    if (!this.isAttacking) {
      //play the attack animation - TODO: implement animations
      // this.animations.play('attack');
      this.isAttacking = true;

      //move the hitbox - the physics should kill the enemy
      this.hitbox?.setPosition(directionOffsetX, directionOffsetY);
      console.log("hitting position", this.hitbox?.x, this.hitbox?.y);

      //return the hitbox to the starting location after .5 seconds
      setTimeout(() => {
        this.hitbox?.setPosition(0, 0);
        this.isAttacking = false;
      }, 500);

      //TODO: return the animation to idle
    }
  }
  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.space?.isDown && cursors.up?.isDown) {
      this.attack(this.player!.x, this.player!.y - 48);
    }
    if (cursors.space?.isDown && cursors.down?.isDown) {
      this.attack(this.player!.x, this.player!.y + 48);
    }
    if (cursors.space?.isDown && cursors.left?.isDown) {
      this.attack(this.player!.x - 48, this.player!.y);
    }
    if (cursors.space?.isDown && cursors.right?.isDown) {
      this.attack(this.player!.x + 48, this.player!.y);
    }
  }
}
