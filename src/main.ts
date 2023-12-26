import Phaser from "phaser";
import { OpeningScene } from "./scenes/OpeningScene";
import { BattleScene } from "./scenes/BattleScene";
import "./style.css";
import { GoalScene } from "./scenes/GoalScene";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [OpeningScene, BattleScene, GoalScene],
  parent: "game",
};

new Phaser.Game(config);
