import Phaser from "phaser";
import MainScene from "./MainScene";

export default class Weapon extends Phaser.Scene {
  constructor(
    public input: Phaser.Input.InputPlugin,
    private isAttacking: boolean,
    private hitbox?: Phaser.GameObjects.Rectangle
  ) {
    super("main-scene");
  }
  public create(): void {
    this.hitbox = this.add?.rectangle(16, 16, 16, 16);
    console.log("not there", this.add);
  }
  public attack(directionOffsetX: number, directionOffsetY: number): void {
    // this.hitbox = this.add?.rectangle(
    //   directionOffsetX,
    //   directionOffsetY,
    //   16,
    //   16
    // );
    console.log("here", this.hitbox);
    //check if currently in an attack already
    if (!this.isAttacking) {
      //play the attack animation - TODO: implement animations
      //this.animations.play('attack');
      // this.isAttacking = true;
      //create the hitbox - TODO: allow creation of rectangles
      //add the overlap physics to destroy an enemy
      // this.physics.add.overlap(this.enemies, this.hitbox, function(enemy) {
      //     enemy.destroy();
      //     gameState.score += 1;
      //     gameState.scoreText.setText(`Player Score: ${gameState.score}`)
      // })
      //TODO: return the animation to idle and:
      // this.attacking = false;
    }
  }
  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.space?.isDown) {
      this.attack(16, 16);
    }
  }
}
