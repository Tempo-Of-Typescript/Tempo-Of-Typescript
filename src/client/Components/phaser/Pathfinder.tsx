import Easystar from "easystarjs";
import { Player } from "./Player";

class EasystarAlgo {
  private easyStar: Easystar.js;

  public player?: Player;

  constructor() {
    this.easyStar = new Easystar.js();
  }

  setGrid(_grid: number[][]) {
    this.easyStar.setGrid(_grid);
  }

  setAcceptableTiles(tilePos: number[]) {
    this.easyStar.setAcceptableTiles(tilePos);
  }

  setCost(id: number, cost: number) {
    this.easyStar.setTileCost(id, cost);
  }

  findPath(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    callback: any
  ) {
    this.easyStar.findPath(fromX, fromY, toX, toY, callback);
    this.easyStar.calculate();
  }
}

export const Pathfinder = new EasystarAlgo();
