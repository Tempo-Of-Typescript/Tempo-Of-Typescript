import Phaser from "phaser";
import { gameState } from "./MainScene";
import { collisionCheck } from "./UtilityFuncs";

export const collision = (
  add: Phaser.Physics.Arcade.Factory,
  playerSprite: Phaser.GameObjects.GameObject,
  enemySprite: Phaser.GameObjects.GameObject,
  healthText?: Phaser.GameObjects.Text,
  death?: any //function type. TODO: change to different type
): void => {
  add.collider(
    playerSprite,
    enemySprite,
    collisionCheck(() => {
      enemySprite?.destroy();
      gameState.health -= 1;
      healthText?.setText(`Player Health: ${gameState.health}`);

      if (gameState.health <= 0) {
        death(); // Currently only turns off the physics for the player and doesn't stop player from moving.
      }
    })
  );
};
