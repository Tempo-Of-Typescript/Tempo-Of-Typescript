import Phaser from "phaser";
import MainScene from "./MainScene";

//Dimensions of the game area
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;

// interface GameConfig {
//   game: Phaser.Types.Core.GameConfig
// }

// interface RenderConfig {
//   game2: Phaser.Types.Core.RenderConfig
// }

// interface mixedInterface extends GameConfig, RenderConfig {}

//Config settings of the game
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
