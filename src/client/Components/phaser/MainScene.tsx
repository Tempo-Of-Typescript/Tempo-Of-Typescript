import Phaser from "phaser";
import { Player } from "./Player";
import { GridControls } from "./GridControls";
import { GridPhysics } from "./GridPhysics";
import { createMonsterAnims } from "./EnemyAnimations";
import Weapon from "./Weapon";
import { BelongsToManyAssociation } from "sequelize-typescript";

//declare the gameState globally
interface looseObj {
  [key: string]: number;
}
const gameState: looseObj = {
  health: 20, // TODO: Decrease every time an enemy collides with player && increase every time player walks over/attacks a heart
  score: 0, // TODO: Increase every time an enemy collides with sword animation or walks over/attacks a gem
};

// interface beatMeter {
//   beat: Phaser.GameObjects.Image,
// }

export default class MainScene extends Phaser.Scene {
  //scalar config of the tile sizes
  //depends on the sprite map we are using
  static readonly TILE_SIZE = 48;

  //hardcoded BPM (beats per minute) of a song
  private BPM = 160;

  private gridControls?: GridControls;
  private gridPhysics?: GridPhysics;

  // private beatMap: Array<beatMeter> = []

  //working on refactoring this!!!!
  private beat1?: Phaser.GameObjects.Image;
  private beat2?: Phaser.GameObjects.Image;
  private beat3?: Phaser.GameObjects.Image;
  private beat4?: Phaser.GameObjects.Image;
  private beat5?: Phaser.GameObjects.Image;
  private beat6?: Phaser.GameObjects.Image;
  private beat7?: Phaser.GameObjects.Image;
  private beat8?: Phaser.GameObjects.Image;

  private background?: Phaser.GameObjects.Image;

  private textGroup?: Phaser.GameObjects.Group;
  private weapon?: Weapon;
  private gameScene?: Phaser.Scenes.ScenePlugin;

  constructor() {
    super("main-scene");
    this.death = this.death.bind(this);
  }

  public preload(): void {
    //load map into the game (tile-sheet and JSON for collision info)
    //using Phaser methods
    this.load.image("tiles", "assets/ToTS-sheet.png");
    this.load.spritesheet("music", "assets/sprites/Treble_001.png", {
      frameWidth: 26,
      frameHeight: 61,
    });
    this.load.spritesheet("background", "assets/sprites/background.png", {
      frameWidth: 5,
      frameHeight: 65,
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

    //load the sword into the map
    this.load.spritesheet("slash", "assets/sprites/smallSlash.png", {
      frameWidth: 72,
      frameHeight: 72,
    });

    //this.load.atlas("slash", "assets/sprites/slashSheet.png", "assets/sprites/slashSheet.json");

    //converts the song's BPM to milliseconds
    const msPerBeat = (60 / this.BPM) * 1000;
    const msForOneBeat = (msPerBeat * 2.5) / 100;

    //sets the rythm of the gameplay based on the available BPM
    setInterval(() => {
      this.gridPhysics?.moveToBeat();
    }, msPerBeat);

    //working on refactoring this!!!!
    setInterval(() => {
      this.beat1!.x += 2.5;
      if (this.beat1!.x >= 200) this.beat1!.x = 100;
      this.beat2!.x += 2.5;
      if (this.beat2!.x >= 300) this.beat2!.x = 200;
      this.beat3!.x += 2.5;
      if (this.beat3!.x >= 400) this.beat3!.x = 300;
      this.beat4!.x += 2.5;
      if (this.beat4!.x >= 500) this.beat4!.x = 400;
      this.beat5!.x += 2.5;
      if (this.beat5!.x >= 600) this.beat5!.x = 500;
      this.beat6!.x += 2.5;
      if (this.beat6!.x >= 700) this.beat6!.x = 600;
      this.beat7!.x += 2.5;
      if (this.beat7!.x >= 800) this.beat7!.x = 700;
      this.beat8!.x += 2.5;
      if (this.beat8!.x >= 900) this.beat8!.x = 800;
    }, msForOneBeat);
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

    //load character into game and scale hitbox
    const playerSprite = this.physics.add.sprite(0, 0, "player");
    playerSprite.setSize(16, 16);
    playerSprite.setDepth(2);

    //creates enemy - lizard and scales the hitbox
    const monster = this.physics.add.sprite(
      0,
      0,
      "monster",
      "lizard_m_idle_anim_f0.png"
    );
    monster.setSize(16, 16);

    // this.cameras.main.startFollow(playerSprite);
    this.cameras.main.startFollow(playerSprite);

    //Style for our text boxes
    const textStyle = {
      fill: "#FFFFFF",
      fontSize: "20px",
      backgroundColor: "#000000",
    };

    //Group for the text boxes - may not need them grouped, but just in case it is useful later
    this.textGroup = this.add.group();

    //Player health text box, includes styling and scroll factor of 0 to make the box follow the camera dynamically
    const healthText = this.add
      .text(775, 15, `Player health: ${gameState.health}`, textStyle)
      .setScrollFactor(0);

    //Player score text box, includes styling and scroll factor of 0 to make the box follow the camera dynamically
    const scoreText = this.add
      .text(15, 15, `Player Score: ${gameState.score}`, textStyle)
      .setScrollFactor(0);

    //Add text boxes to group
    this.textGroup.add(healthText);
    this.textGroup.add(scoreText);

    //Set textGroup to third layer
    this.textGroup.setDepth(3);

    this.gridPhysics = new GridPhysics(
      //arguments for new Player are (spritesheet, characterIndex, startTilePosX, startTilePosY)
      new Player(playerSprite, 0, 29, 57),
      dungeonMap,
      true
    );
    this.gridControls = new GridControls(this.input, this.gridPhysics);

    //gridphysics for enemy to spawn at particular spot
    new GridPhysics(
      //arguments for new Player are (spritesheet, characterIndex, startTilePosX, startTilePosY)
      new Player(monster, 4, 28, 48), //coordinates where enemy spawns
      dungeonMap,
      true
    );
    monster.setDepth(2);

    //refactored animations to separate file - EnemyAnimations.tsx
    createMonsterAnims(this.anims);

    monster.anims.play("lizard-run");

    // for (let i = 1; i <= 8; i++) {
    //   const alpha = 0.2;
    //   const location = 100 * i;

    //   const beat: Phaser.GameObjects.Image = this.add
    //   .image(location, 550, "music")
    //   .setScrollFactor(0)
    //   .setDepth(4);

    //   const objectToPush: beatMeter = {beat: beat, alpha: alpha}
    //   this.beatMap.push(objectToPush)
    // }

    //working on refactoring this!!!!
    this.beat1 = this.add
      .image(100, 550, "music")
      .setScrollFactor(0)
      .setDepth(4);
    this.beat2 = this.add
      .image(200, 550, "music")
      .setScrollFactor(0)
      .setDepth(4);
    this.beat3 = this.add
      .image(300, 550, "music")
      .setScrollFactor(0)
      .setDepth(4);
    this.beat4 = this.add
      .image(400, 550, "music")
      .setScrollFactor(0)
      .setDepth(4);
    this.beat5 = this.add
      .image(500, 550, "music")
      .setScrollFactor(0)
      .setDepth(4);
    this.beat6 = this.add
      .image(600, 550, "music")
      .setScrollFactor(0)
      .setDepth(4);
    this.beat7 = this.add
      .image(700, 550, "music")
      .setScrollFactor(0)
      .setDepth(4);
    this.beat8 = this.add
      .image(800, 550, "music")
      .setScrollFactor(0)
      .setDepth(4);
    this.background = this.add
      .image(500, 550, "background")
      .setScrollFactor(0)
      .setDepth(3);

    //working on refactoring this!!!!
    this.beat1.alpha = 0.2;
    this.beat8.alpha = 0.2;
    this.beat2.alpha = 0.5;
    this.beat7.alpha = 0.5;
    this.beat3.alpha = 0.8;
    this.beat6.alpha = 0.8;

    // Create the hitbox and bring it to sprite layer
    const hitbox = this.physics.add.sprite(0, 0, "slash");
    hitbox.setSize(48, 48);
    hitbox.setDepth(2);

    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers("slash", { start: 3, end: 6 }),
      frameRate: 10,
      repeat: 0,
    });

    // Add the overlap physics to destroy an enemy
    this.physics.add.collider(monster, hitbox, () => {
      setTimeout(() => {
        monster.destroy();
      }, 300);
      gameState.score += 1;
      scoreText.setText(`Player Score: ${gameState.score}`);
    });

    // Add collider physics between an enemy and player
    this.physics.add.collider(playerSprite, monster, () => {
      gameState.health -= 1;
      healthText.setText(`Player Health: ${gameState.health}`);

      if (gameState.health <= 0) {
        this.death(); // Currently only turns off the physics for the player and doesn't stop player from moving.
      }
    });

    // Create the weapon functionality
    this.weapon = new Weapon(
      this.input,
      false,
      hitbox,
      playerSprite,
      this.gridPhysics
    );
  }

  //Phaser calls update with 2 arguments: time and delta.
  //Time is the current time of buttons being pressed.
  //Delta is the time in ms since the last frame.
  public update(_time: number, delta: number): void {
    this.gridControls?.update();
    this.gridPhysics?.update(delta);
    this.weapon?.update();
    if (gameState.health <= 0) {
      this.gridPhysics?.pause();
    }
  }

  public death(): void {
    //pauses the game. TODO: add click button to start a new game.
    this.gameScene?.pause();
    this.add
      .text(325, 200, "YOU DIED", {
        fontSize: "80px",
        fill: "#8b0000",
        fontStyle: "bold",
      })
      .setScrollFactor(0)
      .setDepth(3);
    this.add
      .text(430, 350, "Click to Restart", { fontSize: "15px", fill: "#FFFFFF" })
      .setScrollFactor(0)
      .setDepth(3);
    // const deathScene = this.scene.get([MainScene]);
    // deathScene.scene.restart();
  }

  //this function makes sure callback on collider (enemy vs player) fires only once
  //player loses one life
  //TODO: define interface for function type and pass it to the below function - work in progress...
  public collisionCheck(callback?: any, context = this): any {
    let once = false;

    return (...args: any[]) => {
      if (!once) {
        once = true;
        callback?.apply(context, args);
      }
    };
  }
}
