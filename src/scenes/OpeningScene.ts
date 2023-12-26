export class OpeningScene extends Phaser.Scene {
  constructor() {
    super({ key: "OpeningScene" });
  }

  create() {
    const title = this.add.text(400, 100, "Sugo 6", {
      font: "64px Arial Bold",
      color: "#00ff00",
    });
    title.setOrigin(0.5, 0.5);
    const subtitle = this.add.text(400, 200, "~Super 6~", {
      font: "24px Arial Bold",
      color: "#ffffff",
    });
    subtitle.setOrigin(0.5, 0.5);

    const startButton = this.add.text(400, 300, "Start", {
      font: "24px Arial Bold",
      color: "#3333FF",
    });
    startButton.setOrigin(0.5, 0.5);
    startButton.setInteractive();
    startButton.on("pointerdown", () => {
      this.scene.start("BattleScene");
    });
  }
}
