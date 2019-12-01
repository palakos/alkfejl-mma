import { Room } from "./room";
import { Movie } from "./movie";
import { Ticket } from "./ticket";

export class Projection {
  public id: number;
  public time: Date;
  public isfull: boolean;
  public room: Room;
  public movie: Movie;
  public tickets: Ticket[];
  public checked: boolean = false;

  constructor() {
    this.id = Math.floor(Math.random() * 1000000);
    this.checked = false;
  }
}
