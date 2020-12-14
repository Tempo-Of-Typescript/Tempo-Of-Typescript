import Phaser from "phaser";
import { Player } from "./Player";
import { GridControls } from "./GridControls";
import { GridPhysics } from "./GridPhysics";
import { createSpriteAnims } from "./SpriteAnimations";
import Weapon from "./Weapon";
import { enemy } from "./Enemy";
import { collision } from "./SpriteCollision";
import { hitboxCollision } from "./HitboxCollision";
import preloader from "./Preloader";

//declare the gameState globally
interface looseObj {
  [key: string]: number;
}

export const gameState: looseObj = {
  health: 3, // TODO: Decrease every time an enemy collides with player && increase every time player walks over/attacks a heart
  score: 0, // TODO: Increase every time an enemy collides with sword animation or walks over/attacks a gem
};

//type for ...args in collisionCheck function below
export interface checkFunc {
  apply(context: any, args: any): void;
}

// callback?.apply(context, args);
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
  public healthText?: Phaser.GameObjects.Text;

  public playerSprite?: Phaser.Physics.Arcade.Sprite;

  public lizard?: Phaser.Physics.Arcade.Sprite;
  public tree?: Phaser.Physics.Arcade.Sprite;
  public ogre?: Phaser.Physics.Arcade.Sprite;
  public bandit?: Phaser.Physics.Arcade.Sprite;
  public centaur?: Phaser.Physics.Arcade.Sprite;
  public mushroom?: Phaser.Physics.Arcade.Sprite;
  public masked_orc?: Phaser.Physics.Arcade.Sprite;
  public gnoll?: Phaser.Physics.Arcade.Sprite;
  public goblin?: Phaser.Physics.Arcade.Sprite;
  public golem?: Phaser.Physics.Arcade.Sprite;
  public gnoll_shaman?: Phaser.Physics.Arcade.Sprite;
  public child_mushroom?: Phaser.Physics.Arcade.Sprite;
  public bear?: Phaser.Physics.Arcade.Sprite;
  public wogol?: Phaser.Physics.Arcade.Sprite;
  public skelet?: Phaser.Physics.Arcade.Sprite;
  public bird?: Phaser.Physics.Arcade.Sprite;
  public elf?: Phaser.Physics.Arcade.Sprite;
  public fairy?: Phaser.Physics.Arcade.Sprite;

  public portal?: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super("mainscene");
    this.death = this.death.bind(this);
  }

  public preload(): void {
    //preloads map assets - sprites, map, text, objects...
    preloader(this.load);

    //converts the song's BPM to milliseconds
    const msPerBeat = (60 / this.BPM) * 1000;
    const msForOneBeat = (msPerBeat * 2.5) / 100;

    //sets the rythm of the gameplay based on the available BPM
    setInterval(() => {
      this.gridPhysics?.moveToBeat();
    }, msPerBeat);

    //working on refactoring this!!!!
    // setInterval(() => {
    //   this.beat1!.x += 2.5;
    //   if (this.beat1!.x >= 200) this.beat1!.x = 100;
    //   this.beat2!.x += 2.5;
    //   if (this.beat2!.x >= 300) this.beat2!.x = 200;
    //   this.beat3!.x += 2.5;
    //   if (this.beat3!.x >= 400) this.beat3!.x = 300;
    //   this.beat4!.x += 2.5;
    //   if (this.beat4!.x >= 500) this.beat4!.x = 400;
    //   this.beat5!.x += 2.5;
    //   if (this.beat5!.x >= 600) this.beat5!.x = 500;
    //   this.beat6!.x += 2.5;
    //   if (this.beat6!.x >= 700) this.beat6!.x = 600;
    //   this.beat7!.x += 2.5;
    //   if (this.beat7!.x >= 800) this.beat7!.x = 700;
    //   this.beat8!.x += 2.5;
    //   if (this.beat8!.x >= 900) this.beat8!.x = 800;
    // }, msForOneBeat);
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

    //load player into game and scale hitbox
    this.playerSprite = this.physics.add.sprite(0, 0, "player");
    this.playerSprite.setSize(16, 16);
    this.playerSprite.setDepth(2);

    //Creates enemies

    this.lizard = this.physics.add.sprite(0, 0, "lizard");

    this.tree = this.physics.add.sprite(0, 0, "tree");

    this.bandit = this.physics.add.sprite(0, 0, "bandit");

    this.ogre = this.physics.add.sprite(0, 0, "ogre");

    this.centaur = this.physics.add.sprite(0, 0, "centaur");

    this.gnoll = this.physics.add.sprite(0, 0, "gnoll");

    this.bear = this.physics.add.sprite(0, 0, "bear");

    this.child_mushroom = this.physics.add.sprite(0, 0, "child_mushroom");

    this.mushroom = this.physics.add.sprite(0, 0, "mushroom");

    this.masked_orc = this.physics.add.sprite(0, 0, "masked_orc");

    this.goblin = this.physics.add.sprite(0, 0, "goblin");

    this.gnoll_shaman = this.physics.add.sprite(0, 0, "gnoll_shaman");

    this.golem = this.physics.add.sprite(0, 0, "golem");

    this.wogol = this.physics.add.sprite(0, 0, "wogol");

    this.skelet = this.physics.add.sprite(0, 0, "skelet");

    this.bird = this.physics.add.sprite(0, 0, "bird");

    this.elf = this.physics.add.sprite(0, 0, "elf");

    this.fairy = this.physics.add.sprite(0, 0, "fairy");

    this.portal = this.physics.add.sprite(0, 0, "portal");

    //camera follows the player along the gameplay
    this.cameras.main.startFollow(this.playerSprite);

    //Style for our text boxes
    const textStyle = {
      fill: "#FFFFFF",
      fontSize: "20px",
      backgroundColor: "#000000",
    };

    //Group for the text boxes - may not need them grouped, but just in case it is useful later
    this.textGroup = this.add.group();

    //Player health text box, includes styling and scroll factor of 0 to make the box follow the camera dynamically
    this.healthText = this.add
      .text(775, 15, `Player health: ${gameState.health}`, textStyle)
      .setScrollFactor(0);

    //Player score text box, includes styling and scroll factor of 0 to make the box follow the camera dynamically
    const scoreText = this.add
      .text(15, 15, `Player Score: ${gameState.score}`, textStyle)
      .setScrollFactor(0);

    //Add text boxes to group
    this.textGroup.add(this.healthText);
    this.textGroup.add(scoreText);

    //Set textGroup to third layer
    this.textGroup.setDepth(3);

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

    this.gridPhysics = new GridPhysics(
      //arguments for new Player are (spritesheet, characterIndex, startTilePosX, startTilePosY)
      new Player(this.playerSprite, 0, 29, 57),
      dungeonMap
    );
    this.gridControls = new GridControls(this.input, this.gridPhysics);

    //adds enemy to provided coordinates(function accepts: sprite, spriteIdx, posX, posY, map)
    enemy(this.elf, 2, 8, 8, dungeonMap);
    enemy(this.fairy, 3, 12, 8, dungeonMap);
    enemy(this.goblin, 4, 16, 8, dungeonMap);
    enemy(this.gnoll_shaman, 6, 47, 8, dungeonMap);
    enemy(this.centaur, 7, 23, 18, dungeonMap);
    enemy(this.bear, 8, 35, 25, dungeonMap);
    enemy(this.wogol, 9, 48, 16, dungeonMap);
    enemy(this.ogre, 10, 52, 30, dungeonMap);
    enemy(this.masked_orc, 11, 40, 31, dungeonMap);
    enemy(this.tree, 12, 29, 33, dungeonMap);
    enemy(this.lizard, 13, 8, 35, dungeonMap);
    enemy(this.skelet, 14, 8, 19, dungeonMap);
    enemy(this.golem, 15, 48, 52, dungeonMap);
    enemy(this.gnoll, 16, 4, 43, dungeonMap);
    enemy(this.bird, 17, 13, 57, dungeonMap);
    enemy(this.child_mushroom, 18, 29, 47, dungeonMap);
    enemy(this.mushroom, 19, 32, 7, dungeonMap);
    enemy(this.bandit, 20, 8, 50, dungeonMap);
    enemy(this.portal, 21, -100, -100, dungeonMap);

    //creates animations for enemies
    createSpriteAnims(this.anims);

    //loades animations for enemies
    this.lizard.anims.play("lizard-idle");
    this.bandit.anims.play("bandit-idle");
    this.bear.anims.play("bear-idle");
    this.centaur.anims.play("centaur-idle");
    this.child_mushroom.anims.play("child-mushroom-idle");
    this.gnoll.anims.play("gnoll-idle");
    this.gnoll_shaman.anims.play("gnoll-shaman-idle");
    this.goblin.anims.play("goblin-idle");
    this.golem.anims.play("golem-idle");
    this.masked_orc.anims.play("masked-orc-idle");
    this.mushroom.anims.play("mushroom-idle");
    this.ogre.anims.play("ogre-idle");
    this.tree.anims.play("tree-idle");
    this.wogol.anims.play("wogol-idle");
    this.skelet.anims.play("skelet-idle");
    this.bird.anims.play("bird-idle");
    this.elf.anims.play("elf-idle");
    this.fairy.anims.play("fairy-idle");

    //creates portal for enemy spawns
    this.portal.anims.play("portal-spawn");

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

    // Create the hitbox and bring it to sprite layer
    const hitbox = this.physics.add.sprite(0, 0, "sword");
    hitbox.setDepth(2);

    //this loop handles collision between enemy and player, when player touches enemy - enemy explodes
    //and player loses one life. TODO: add animations on explosion and make enemy movable with A* pathfinding
    //TODO: Add explosion animation when enemy dies, and likewise when player dies.
    const enemies = [
      this.lizard,
      this.golem,
      this.mushroom,
      this.ogre,
      this.bandit,
      this.bear,
      this.bird,
      this.centaur,
      this.child_mushroom,
      this.elf,
      this.fairy,
      this.gnoll,
      this.gnoll_shaman,
      this.goblin,
      this.masked_orc,
      this.tree,
      this.wogol,
      this.skelet,
    ];

    for (let i = 0; i < enemies.length; i++) {
      collision(
        this.physics.add,
        this.playerSprite,
        enemies[i],
        this.healthText,
        this.portal
        // this.death
      );
    }
    //this loop handles collision between enemy and hitbox, once sword touches enemy, enemy dies, player gains +1 score
    for (let i = 0; i < enemies.length; i++) {
      hitboxCollision(
        this.physics.add,
        enemies[i],
        hitbox,
        scoreText,
        this.portal
      );
    }

    // Create the weapon functionality
    this.weapon = new Weapon(
      this.input,
      false,
      hitbox,
      this.playerSprite,
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
      this.physics.pause();
      this.death(); // Currently only turns off the physics for the player and doesn't stop player from moving.
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
}
