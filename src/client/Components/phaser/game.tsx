import Phaser from "phaser";
import MainScene from "./MainScene";

export const game: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: "100%",
  height: "100%",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },

  scene: [MainScene],
};
