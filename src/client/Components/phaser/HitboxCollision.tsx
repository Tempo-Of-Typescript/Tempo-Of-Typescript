import Phaser from "phaser";
import { gameState } from "./MainScene";

export const hitboxCollision = (
  add: Phaser.Physics.Arcade.Factory,
  enemySprite: Phaser.GameObjects.Sprite,
  hitbox: Phaser.GameObjects.GameObject,
  scoreText: Phaser.GameObjects.Text
): void => {
  add.collider(enemySprite, hitbox, () => {
    //TODO: Fix bug with score loop, increment only once
    enemySprite.setActive(false).setVisible(false);

    gameState.score += 1;
    scoreText.setText(`Player Score: ${gameState.score}`);

    setTimeout(() => {
      enemySprite.setActive(true).setVisible(true);
    }, 5000);
  });
};
