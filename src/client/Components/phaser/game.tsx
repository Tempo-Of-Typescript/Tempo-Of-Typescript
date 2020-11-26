import Phaser from "phaser";
import MainScene from "./MainScene";

export const game: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: "89%",
  height: "90%",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },

  scene: [MainScene],
};

console.log("game", game);
