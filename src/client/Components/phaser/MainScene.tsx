import Phaser from "phaser";
import { Player } from "./Player";
import { GridControls } from "./GridControls";
import { GridPhysics } from "./GridPhysics";

export default class MainScene extends Phaser.Scene {
  static readonly TILE_SIZE = 48;

  private gridControls?: GridControls;
  private gridPhysics?: GridPhysics;

  constructor() {
    super("main-scene");
  }

  public create(): void {
    const cloudCityTilemap = this.make.tilemap({ key: "cloud-city-map" });
    cloudCityTilemap.addTilesetImage("Cloud City", "tiles");
    for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
      const layer = cloudCityTilemap.createStaticLayer(i, "Cloud City", 0, 0);
      layer.setDepth(i);
      layer.scale = 3;
    }

    //load character into game
    const playerSprite = this.physics.add.sprite(50, 50, "player");
    playerSprite.setDepth(2);
    playerSprite.setCollideWorldBounds(true);

    this.cameras.main.startFollow(playerSprite);

    this.gridPhysics = new GridPhysics(
      new Player(playerSprite, 6, 8, 8),
      cloudCityTilemap
    );
    this.gridControls = new GridControls(this.input, this.gridPhysics);
  }

  public update(_time: number, delta: number): void {
    this.gridControls?.update();
    this.gridPhysics?.update(delta);
  }

  public preload(): void {
    this.load.image("tiles", "assets/cloud_tileset.png");
    this.load.tilemapTiledJSON("cloud-city-map", "assets/cloud_city.json");
    this.load.spritesheet("player", "assets/sprites/characters.png", {
      frameWidth: Player.SPRITE_FRAME_WIDTH,
      frameHeight: Player.SPRITE_FRAME_HEIGHT,
    });
  }
}
