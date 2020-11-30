import MainScene from "./MainScene";
import { Direction } from "./Direction";
import { Player } from "./Player";

//Creates a 2D vector ([x], [y])
const Vector2 = Phaser.Math.Vector2;
type Vector2 = Phaser.Math.Vector2;

export class GridPhysics {
  //the current direction the character is moving, default is NONE (facing forward)
  private movementDirection = Direction.NONE;

  //the number of pixels added to the player position per second
  //affects movement speed
  private readonly speedPixelsPerSecond: number = MainScene.TILE_SIZE * 4;

  //keeps track of the pixels of tiles walked on, so we don't exceed tile border
  private tileSizePixelsWalked = 0;

  //keeps track of the extra decimals after a step
  //steps should be in whole numbers, so these decimals will go to the next step
  private decimalPlacesLeft = 0;

  //convert pressed direction to Phaser Vector2 coordinates
  /*
    Vector2.UP: (x = 0, y = -1)
    Vector2.DOWN: (x = 0, y = 1)
    Vector2.LEFT: (x = -1, y = 0)
    Vector2.RIGHT: (x = 1, y = 0)
  */
  private movementDirectionVectors: {
    [key in Direction]?: Vector2;
  } = {
    [Direction.UP]: Vector2.UP,
    [Direction.DOWN]: Vector2.DOWN,
    [Direction.LEFT]: Vector2.LEFT,
    [Direction.RIGHT]: Vector2.RIGHT,
  };

  constructor(
    private player: Player,
    private tileMap: Phaser.Tilemaps.Tilemap
  ) {}

  //the main method for moving the character
  movePlayer(direction: Direction): void {
    //if player is holding down the keys, keep going
    if (this.isMoving()) return;

    //if player encounters and obstacle, stop and stand
    if (this.isBlockingDirection(direction)) {
      this.player.setStandingFrame(direction);
    } else {
      this.startMoving(direction);
    }
  }

  update(delta: number): void {
    if (this.isMoving()) {
      this.updatePlayerPosition(delta);
    }
  }

  private isMoving(): boolean {
    return this.movementDirection != Direction.NONE;
  }

  private startMoving(direction: Direction): void {
    this.movementDirection = direction;
  }

  private tilePosInDirection(direction: Direction): Vector2 {
    return this.player
      .getTilePos()
      .add(this.movementDirectionVectors[direction]!);
  }

  //if player meets a collision
  private isBlockingDirection(direction: Direction): boolean {
    return this.hasBlockingTile(this.tilePosInDirection(direction));
  }

  //if player reaches the edge of a map or any holes
  private hasNoTile(pos: Vector2): boolean {
    return !this.tileMap.layers.some((layer) =>
      this.tileMap.hasTileAt(pos.x, pos.y, layer.name)
    );
  }

  private hasBlockingTile(pos: Vector2): boolean {
    if (this.hasNoTile(pos)) return true;
    return this.tileMap.layers.some((layer) => {
      const tile = this.tileMap.getTileAt(pos.x, pos.y, false, layer.name);
      return tile && tile.properties.collides;
    });
  }

  //move player
  private updatePlayerPosition(delta: number): void {
    this.decimalPlacesLeft = this.getDecimalPlaces(
      this.getSpeedPerDelta(delta) + this.decimalPlacesLeft
    );
    const pixelsToWalkThisUpdate = this.getIntegerPart(
      this.getSpeedPerDelta(delta) + this.decimalPlacesLeft
    );

    if (this.willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate)) {
      this.movePlayerSpriteRestOfTile();
    } else {
      this.movePlayerSprite(pixelsToWalkThisUpdate);
    }
  }

  private getIntegerPart(float: number): number {
    return Math.floor(float);
  }

  private getDecimalPlaces(float: number): number {
    return float % 1;
  }

  //gets player speed with respect to the delta value provided by Phaser
  private getSpeedPerDelta(delta: number): number {
    const deltaInSeconds = delta / 1000;
    return this.speedPixelsPerSecond * deltaInSeconds;
  }

  //tells us if the player will cross a tile border
  private willCrossTileBorderThisUpdate(
    pixelsToWalkThisUpdate: number
  ): boolean {
    return (
      this.tileSizePixelsWalked + pixelsToWalkThisUpdate >= MainScene.TILE_SIZE
    );
  }

  private movePlayerSpriteRestOfTile(): void {
    this.movePlayerSprite(MainScene.TILE_SIZE - this.tileSizePixelsWalked);
    this.stopMoving();
  }

  //get position, then add distance moved, set as new position
  private movePlayerSprite(speed: number): void {
    const newPlayerPos = this.player
      .getPosition()
      .add(this.movementDistance(speed));
    this.player.setPosition(newPlayerPos);
    this.tileSizePixelsWalked += speed;
    this.updatePlayerFrame(this.movementDirection, this.tileSizePixelsWalked);
    this.tileSizePixelsWalked %= MainScene.TILE_SIZE;
  }

  //sprite movement animation
  private updatePlayerFrame(
    direction: Direction,
    tileSizePixelsWalked: number
  ): void {
    //handles player having walk animation when still on a tile
    if (this.hasWalkedHalfATile(tileSizePixelsWalked)) {
      this.player.setStandingFrame(direction);
    } else {
      this.player.setWalkingFrame(direction);
    }
  }

  private hasWalkedHalfATile(tileSizePixelsWalked: number): boolean {
    return tileSizePixelsWalked > MainScene.TILE_SIZE / 2;
  }

  private stopMoving(): void {
    this.movementDirection = Direction.NONE;
  }

  //computes the distance moved and returns as a 2D vector
  private movementDistance(speed: number): Vector2 {
    return this.movementDirectionVectors[
      this.movementDirection
    ]!.clone().multiply(new Vector2(speed));
  }
}
