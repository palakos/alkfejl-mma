import { User } from "./user";
import { Projection } from "./projection";

export class Ticket {
  public id: number;
  public row_num: number;
  public seat_num: number;
  public price: number;
  public user: User;
  public projection: Projection;
  public checked: boolean = false;

  constructor() {
    this.id = Math.floor(Math.random() * 1000000);
    this.checked = false;
  }
}
