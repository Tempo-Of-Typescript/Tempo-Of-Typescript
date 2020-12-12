import MainScene from "./MainScene";
import { Direction } from "./Direction";

interface FrameRow {
  leftFoot: number;
  standing: number;
  rightFoot: number;
}

export class Player {
  //         vvv config information vvv

  //dimensions of our character from the spritesheet
  public static readonly SPRITE_FRAME_WIDTH = 16;
  public static readonly SPRITE_FRAME_HEIGHT = 28;

  //scale factor needed to scale the character to match the tile size
  //this will change how much of the tile the character takes up
  public static readonly SCALE_FACTOR = 3;

  //number of characters in each row
  private static readonly CHARS_IN_ROW = 1;
  //number of movement frames per chracter per row
  private static readonly FRAMES_PER_CHAR_ROW = 3;
  //number of movements
  private static readonly FRAMES_PER_CHAR_COL = 3;

  //maps direction to the character sprite sheet
  //each index represents a row of the sprite sheet

  public currentDirection = "left";

  public directionToFrameRow: { [key in Direction]?: number } = {
    [Direction.DOWN]: 1,
    [Direction.LEFT]: 2,
    [Direction.RIGHT]: 1,
    [Direction.UP]: 2,
  };

  //         ^^^ config information ^^^

  public lastFootLeft = false;

  constructor(
    private sprite: Phaser.GameObjects.Sprite,
    private characterIndex: number,
    //starting positiion of the character
    startTilePosX: number,
    startTilePosY: number
  ) {
    this.sprite.scale = Player.SCALE_FACTOR;
    this.sprite.setPosition(
      //multiply the starting position with the map's tile size and add offsets to handle white space in the spritesheet
      startTilePosX * MainScene.TILE_SIZE + this.playerOffsetX(),
      startTilePosY * MainScene.TILE_SIZE + this.playerOffsetY()
    );
    this.sprite.setFrame(this.framesOfDirection(Direction.DOWN).standing);
  }

  //current positon
  getPosition(): Phaser.Math.Vector2 {
    return this.sprite.getCenter();
  }

  //new postion after movement
  setPosition(position: Phaser.Math.Vector2): void {
    this.sprite.setPosition(position.x, position.y);
  }

  //set animation of movement
  //keeps track of which foot we're on for smooth animation
  setWalkingFrame(direction: Direction): void {
    const frameRow = this.framesOfDirection(direction);
    this.sprite.setFrame(
      this.lastFootLeft ? frameRow.rightFoot : frameRow.leftFoot
    );
  }

  //reset to standing frame when finished moving
  setStandingFrame(direction: Direction): void {
    if (this.isCurrentFrameStanding(direction)) {
      this.lastFootLeft = !this.lastFootLeft;
    }
    this.sprite.setFrame(this.framesOfDirection(direction).standing);
  }

  //get tile position for handling collisions
  //makes sure player isn't walking on air or a hole
  getTilePos(): Phaser.Math.Vector2 {
    const x =
      (this.sprite.getCenter().x - this.playerOffsetX()) / MainScene.TILE_SIZE;
    const y =
      (this.sprite.getCenter().y - this.playerOffsetY()) / MainScene.TILE_SIZE;
    return new Phaser.Math.Vector2(Math.floor(x), Math.floor(y));
  }

  private isCurrentFrameStanding(direction: Direction): boolean {
    return (
      Number(this.sprite.frame.name) !=
      this.framesOfDirection(direction).standing
    );
  }

  //shifting the character sprite to match the tile sprite
  //tile size is 48px but character width is 52, so we adjust X and Y
  private playerOffsetX(): number {
    return MainScene.TILE_SIZE / 2;
  }
  private playerOffsetY(): number {
    return (
      -(
        (Player.SPRITE_FRAME_HEIGHT * Player.SCALE_FACTOR) %
        MainScene.TILE_SIZE
      ) / 2
    );
  }

  //helped function to traverse sprite sheet for the right frames
  //returns object with the indices of the sprites we need for that direction
  private framesOfDirection(direction: Direction): FrameRow {
    const playerCharRow = Math.floor(this.characterIndex / Player.CHARS_IN_ROW);
    const playerCharCol = this.characterIndex % Player.CHARS_IN_ROW;
    const framesInRow = Player.CHARS_IN_ROW * Player.FRAMES_PER_CHAR_ROW;
    const framesInSameRowBefore = Player.FRAMES_PER_CHAR_ROW * playerCharCol;
    const rows =
      this.directionToFrameRow[direction]! +
      playerCharRow * Player.FRAMES_PER_CHAR_COL;
    const startFrame = framesInSameRowBefore + rows * framesInRow;

    return {
      leftFoot: startFrame,
      standing: startFrame + 2,
      rightFoot: startFrame + 1,
    };
  }
}
