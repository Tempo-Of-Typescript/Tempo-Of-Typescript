import Phaser from "phaser";
import { gameState } from "./MainScene";
import { collisionCheck } from "./UtilityFuncs";

export const collision = (
  add: Phaser.Physics.Arcade.Factory,
  playerSprite: Phaser.GameObjects.Sprite,
  enemySprite: Phaser.GameObjects.Sprite,
  healthText?: Phaser.GameObjects.Text,
  portal?: Phaser.Physics.Arcade.Sprite
  // death?: any //function type. TODO: change to different type
): void => {
  add.collider(
    playerSprite,
    enemySprite,
    collisionCheck(() => {
      const enemyX: number = enemySprite.x;
      const enemyY: number = enemySprite.y;
      const portalX: number = enemyX;
      const portalY: number = enemyY;

      enemySprite.setPosition(-100, -100);
      gameState.health -= 1;
      healthText?.setText(`Player Health: ${gameState.health}`);

      portal?.setPosition(portalX, portalY);

      setTimeout(() => {
        portal?.setPosition(-100, -100);
      }, 500);

      setTimeout(() => {
        enemySprite.setPosition(enemyX, enemyY);
      }, 10000);
    })
  );
};
