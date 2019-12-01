import { Ticket } from "./ticket";
import { Role } from "./role";

export class User {
  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public enabled: boolean;
  public role: Role;

  public tickets: Ticket[];

  constructor() { this.id = Math.floor(Math.random() * 1000000); }
}
