import { v4 as uuidV4 } from "uuid";
import { Character } from "./Character";

export enum GridType {
  Grass = "Grass",
  Water = "Water",
  Mountain = "Mountain",
}

export class MapGrid {
  constructor(name: string, x: number, y: number, type: GridType) {
    this.name = name;
    this.id = uuidV4();
    this.nextId = "";
    this.x = x;
    this.y = y;
    this.type = type;
    this.object = [];
  }
  name: string;
  id: string;
  nextId: string;
  x: number;
  y: number;
  type: GridType;
  object: Character[];

  typeToColor(): number {
    switch (this.type) {
      case GridType.Grass:
        return 0x00ff00;
      case GridType.Water:
        return 0x0000ff;
      case GridType.Mountain:
        return 0x808080;
    }
  }
}
