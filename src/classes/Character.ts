import { Card } from "./Card";
import { MapGrid } from "./Grid";
export class Character {
  constructor(name: string) {
    this.name = name;
    this.mhp = 20;
    this.hp = 20;
    this.str = 5;
    this.vit = 5;
    this.int = 5;
    this.men = 5;
    this.dex = 5;
  }
  name: string;
  mhp: number;
  hp: number;
  str: number;
  vit: number;
  int: number;
  men: number;
  dex: number;
}

export class Player extends Character {
  constructor(name: string) {
    super(name);
  }
  deck: Card[] = [];
  addCard(card: Card) {
    this.deck.push(card);
  }

  hand: Card[] = [];
  drawCard() {
    if (this.deck.length === 0) return;
    this.deck.sort(() => Math.random() - 0.5);
    this.hand.push(this.deck.shift()!);
  }

  moveAndDestroyCard(card: Card, map: MapGrid[], player: Player) {
    let goalFlg = false;

    const movePower = card.power;
    let currentGrid = map.find((grid) => grid.object.includes(player));
    let origingrid = currentGrid;
    if (!currentGrid) return;
    if (!origingrid) return;

    for (let i = 0; i < movePower; i++) {
      console.log(i);
      console.log(currentGrid);
      if (!currentGrid) return;
      currentGrid = map.find((grid) => grid.id === currentGrid?.nextId);

      if (!currentGrid) {
        goalFlg = true;
        return goalFlg;
      }
    }
    if (!currentGrid) return;
    currentGrid.object.push(
      origingrid.object.splice(origingrid.object.indexOf(player), 1)[0]
    );

    this.hand.splice(this.hand.indexOf(card), 1);
    this.drawCard();
    return goalFlg;
  }
}
