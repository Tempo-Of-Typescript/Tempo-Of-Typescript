import Phaser from "phaser";
import { Player } from "./Player";

export default function preloader(load: Phaser.Loader.LoaderPlugin): void {
  //load map into the game (tile-sheet and JSON for collision info)
  //using Phaser methods
  load.image("tiles", "assets/ToTS-sheet.png");
  load.spritesheet("music", "assets/sprites/Treble_001.png", {
    frameWidth: 26,
    frameHeight: 61,
  });
  load.spritesheet("background", "assets/sprites/background.png", {
    frameWidth: 5,
    frameHeight: 65,
  });
  load.tilemapTiledJSON("temple-map", "assets/ToTS_dungeon.json");

  //load player into the map
  load.spritesheet("player", "assets/sprites/knight_spritesheet.png", {
    frameWidth: Player.SPRITE_FRAME_WIDTH,
    frameHeight: Player.SPRITE_FRAME_HEIGHT,
  });

  //load enemies into the map
  load.atlas(
    "monster",
    "assets/enemies/lizard.png",
    "assets/enemies/lizard.json"
  );

  load.atlas("chort", "assets/enemies/chort.png", "assets/enemies/chort.json");

  load.atlas("ogre", "assets/enemies/ogre.png", "assets/enemies/ogre.json");

  load.atlas("demon", "assets/enemies/demon.png", "assets/enemies/demon.json");

  //load the sword into the map
  load.spritesheet("sword", "assets/sprites/smallSword.png", {
    frameWidth: 48,
    frameHeight: 48,
  });
}
