import Phaser from "phaser";
import MainScene from "./MainScene";

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;

export const game: Phaser.Types.Core.GameConfig = {
  title: "Tempo_of_TypeScript",
  type: Phaser.AUTO,
  scene: [MainScene],
  scale: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};
