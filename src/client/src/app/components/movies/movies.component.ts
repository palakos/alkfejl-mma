import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../entities/movie';
import { Role } from '../../entities/role';

@Component({
  selector: 'mma-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[];

  constructor(public authService: AuthService, private movieService: MovieService) { }

  async ngOnInit() {
    this.movies = await this.movieService.getMovies();

    this.movies.sort((a, b) => (a.year > b.year) ? 1 : -1);
  }

  isAdmin(): boolean {
    return this.authService.user.role.toString() == Role[2];
  }

  onDeleteClick(id: number) {

    if (confirm("Biztos, hogy törölni akarod a filmet?")) {
      this.movieService.deleteMovie(id)
        .then(async () => {
          this.movies = await this.movieService.getMovies();
        })
    }


  }

}
