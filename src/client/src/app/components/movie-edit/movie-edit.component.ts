import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { HeroService } from '../../services/hero.service';
import { ProjectionService } from '../../services/projection.service';
import { AuthService } from '../../services/auth.service';
import { Hero } from '../../entities/hero';
import { Movie } from '../../entities/movie';
import { Projection } from '../../entities/projection';

@Component({
  selector: 'mma-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {

  id: number = null;
  movie: Movie = new Movie();
  heroList: Hero[] = [];
  projectionList: Projection[] = [];
  title: string = 'Film szerkesztése';


  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private heroService: HeroService,
    private projectionService: ProjectionService,
    private router: Router,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = +id;
      this.movie = await this.movieService.getMovie(this.id);
      this.heroList = await this.heroService.getHeroes();
      this.projectionList = await this.projectionService.getProjections();
      const movieHeroes: Hero[] = await this.movieService.getMovieHeroes(this.id);
      const movieProjections: Projection[] = await this.movieService.getMovieProjections(this.id);
      movieHeroes.forEach((hero) => {
        this.heroList.find(h => h.id === hero.id).checked = true;
      });
      movieProjections.forEach((projection) => {
        this.projectionList.find(p => p.id === projection.id).checked = true;
      });
    }
  }

  async onFormSave(movie: Movie) {

    await this.movieService.updateMovie(movie)
      .then(async () => {

        if (movie.heroes.length > 0) {
          await this.movieService.clearMovieHeroes(movie);
          movie.heroes.forEach(async hero => {
            await this.movieService.addMovieHero(movie, hero);
          })
        }

      });

    this.router.navigate(['/movies', movie.id]);

  }

}
