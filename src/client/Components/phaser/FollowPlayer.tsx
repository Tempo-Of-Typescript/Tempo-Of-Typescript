import { Vector } from "matter";
import MainScene from "./MainScene";
import { Pathfinder } from "./Pathfinder";

export class FollowPlayer extends Phaser.GameObjects.Rectangle {
  private _pathFindingFrequency: number;
  private _dir: Phaser.Math.Vector2;
  private _thisPos: Phaser.Math.Vector2;
  private _path: { x: number; y: number }[];
  private _beat: number;

  constructor(
    scene: Phaser.Scene,
    startTilePosX: number,
    startTilePosY: number,
    beatTimer: number
  ) {
    super(
      scene,
      startTilePosX * MainScene.TILE_SIZE + MainScene.TILE_SIZE / 2,
      startTilePosY * MainScene.TILE_SIZE + MainScene.TILE_SIZE / 2,
      50,
      50,
      0xffffff,
      1
    );
    this._path = [];
    this._dir = new Phaser.Math.Vector2();
    this._thisPos = new Phaser.Math.Vector2();
    this._pathFindingFrequency = 0;
    this._beat = beatTimer;
    this.findPath();
  }

  moveEnemy(): void {
    this._pathFindingFrequency++;
    if (this._pathFindingFrequency > 300) {
      this._pathFindingFrequency = 0;
      this.findPath();
    }

    if (this._path.length) {
      const thisNode = this._path[0];
      this._thisPos.setFromObject(this);
      this._dir.setFromObject(thisNode);
      this._dir.subtract(this._thisPos);
      const distance = this._dir.length();
      const amt = this._thisPos.add(this._dir);
      this.setPosition(amt.x, amt.y);

      if (distance < 5) {
        this._path.shift();
      }
    }

    // setTimeout(() => {
    //   console.log("doing");
    // }, this._beat);
  }

  findPath(): void {
    const enemyLocation = this.getTilePos();
    const playerLocation = Pathfinder.player?.getTilePos();
    Pathfinder.findPath(
      enemyLocation.x,
      enemyLocation.y,
      playerLocation!.x,
      playerLocation!.y,
      (path: { x: number; y: number }[]) => {
        this._path = path.map((tile) => this.tilePosToXY(tile.x, tile.y));
      }
    );
  }

  tilePosToXY(x: number, y: number): Vector {
    return {
      x: x * MainScene.TILE_SIZE + this.playerOffsetX(),
      y: y * MainScene.TILE_SIZE + this.playerOffsetY(),
    };
  }

  getTilePos(): Phaser.Math.Vector2 {
    const x = (this.getCenter().x - this.playerOffsetX()) / MainScene.TILE_SIZE;
    const y = (this.getCenter().y - this.playerOffsetY()) / MainScene.TILE_SIZE;
    return new Phaser.Math.Vector2(Math.floor(x), Math.floor(y));
  }

  private playerOffsetX(): number {
    return MainScene.TILE_SIZE / 2;
  }
  private playerOffsetY(): number {
    return MainScene.TILE_SIZE / 2;
  }
}
