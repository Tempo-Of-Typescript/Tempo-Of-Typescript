import Phaser from "phaser";
import { gameState } from "./MainScene";

export const hitboxCollision = (
  add: Phaser.Physics.Arcade.Factory,
  enemySprite: Phaser.GameObjects.GameObject,
  hitbox: Phaser.GameObjects.GameObject,
  scoreText: Phaser.GameObjects.Text
): void => {
  add.collider(enemySprite, hitbox, () => {
    enemySprite.destroy();
    gameState.score += 1;
    scoreText.setText(`Player Score: ${gameState.score}`);
  });
};
