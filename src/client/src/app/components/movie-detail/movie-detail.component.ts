import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Role } from '../../entities/role';
import { Movie } from "../../entities/movie";
import { Projection } from "../../entities/projection";
import { Hero } from "../../entities/hero";
import { AuthService } from '../../services/auth.service';
import { MovieService } from "../../services/movie.service";


@Component({
  selector: 'mma-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  movie: Movie = new Movie();
  projections: Projection[] = [];
  heroes: Hero[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private movieService: MovieService
  ) { }

  async ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.movie = await this.movieService.getMovie(id);
    this.projections = await this.movieService.getMovieProjections(id);
    this.heroes = await this.movieService.getMovieHeroes(id);
  }

  isAdmin(): boolean {
    return this.authService.user.role.toString() == Role[2];
  }

  onDeleteClick(id: number) {

    if (confirm("Biztos, hogy törölni akarod a filmet?")) {

      this.movieService.deleteMovie(id)
        .then(async () => {
          await this.router.navigate(['/movies']);
        })
    }
  }

}
