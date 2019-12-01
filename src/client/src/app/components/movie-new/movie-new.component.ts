import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MovieService } from '../../services/movie.service';
import { HeroService } from '../../services/hero.service';
import { ProjectionService } from '../../services/projection.service';
import { Movie } from '../../entities/movie';
import { Hero } from '../../entities/hero';
import { Projection } from '../../entities/projection';

@Component({
  selector: 'mma-movie-new',
  templateUrl: './movie-new.component.html',
  styleUrls: ['./movie-new.component.css']
})
export class MovieNewComponent implements OnInit {

  movie: Movie = new Movie();
  movieList: Movie[] = [];
  heroList: Hero[] = [];
  projectionList: Projection[] = [];
  title: string = 'Új film létrehozása';

  constructor(
    private movieService: MovieService,
    private heroService: HeroService,
    private projectionService: ProjectionService,    
    private router: Router
  ) { }

  async ngOnInit() {
    this.movieList = await this.movieService.getMovies();
    this.heroList = await this.heroService.getHeroes();
    this.projectionList = await this.projectionService.getProjections();
  }

  async onFormSave(movie: Movie) {
    movie.order_num = this.movieList[this.movieList.length - 1].order_num + 1;
    movie.id = movie.order_num;
    await this.movieService.createMovie(movie)
      .then(() => {

        if (movie.heroes.length > 0) {
          movie.heroes.forEach(async hero => {
            await this.movieService.addMovieHero(movie, hero);
          })
        }

      });
    this.router.navigate(['/movies']);
  }


}
