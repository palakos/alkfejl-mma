import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../../entities/hero';
import { Movie } from '../../entities/movie';

@Component({
  selector: 'mma-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit, OnChanges {

  @Input() hero: Hero;
  @Input() movieList: Movie[];
  model: Hero;
  
  @Output() onSubmit = new EventEmitter<Hero>();
  title: string = 'Új hős hozzáadása';

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    this.model = Object.assign({}, this.hero);
    if (this.hero)
      this.title = 'Hős szerkesztése';

  }

  submit(form) {
    if (!form.valid) {
      return;
    }
    this.model.movies = [];
    let idx: number = 0;
    this.movieList.forEach((movie) => {
      if (movie.checked) {
        this.model.movies[idx] = movie;
        idx++;
      }

    })
    this.onSubmit.emit(this.model);
  }

}
