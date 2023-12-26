import Phaser from "phaser";

export class GoalScene extends Phaser.Scene {
  constructor() {
    super({ key: "GoalScene" });
  }

  create() {
    const title = this.add.text(400, 100, "Goal", {
      font: "64px Arial Bold",
      color: "#00ff00",
    });
    title.setOrigin(0.5, 0.5);
    const subtitle = this.add.text(400, 200, "Goal!", {
      font: "24px Arial Bold",
      color: "#ffffff",
    });
    subtitle.setOrigin(0.5, 0.5);

    const startButton = this.add.text(400, 300, "GOOOOOOOOOOAL!", {
      font: "24px Arial Bold",
      color: "#3333FF",
    });
    startButton.setOrigin(0.5, 0.5);
    startButton.setInteractive();
    startButton.on("pointerdown", () => {
      this.scene.start("OpeningScene");
    });
  }
}
