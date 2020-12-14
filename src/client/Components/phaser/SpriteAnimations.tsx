import Phaser from "phaser";

//takes care of enemy animations
const createSpriteAnims = (anims: Phaser.Animations.AnimationManager): void => {
  anims.create({
    key: "lizard-idle",
    frames: anims.generateFrameNames("lizard", {
      start: 0,
      end: 3,
      prefix: "lizard_m_idle_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "lizard-run",
    frames: anims.generateFrameNames("lizard", {
      start: 0,
      end: 3,
      prefix: "lizard_m_run_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "bandit-idle",
    frames: anims.generateFrameNames("bandit", {
      start: 1,
      end: 4,
      prefix: "Bandit_Idle_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "bandit-run",
    frames: anims.generateFrameNames("bandit", {
      start: 1,
      end: 4,
      prefix: "Bandit_Walk_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "bear-idle",
    frames: anims.generateFrameNames("bear", {
      start: 1,
      end: 4,
      prefix: "Bear_Idle_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "bear-walk",
    frames: anims.generateFrameNames("bear", {
      start: 1,
      end: 4,
      prefix: "Bear_Walk_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "centaur-idle",
    frames: anims.generateFrameNames("centaur", {
      start: 1,
      end: 4,
      prefix: "Centaur_M_Idle_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "centaur-walk",
    frames: anims.generateFrameNames("centaur", {
      start: 1,
      end: 4,
      prefix: "Centaur_M_Walk_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "child-mushroom-idle",
    frames: anims.generateFrameNames("child_mushroom", {
      start: 1,
      end: 4,
      prefix: "NormalMushroom_Idle_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "child-mushroom-walk",
    frames: anims.generateFrameNames("child_mushroom", {
      start: 1,
      end: 4,
      prefix: "NormalMushroom_Walk_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "gnoll-idle",
    frames: anims.generateFrameNames("gnoll", {
      start: 1,
      end: 4,
      prefix: "GnollOverseer_Idle_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "gnoll-walk",
    frames: anims.generateFrameNames("gnoll", {
      start: 1,
      end: 4,
      prefix: "GnollOverseer_Walk_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "gnoll-shaman-idle",
    frames: anims.generateFrameNames("gnoll_shaman", {
      start: 1,
      end: 4,
      prefix: "GnollShaman_Idle_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "gnoll-shaman-walk",
    frames: anims.generateFrameNames("gnoll_shaman", {
      start: 1,
      end: 4,
      prefix: "GnollShaman_Walk_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "goblin-idle",
    frames: anims.generateFrameNames("goblin", {
      start: 0,
      end: 3,
      prefix: "goblin_idle_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "goblin-run",
    frames: anims.generateFrameNames("goblin", {
      start: 0,
      end: 3,
      prefix: "goblin_run_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "golem-idle",
    frames: anims.generateFrameNames("golem", {
      start: 1,
      end: 4,
      prefix: "Golem_Idle_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "golem-walk",
    frames: anims.generateFrameNames("golem", {
      start: 1,
      end: 4,
      prefix: "Golem_Walk_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "masked-orc-idle",
    frames: anims.generateFrameNames("masked_orc", {
      start: 0,
      end: 3,
      prefix: "masked_orc_idle_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "masked-orc-run",
    frames: anims.generateFrameNames("masked_orc", {
      start: 0,
      end: 3,
      prefix: "masked_orc_run_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "mushroom-idle",
    frames: anims.generateFrameNames("mushroom", {
      start: 1,
      end: 4,
      prefix: "LargeMushroom_Idle_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "mushroom-walk",
    frames: anims.generateFrameNames("mushroom", {
      start: 1,
      end: 4,
      prefix: "LargeMushroom_Walk_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "ogre-idle",
    frames: anims.generateFrameNames("ogre", {
      start: 0,
      end: 3,
      prefix: "ogre_idle_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "ogre-run",
    frames: anims.generateFrameNames("ogre", {
      start: 0,
      end: 3,
      prefix: "ogre_run_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "yellow-boss-idle",
    frames: anims.generateFrameNames("yellow-boss", {
      start: 1,
      end: 3,
      prefix: "ForestGuardian_Idle_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "yellow-boss-walk",
    frames: anims.generateFrameNames("yellow-boss", {
      start: 1,
      end: 3,
      prefix: "ForestGuardian_walk_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "tree-idle",
    frames: anims.generateFrameNames("tree", {
      start: 1,
      end: 4,
      prefix: "Ent_Idle_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "tree-walk",
    frames: anims.generateFrameNames("tree", {
      start: 1,
      end: 4,
      prefix: "Ent_Walk_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "wogol-idle",
    frames: anims.generateFrameNames("wogol", {
      start: 0,
      end: 3,
      prefix: "wogol_idle_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "skelet-idle",
    frames: anims.generateFrameNames("skelet", {
      start: 0,
      end: 3,
      prefix: "skelet_idle_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "skelet-run",
    frames: anims.generateFrameNames("skelet", {
      start: 0,
      end: 3,
      prefix: "skelet_run_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "bird-idle",
    frames: anims.generateFrameNames("bird", {
      start: 0,
      end: 3,
      prefix: "fly_anim_f",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "elf-idle",
    frames: anims.generateFrameNames("elf", {
      start: 1,
      end: 4,
      prefix: "Elf_M_Idle_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "elf-walk",
    frames: anims.generateFrameNames("elf", {
      start: 1,
      end: 4,
      prefix: "Elf_M_Walk_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "fairy-idle",
    frames: anims.generateFrameNames("fairy", {
      start: 1,
      end: 4,
      prefix: "Fairy_Idle + Walk_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });
};

export { createSpriteAnims };
