import { User } from "./user";
import { Projection } from "./projection";

export class Reservation {
  public id: number;
  public user: User;
  public projection: Projection;
  public row_num: number;
  public seat_num: number;

  constructor() {
    this.id = Math.floor(Math.random() * 1000000);
  }
}
