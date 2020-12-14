import Phaser from "phaser";
import { gameState } from "./MainScene";

export const hitboxCollision = (
  add: Phaser.Physics.Arcade.Factory,
  enemySprite: Phaser.GameObjects.Sprite,
  hitbox: Phaser.GameObjects.GameObject,
  scoreText: Phaser.GameObjects.Text,
  portal: Phaser.Physics.Arcade.Sprite
): void => {
  add.collider(enemySprite, hitbox, () => {
    //removes enemy from current position - aka destroys it
    const enemyX = enemySprite.x;
    const enemyY = enemySprite.y;
    const portalX: number = enemyX;
    const portalY: number = enemyY;

    //removes enemy from current position, launches explosion animation, adds 1 to playerscore
    enemySprite.setPosition(-100, -100);
    portal?.setPosition(portalX, portalY);
    gameState.score += 1;
    scoreText.setText(`Player Score: ${gameState.score}`);

    setTimeout(() => {
      portal?.setPosition(-100, -100);
    }, 500);

    setTimeout(() => {
      //respawns enemy after 10 seconds
      enemySprite.setPosition(enemyX, enemyY);
    }, 10000);
  });
};
