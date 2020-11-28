import Phaser from "phaser";
import { Player } from "./Player";
import { GridControls } from "./GridControls";
import { GridPhysics } from "./GridPhysics";

export default class MainScene extends Phaser.Scene {
  //scalar config of the tile sizes
  //depends on the sprite map we are using
  static readonly TILE_SIZE = 48;

  private gridControls?: GridControls;
  private gridPhysics?: GridPhysics;

  constructor() {
    super("main-scene");
  }

  public preload(): void {
    //load map into the game (tile-sheet and JSON for collision info)
    //using Phaser methods
    this.load.image("tiles", "assets/cloud_tileset.png");
    this.load.tilemapTiledJSON("cloud-city-map", "assets/cloud_city.json");

    //load player into the map
    this.load.spritesheet("player", "assets/sprites/characters.png", {
      frameWidth: Player.SPRITE_FRAME_WIDTH,
      frameHeight: Player.SPRITE_FRAME_HEIGHT,
    });
  }

  public create(): void {
    //creates the map we want by parsing the JSON file and filling with sprites
    const cloudCityTilemap = this.make.tilemap({ key: "cloud-city-map" });
    cloudCityTilemap.addTilesetImage("Cloud City", "tiles");

    //adds map depth for each layer we have
    for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
      const layer = cloudCityTilemap.createStaticLayer(i, "Cloud City", 0, 0);
      layer.setDepth(i);
      layer.scale = 3;
    }

    //load character into game
    const playerSprite = this.physics.add.sprite(0, 0, "player");
    playerSprite.setDepth(2);

    this.cameras.main.startFollow(playerSprite);

    this.gridPhysics = new GridPhysics(
      //arguments for new Player are (spritesheet, characterIndex, startTilePosX, startTilePosY)
      new Player(playerSprite, 4, 8, 8),
      cloudCityTilemap
    );
    this.gridControls = new GridControls(this.input, this.gridPhysics);
  }

  //Phaser calls update with 2 arguments: time and delta.
  //Time is the current time of buttons being pressed.
  //Delta is the time in ms since the last frame.
  public update(_time: number, delta: number): void {
    this.gridControls?.update();
    this.gridPhysics?.update(delta);
  }
}
