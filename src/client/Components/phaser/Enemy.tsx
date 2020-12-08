import Phaser from "phaser";
import { GridPhysics } from "./GridPhysics";
import { Player } from "./Player";

//Handles enemy movements - in progress
export const enemy = (
  sprite: Phaser.Physics.Arcade.Sprite,
  charIdx: number,
  startTilePosX: number,
  startTilePosY: number,
  map: Phaser.Tilemaps.Tilemap
): void => {
  new GridPhysics(
    //arguments for new Player are (spritesheet, characterIndex, startTilePosX, startTilePosY)
    new Player(sprite, charIdx, startTilePosX, startTilePosY), //coordinates where enemy spawns
    map
  );
};
