import { Projection } from "./projection";

export class Room {
  public id: number;
  public name: string;
  public rows: number;
  public seats: number;
  public projections: Projection[];
  public checked: boolean = false;

  constructor() {
    this.id = Math.floor(Math.random() * 1000000);
    this.checked = false;
  }
}
