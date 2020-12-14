import Phaser from "phaser";
import { gameState } from "./MainScene";

export const hitboxCollision = (
  add: Phaser.Physics.Arcade.Factory,
  enemySprite: Phaser.GameObjects.Sprite,
  hitbox: Phaser.GameObjects.GameObject,
  scoreText: Phaser.GameObjects.Text
): void => {
  add.collider(enemySprite, hitbox, () => {
    //removes enemy from current position - aka destroys it
    const enemyX = enemySprite.x;
    const enemyY = enemySprite.y;
    enemySprite.setPosition(-100, -100);

    gameState.score += 1;
    scoreText.setText(`Player Score: ${gameState.score}`);

    setTimeout(() => {
      //respawns enemy after 5 seconds
      enemySprite.setPosition(enemyX, enemyY);
    }, 5000);
  });
};
