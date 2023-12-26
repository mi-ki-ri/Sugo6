export class Card {
  constructor(name: string, power: number) {
    this.name = name;
    this.power = power;
    this.isMagic = false;
  }
  name: string;
  power: number;
  isMagic: boolean;
}
