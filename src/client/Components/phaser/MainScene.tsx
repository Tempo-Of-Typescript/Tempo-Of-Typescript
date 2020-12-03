import Phaser from "phaser";
import { Player } from "./Player";
import { GridControls } from "./GridControls";
import { GridPhysics } from "./GridPhysics";
import { createMonsterAnims } from "./EnemyAnimations";

export default class MainScene extends Phaser.Scene {
  //scalar config of the tile sizes
  //depends on the sprite map we are using
  static readonly TILE_SIZE = 48;

  //hardcoded BPM (beats per minute) of a song
  private BPM = 120;

  private gridControls?: GridControls;
  private gridPhysics?: GridPhysics;

  private beat1?: Phaser.GameObjects.Image;
  private beat2?: Phaser.GameObjects.Image;
  private beat3?: Phaser.GameObjects.Image;
  private beat4?: Phaser.GameObjects.Image;
  private beat5?: Phaser.GameObjects.Image;
  private beat6?: Phaser.GameObjects.Image;
  private beat7?: Phaser.GameObjects.Image;
  private beat8?: Phaser.GameObjects.Image;

  constructor() {
    super("main-scene");
  }

  public preload(): void {
    //load map into the game (tile-sheet and JSON for collision info)
    //using Phaser methods
    this.load.image("tiles", "assets/ToTS-sheet.png");
    this.load.spritesheet("music", "assets/sprites/music_note_001.png", {
      frameWidth: 30,
      frameHeight: 30,
    });
    this.load.tilemapTiledJSON("temple-map", "assets/ToTS_dungeon.json");

    //load player into the map
    this.load.spritesheet("player", "assets/sprites/knight_spritesheet.png", {
      frameWidth: Player.SPRITE_FRAME_WIDTH,
      frameHeight: Player.SPRITE_FRAME_HEIGHT,
    });

    this.load.atlas(
      "monster",
      "assets/enemies/lizard.png",
      "assets/enemies/lizard.json"
    );

    //converts the song's BPM to milliseconds
    const beatsPerSecondInMS = (60 / this.BPM) * 1000;
    const speedCursorNeedsToMove = (beatsPerSecondInMS * 5) / 100;

    //sets the rythm of the gameplay based on the available BPM
    setInterval(() => {
      this.gridPhysics?.moveToBeat();
    }, beatsPerSecondInMS);

    setInterval(() => {
      this.beat1!.x += 5;
      if (this.beat1!.x > 200) this.beat1!.x = 100;
      this.beat2!.x += 5;
      if (this.beat2!.x > 300) this.beat2!.x = 200;
      this.beat3!.x += 5;
      if (this.beat3!.x > 400) this.beat3!.x = 300;
      this.beat4!.x += 5;
      if (this.beat4!.x > 500) this.beat4!.x = 400;
      this.beat5!.x += 5;
      if (this.beat5!.x > 600) this.beat5!.x = 500;
      this.beat6!.x += 5;
      if (this.beat6!.x > 700) this.beat6!.x = 600;
      this.beat7!.x += 5;
      if (this.beat7!.x > 800) this.beat7!.x = 700;
      this.beat8!.x += 5;
      if (this.beat8!.x > 900) this.beat8!.x = 800;
    }, speedCursorNeedsToMove);
  }

  public create(): void {
    //creates the map we want by parsing the JSON file and filling with sprites
    const dungeonMap = this.make.tilemap({ key: "temple-map" });
    dungeonMap.addTilesetImage("Temple of TS", "tiles");

    //adds map depth for each layer we have
    for (let i = 0; i < dungeonMap.layers.length; i++) {
      const layer = dungeonMap.createStaticLayer(i, "Temple of TS", 0, 0);
      layer.setDepth(i);
      layer.scale = 3;
    }

    //load character into game
    const playerSprite = this.physics.add.sprite(0, 0, "player");
    playerSprite.setDepth(2);

    //creates enemy - lizard
    const monster = this.add.sprite(
      0,
      0,
      "monster",
      "lizard_m_idle_anim_f0.png"
    );

    // this.cameras.main.startFollow(playerSprite);
    this.cameras.main.startFollow(playerSprite);

    this.gridPhysics = new GridPhysics(
      //arguments for new Player are (spritesheet, characterIndex, startTilePosX, startTilePosY)
      new Player(playerSprite, 0, 29, 57),
      dungeonMap
    );
    this.gridControls = new GridControls(this.input, this.gridPhysics);

    //gridphysics for enemy to spawn at particular spot
    new GridPhysics(
      //arguments for new Player are (spritesheet, characterIndex, startTilePosX, startTilePosY)
      new Player(monster, 4, 28, 48), //coordinates where enemy spawns
      dungeonMap
    );

    //refactored animations to separate file - EnemyAnimations.tsx
    createMonsterAnims(this.anims);

    monster.anims.play("lizard-run");

    this.beat1 = this.add
      .image(100, 550, "music")
      .setScrollFactor(0)
      .setDepth(3);
    this.beat2 = this.add
      .image(200, 550, "music")
      .setScrollFactor(0)
      .setDepth(3);
    this.beat3 = this.add
      .image(300, 550, "music")
      .setScrollFactor(0)
      .setDepth(3);
    this.beat4 = this.add
      .image(400, 550, "music")
      .setScrollFactor(0)
      .setDepth(3);
    this.beat5 = this.add
      .image(500, 550, "music")
      .setScrollFactor(0)
      .setDepth(3);
    this.beat6 = this.add
      .image(600, 550, "music")
      .setScrollFactor(0)
      .setDepth(3);
    this.beat7 = this.add
      .image(700, 550, "music")
      .setScrollFactor(0)
      .setDepth(3);
    this.beat8 = this.add
      .image(800, 550, "music")
      .setScrollFactor(0)
      .setDepth(3);
  }

  //Phaser calls update with 2 arguments: time and delta.
  //Time is the current time of buttons being pressed.
  //Delta is the time in ms since the last frame.
  public update(_time: number, delta: number): void {
    this.gridControls?.update();
    this.gridPhysics?.update(delta);
  }
}
