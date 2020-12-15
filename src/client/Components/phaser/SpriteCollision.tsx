import Phaser from "phaser";
import { gameState } from "./MainScene";
import { collisionCheck } from "./UtilityFuncs";

export const collision = (
  add: Phaser.Physics.Arcade.Factory,
  playerSprite: Phaser.Physics.Arcade.Sprite,
  enemySprite: Phaser.GameObjects.Sprite,
  healthText?: Phaser.GameObjects.Text,
  portal?: Phaser.Physics.Arcade.Sprite,
  death?: any //function type. TODO: change to different type
): void => {
  add.collider(
    playerSprite,
    enemySprite,
    collisionCheck(() => {
      const enemyX: number = enemySprite.x;
      const enemyY: number = enemySprite.y;
      const portalX: number = enemyX;
      const portalY: number = enemyY;

      //initally enables body physics and makes player sprite visible on map
      playerSprite.body.enable = true;
      playerSprite.setVisible(true);

      enemySprite.setPosition(-250, -250);
      portal?.setPosition(portalX, portalY);
      gameState.health -= 1;
      healthText?.setText(`Player Health: ${gameState.health}`);

      //once player's health drops to 0, the collision on player body and enemy body is disabled, and player sprite is hidden from map
      if (gameState.health <= 0) {
        death();
        playerSprite.setVisible(false);
        playerSprite.body.enable = false;
      }

      setTimeout(() => {
        portal?.setPosition(-100, -100);
      }, 500);

      setTimeout(() => {
        enemySprite.setPosition(enemyX, enemyY);
      }, 10000);
    })
  );
};
