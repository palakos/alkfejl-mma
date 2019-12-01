import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HeroService } from '../../services/hero.service';
import { MovieService } from '../../services/movie.service';
import { AuthService } from '../../services/auth.service';
import { Hero } from '../../entities/hero';
import { Movie } from '../../entities/movie';

@Component({
  selector: 'mma-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.css']
})
export class HeroEditComponent implements OnInit {

  id: number = null;
  hero: Hero = new Hero();
  movieList: Movie[] = [];
  title: string = 'Hős szerkesztése';

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private movieService: MovieService,
    private router: Router,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = +id;
      this.hero = await this.heroService.getHero(this.id);
      this.movieList = await this.movieService.getMovies();
      const heroMovies: Movie[] = await this.heroService.getHeroMovies(this.id);
      heroMovies.forEach( (movie) => {
        this.movieList.find(m => m.id === movie.id).checked = true;
      });

    }
  }

  async onFormSave(hero: Hero) {
    await this.heroService.updateHero(hero);

    this.router.navigate(['/heroes', hero.id])
      .then(async () => {
        await this.heroService.clearHeroMovies(hero);

        if (hero.movies.length > 0) {
          hero.movies.forEach(async movie => {
            await this.heroService.addHeroMovie(hero, movie);
          });
        }

      });
      
    }

}
