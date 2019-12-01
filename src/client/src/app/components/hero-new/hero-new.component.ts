import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeroService } from '../../services/hero.service';
import { MovieService } from '../../services/movie.service';
import { Hero } from '../../entities/hero';
import { Movie } from '../../entities/movie';

@Component({
  selector: 'mma-hero-new',
  templateUrl: './hero-new.component.html',
  styleUrls: ['./hero-new.component.css']
})
export class HeroNewComponent implements OnInit {

  hero: Hero = new Hero();
  heroes: Hero[] = [];
  movieList: Movie[] = [];
  title: string = 'Új hős létrehozása';

  constructor(
    private heroService: HeroService,
    private movieService: MovieService,
    private router: Router,
  ) { }

  async ngOnInit() {

    this.movieList = await this.movieService.getMovies();

    }

  async onFormSave(hero: Hero) {
    this.heroes = await this.heroService.getHeroes();
    hero.id = this.heroes[this.heroes.length - 1].id + 1;
    await this.heroService.createHero(hero);
    this.router.navigate(['/heroes'])
      .then(() => {
        if (hero.movies.length > 0) {
          hero.movies.forEach(async movie => {
            await this.heroService.addHeroMovie(hero, movie);
          });
        }
      });
  }

}
