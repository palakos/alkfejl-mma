import { Injectable } from '@angular/core';
import { Movie } from "../entities/movie";
import { Projection } from "../entities/projection";
import { Hero } from "../entities/hero";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movieUrl = 'http://localhost:8080/movies';

  constructor(
    private http: HttpClient
  ) { }

  getMovies(): Promise<Movie[]> {
    return this.http.get<Movie[]>(`${this.movieUrl}`, httpOptions).toPromise();
  }

  getMovie(id: number): Promise<Movie> {
    return this.http.get<Movie>(`${this.movieUrl}/${id}`, httpOptions).toPromise();
  }

  getMovieProjections(id: number): Promise<Projection[]> {
    return this.http.get<Projection[]>(`${this.movieUrl}/${id}/projections`, httpOptions).toPromise();
  }

  getMovieHeroes(id: number): Promise<Hero[]> {
    return this.http.get<Hero[]>(`${this.movieUrl}/${id}/heroes`, httpOptions).toPromise();
  }

  createMovie(movie: Movie): Promise<Movie> {
    return this.http.post<Movie>(`${this.movieUrl}`, {
      id: movie.id,
      title_hu: movie.title_hu,
      title_en: movie.title_en,
      year: movie.year,
      desc: movie.desc,
      phase: movie.phase,
      order_num: movie.order_num,
      rate: movie.rate,
      length: movie.length
    }, httpOptions).toPromise();
  }

  addMovieProjection(movie: Movie, projection: Projection): Promise<Projection> {
    return this.http.post<Projection>(`${this.movieUrl}/${movie.id}/projections`, {
      id: projection.id,
      time: projection.time,
      isfull: projection.isfull
    }, httpOptions).toPromise();
  }


  addMovieHero(movie: Movie, hero: Hero): Promise<Hero> {
    return this.http.post<Hero>(`${this.movieUrl}/${movie.id}/heroes`, {
      id: hero.id,
      name: hero.name,
      alias: hero.alias,
      species: hero.species,
      portrayed_by: hero.portrayed_by
    }, httpOptions).toPromise();
  }

  updateMovie(movie: Movie): Promise<Movie> {
    return this.http.put<Movie>(`${this.movieUrl}/${movie.id}`, {
      id: movie.id,
      title_hu: movie.title_hu,
      title_en: movie.title_en,
      year: movie.year,
      desc: movie.desc,
      phase: movie.phase,
      order_num: movie.order_num,
      rate: movie.rate,
      length: movie.length
    }, httpOptions).toPromise();
  }

  clearMovieProjections(movie: Movie): Promise<Projection[]> {
    return this.http.put<Projection[]>(`${this.movieUrl}/${movie.id}/projections/clear`, {}, httpOptions).toPromise();
  }

  clearMovieHeroes(movie: Movie): Promise<Hero[]> {
    return this.http.put<Hero[]>(`${this.movieUrl}/${movie.id}/heroes/clear`, {}, httpOptions).toPromise();
  }

  deleteMovie(id): Promise<Movie> {
    return this.http.delete<Movie>(`${this.movieUrl}/${id}`, httpOptions).toPromise();
  }

}
