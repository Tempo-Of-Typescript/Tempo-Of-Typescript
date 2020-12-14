import Phaser from "phaser";
import { gameState } from "./MainScene";
import { collisionCheck } from "./UtilityFuncs";

export const collision = (
  add: Phaser.Physics.Arcade.Factory,
  playerSprite: Phaser.GameObjects.Sprite,
  enemySprite: Phaser.GameObjects.Sprite,
  healthText?: Phaser.GameObjects.Text
  // death?: any //function type. TODO: change to different type
): void => {
  add.collider(
    playerSprite,
    enemySprite,
    collisionCheck(() => {
      const enemyX = enemySprite.x;
      const enemyY = enemySprite.y;

      enemySprite.setPosition(-100, -100);
      gameState.health -= 1;
      healthText?.setText(`Player Health: ${gameState.health}`);

      setTimeout(() => {
        enemySprite.setPosition(enemyX, enemyY);
      }, 5000);
    })
  );
};
