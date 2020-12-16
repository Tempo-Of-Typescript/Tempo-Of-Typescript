import Phaser from "phaser";
import { Direction } from "./Direction";
import { GridPhysics } from "./GridPhysics";

export class SuperiorPathfinding {
  constructor(
    private enemy?: Phaser.Physics.Arcade.Sprite,
    private player?: Phaser.Physics.Arcade.Sprite,
    private enemyPhysics?: GridPhysics
  ) {}
  direction(): void {
    return;
  }
  distance(a: number, b: number): number {
    return Math.floor(Math.sqrt(a * a + b * b));
  }
  update(): void {
    const enemyLocation = this.enemy?.getCenter();
    const playerLocation = this.player?.getCenter();
    const deltaX = enemyLocation!.x - playerLocation!.x;
    const deltaY = enemyLocation!.y - playerLocation!.y;
    const isXFurther = Math.abs(deltaX) >= Math.abs(deltaY);
    const distanceToPlayer = Math.floor(this.distance(deltaX, deltaY) / 48);

    if (this.enemyPhysics?.canMove && distanceToPlayer <= 10) {
      if (isXFurther) {
        if (deltaX > 0) {
          this.enemyPhysics.movePlayer(Direction.LEFT);
        } else if (deltaX < 0) {
          this.enemyPhysics.movePlayer(Direction.RIGHT);
        }
      } else {
        if (deltaY > 0) {
          this.enemyPhysics.movePlayer(Direction.DOWN);
        } else if (deltaY < 0) {
          this.enemyPhysics.movePlayer(Direction.UP);
        }
      }
    }
  }
}
