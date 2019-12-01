import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../entities/movie';
import { Hero } from '../../entities/hero';
import { Projection } from '../../entities/projection';

@Component({
  selector: 'mma-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit, OnChanges {

  @Input() movie: Movie;
  @Input() heroList: Hero[];
  @Input() projectionList: Projection[];
  model: Movie;

  @Output() onSubmit = new EventEmitter<Movie>();
  title: string = 'Új film hozzáadása';

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.model = Object.assign({}, this.movie);
    if (this.movie)
      this.title = 'Film szerkesztése';
    this.projectionList.sort((a, b) => {
      if (a.time < b.time)
        return -1;
      else
        return 1;
    });

  }

  submit(form) {
    if (!form.valid) {
      return;
    }
    this.model.heroes = [];
    this.model.projections = [];
    let idx: number = 0;
    this.heroList.forEach((hero) => {
      if (hero.checked) {
        this.model.heroes[idx] = hero;
        idx++;
      }
    });

    idx = 0;
    this.projectionList.forEach((projection) => {
      if (projection.checked) {
        this.model.projections[idx] = projection;
        idx++;
      }
    });

    this.onSubmit.emit(this.model);
  }

}
