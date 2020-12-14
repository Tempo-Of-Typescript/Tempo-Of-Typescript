import Phaser from "phaser";
import { Player } from "./Player";

export default function preloader(load: Phaser.Loader.LoaderPlugin): void {
  //load map into the game (tile-sheet and JSON for collision info)
  //using Phaser methods - preloads all assets to the game
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
    "lizard",
    "assets/enemies/lizard.png",
    "assets/enemies/lizard.json"
  );

  load.atlas("tree", "assets/enemies/tree.png", "assets/enemies/tree.json");

  load.atlas("ogre", "assets/enemies/ogre.png", "assets/enemies/ogre.json");

  load.atlas(
    "bandit",
    "assets/enemies/bandit.png",
    "assets/enemies/bandit.json"
  );

  load.atlas(
    "centaur",
    "assets/enemies/centaur.png",
    "assets/enemies/centaur.json"
  );

  load.atlas(
    "goblin",
    "assets/enemies/goblin.png",
    "assets/enemies/goblin.json"
  );

  load.atlas(
    "mushroom",
    "assets/enemies/mushroom.png",
    "assets/enemies/mushroom.json"
  );

  load.atlas(
    "child_mushroom",
    "assets/enemies/child_mushroom.png",
    "assets/enemies/child_mushroom.json"
  );

  load.atlas(
    "masked_orc",
    "assets/enemies/masked_orc.png",
    "assets/enemies/masked_orc.json"
  );

  load.atlas(
    "gnoll_shaman",
    "assets/enemies/gnoll_shaman.png",
    "assets/enemies/gnoll_shaman.json"
  );

  load.atlas("golem", "assets/enemies/golem.png", "assets/enemies/golem.json");

  load.atlas("gnoll", "assets/enemies/gnoll.png", "assets/enemies/gnoll.json");

  load.atlas("bear", "assets/enemies/bear.png", "assets/enemies/bear.json");

  load.atlas("wogol", "assets/enemies/wogol.png", "assets/enemies/wogol.json");

  load.atlas(
    "skelet",
    "assets/enemies/skelet.png",
    "assets/enemies/skelet.json"
  );

  load.atlas("bird", "assets/enemies/bird.png", "assets/enemies/bird.json");

  load.atlas("elf", "assets/enemies/elf.png", "assets/enemies/elf.json");

  load.atlas("fairy", "assets/enemies/fairy.png", "assets/enemies/fairy.json");

  //load the sword into the map
  load.spritesheet("sword", "assets/sprites/smallSword.png", {
    frameWidth: 48,
    frameHeight: 48,
  });
}
