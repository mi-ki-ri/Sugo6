import { MapGrid, GridType } from "../classes/Grid";
import { Card } from "../classes/Card";
import { Player } from "../classes/Character";

export class BattleScene extends Phaser.Scene {
  constructor() {
    super({ key: "BattleScene" });
  }

  map: MapGrid[] = [];
  player: Player = new Player("Player");
  ptxt: Phaser.GameObjects.Text | undefined;
  cardTxts: Phaser.GameObjects.Text[] = [];

  create() {
    this.add
      .text(400, 24, "Battle Scene", {
        font: "24px Arial Bold",
        color: "#ffffff",
      })
      .setOrigin(0.5, 0.5);

    this.map = [
      new MapGrid("Grass", 0, 0, GridType.Grass),
      new MapGrid("Grass", 1, 0, GridType.Grass),
      new MapGrid("Grass", 2, 0, GridType.Grass),
      new MapGrid("Water", 3, 0, GridType.Water),
      new MapGrid("Grass", 4, 0, GridType.Grass),
      new MapGrid("Grass", 4, 1, GridType.Grass),
      new MapGrid("Grass", 4, 2, GridType.Grass),
      new MapGrid("Grass", 4, 3, GridType.Grass),
      new MapGrid("Grass", 3, 3, GridType.Grass),
      new MapGrid("Grass", 2, 3, GridType.Grass),
      new MapGrid("Grass", 1, 3, GridType.Grass),
      new MapGrid("Grass", 0, 3, GridType.Grass),
      new MapGrid("Grass", 0, 2, GridType.Grass),
      new MapGrid("Grass", 1, 2, GridType.Grass),
      new MapGrid("Grass", 2, 2, GridType.Grass),
      new MapGrid("Grass", 2, 1, GridType.Grass),
    ];

    let mapGridSize = 5;

    this.map.forEach((grid, i) => {
      this.add
        .rectangle(
          100 + grid.x * 100,
          100 + grid.y * 100,
          mapGridSize,
          mapGridSize,
          grid.typeToColor()
        )
        .setOrigin(0, 0);

      grid.nextId = this.map[i + 1]?.id ?? "";
    });

    this.player.hand = [];
    this.player.deck = [];

    if (this.player.hand.length === 0) {
      this.player.addCard(new Card("Card 1", 1));
      this.player.addCard(new Card("Card 2", 2));
      this.player.addCard(new Card("Card 3", 3));
      this.player.addCard(new Card("Card 1", 1));
      this.player.addCard(new Card("Card 2", 2));
      this.player.addCard(new Card("Card 3", 3));
      this.player.addCard(new Card("Card 1", 1));
      this.player.addCard(new Card("Card 2", 2));
      this.player.addCard(new Card("Card 3", 3));

      this.player.drawCard();
      this.player.drawCard();
      this.player.drawCard();
    }

    this.map[0].object.push(this.player);
    const playerGrid = this.map.find((grid) =>
      grid.object.includes(this.player)
    );
    if (!playerGrid) return;
    this.ptxt = this.add.text(
      100 + playerGrid.x * 100,
      85 + playerGrid.y * 100,
      "P"
    );
  }

  update(): void {
    // プレイヤーの現在地
    const playerGrid = this.map.find((grid) =>
      grid.object.includes(this.player)
    );
    if (!playerGrid) return;
    if (this.ptxt) {
      this.ptxt.x = 100 + playerGrid.x * 100;
      this.ptxt.y = 85 + playerGrid.y * 100;
    }

    // プレイヤーの手札
    this.player.hand.forEach((card, i) => {
      const cardTxt = this.add
        .text(100 + i * 100, 500, card.name, {
          font: "24px Arial Bold",
          color: "#ffffff",
        })
        .setOrigin(0, 0);
      cardTxt.setInteractive();
      cardTxt.on("pointerdown", () => {
        const isGoal = this.player.moveAndDestroyCard(
          card,
          this.map,
          this.player
        );
        if (this.ptxt) this.ptxt.destroy();
        this.ptxt = this.add.text(
          100 + playerGrid.x * 100,
          85 + playerGrid.y * 100,
          "P"
        );
        this.cardTxts.forEach((cardTxt) => cardTxt.destroy());

        if (isGoal) {
          this.scene.start("GoalScene");
        }
      });

      this.cardTxts.push(cardTxt);
    });
  }
}
