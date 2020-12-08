import Phaser from "phaser";
import MainScene from "./MainScene";

//Dimensions of the game area
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;

//Config settings of the game
export const game: Phaser.Types.Core.GameConfig = {
  title: "Tempo_of_TypeScript",
  type: Phaser.AUTO,
  scene: [MainScene],
  backgroundColor: "#212121",
  render: {
    pixelArt: true,
  },
  scale: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
};
