import Phaser from "phaser";
import { Player } from "./Player";
import { GridControls } from "./GridControls";
import { GridPhysics } from "./GridPhysics";
import { createMonsterAnims } from "./EnemyAnimations";
import Weapon from "./Weapon";

export default class MainScene extends Phaser.Scene {
  //scalar config of the tile sizes
  //depends on the sprite map we are using
  static readonly TILE_SIZE = 48;

  //hardcoded BPM (beats per minute) of a song
  private BPM = 120;

  private gridControls?: GridControls;
  private gridPhysics?: GridPhysics;

  private textGroup?: Phaser.GameObjects.Group;
  private weapon?: Weapon;

  private scene?: Phaser.Scenes.ScenePlugin;

  constructor() {
    super("main-scene");
    this.death = this.death.bind(this);
  }

  public preload(): void {
    //load map into the game (tile-sheet and JSON for collision info)
    //using Phaser methods
    this.load.image("tiles", "assets/ToTS-sheet.png");
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
    this.load.spritesheet("sword", "assets/sprites/smallSword.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    //converts the song's BPM to milliseconds
    const beatsPerSecondInMS = (60 / this.BPM) * 1000;

    //sets the rythm of the gameplay based on the available BPM
    setInterval(() => {
      this.gridPhysics?.moveToBeat();
    }, beatsPerSecondInMS);
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
    const monster = this.physics.add.sprite(
      0,
      0,
      "monster",
      "lizard_m_idle_anim_f0.png"
    );

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

    // let group = this.add.group(playerSprite, monster);

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

    monster.setDepth(2);

    //refactored animations to separate file - EnemyAnimations.tsx
    createMonsterAnims(this.anims);

    monster.anims.play("lizard-run");

    // Create the hitbox and bring it to sprite layer
    const hitbox = this.physics.add.sprite(0, 0, "sword");
    hitbox.setDepth(2);

    // Add the overlap physics to destroy an enemy
    this.physics.add.collider(monster, hitbox, () => {
      monster.destroy();
      gameState.score += 1;
      scoreText.setText(`Player Score: ${gameState.score}`);
    });

    // Add collider physics between an enemy and player
    this.physics.add.collider(
      playerSprite,
      monster,
      this.collisionCheck(() => {
        gameState.health -= 1;
        healthText.setText(`Player Health: ${gameState.health}`);

        if (gameState.health <= 0) {
          this.death(); // Currently only turns off the physics for the player and doesn't stop player from moving.
        }
      })
    );

    // Create the weapon functionality
    this.weapon = new Weapon(this.input, false, hitbox, playerSprite);
  }
  public death(): void {
    //pauses the game. TODO: add click button to start a new game.
    this.scene?.pause();
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

  public collisionCheck(callback?: funcType, context = this): any {
    let once = false;

    return (...args: funcType[]) => {
      if (!once) {
        once = true;
        callback?.apply(context, args);
      }
    };
  }

  //Phaser calls update with 2 arguments: time and delta.
  //Time is the current time of buttons being pressed.
  //Delta is the time in ms since the last frame.
  public update(_time: number, delta: number): void {
    this.gridControls?.update();
    this.gridPhysics?.update(delta);
    this.weapon?.update();
  }
  //spawns group of enemies at random spots
  // public enemies(
  //   x: number,
  //   y: number,
  //   name: string,
  //   animation?: string
  // ): void {}

  //TODO: Make group of enemies, add them to random spots.
  //for(let monster in monsters){
  //arrOfObjects(name, image, location, x, y, size)
  // const monster = this.physics.add.sprite(
  //   0,
  //   0,
  //   "monster",
  //   "lizard_m_idle_anim_f0.png"
  // );
  //}
}
//declare the gameState globally
interface looseObj {
  [key: string]: any;
}
const gameState: looseObj = {
  health: 20, // TODO: Decrease every time an enemy collides with player && increase every time player walks over/attacks a heart
  score: 0, // TODO: Increase every time an enemy collides with sword animation or walks over/attacks a gem
};

//loose function which is used to check if callback is fired once, instead of multiple times
interface funcType {
  apply(...args: any): void;
}
