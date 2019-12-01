import { Movie } from "./movie";

export class Hero {
  public id: number;
  public name: string;
  public alias: string;
  public species: string;
  public portrayed_by: string;

  public checked: boolean = false;
  public movies: Movie[] = [];

  constructor() {
    this.id = Math.floor(Math.random() * 1000000);
    this.checked = false;
  }

}
