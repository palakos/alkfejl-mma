import { Projection } from "./projection";
import { Hero } from "./hero";

export class Movie {
  public id: number;
  public title_hu: string;
  public title_en: string;
  public year: number;
  public desc: string;
  public phase: number;
  public order_num: number;
  public rate: number;
  public length: number;


  public checked: boolean = false;
  public projections: Projection[];
  public heroes: Hero[];

  constructor() {
    this.id = Math.floor(Math.random() * 1000000);
    this.checked = false;
  }
}
