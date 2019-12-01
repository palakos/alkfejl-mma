import { Injectable } from '@angular/core';
import { Hero } from "../entities/hero";
import { Movie } from "../entities/movie";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroUrl = 'http://localhost:8080/heroes';

  constructor(
    private http: HttpClient
  ) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get<Hero[]>(`${this.heroUrl}`, httpOptions).toPromise();
  }

  getHero(id: number): Promise<Hero> {
    return this.http.get<Hero>(`${this.heroUrl}/${id}`, httpOptions).toPromise();
  }

  getHeroMovies(id: number): Promise<Movie[]> {
    return this.http.get<Movie[]>(`${this.heroUrl}/${id}/movies`, httpOptions).toPromise();
  }

  createHero(hero: Hero): Promise<Hero> {
    return this.http.post<Hero>(`${this.heroUrl}`, {
      id: hero.id,
      name: hero.name,
      alias: hero.alias,
      species: hero.species,
      portrayed_by: hero.portrayed_by
    }, httpOptions).toPromise();
  }

  addHeroMovie(hero: Hero, movie: Movie): Promise<Movie> {
    return this.http.post<Movie>(`${this.heroUrl}/${hero.id}/movies`, {
      id: movie.id,
      title_hu: movie.title_hu,
      title_en: movie.title_hu,
      year: movie.year,
      desc: movie.desc,
      phase: movie.phase,
      order_num: movie.order_num,
      length: movie.length
    }, httpOptions).toPromise();
  }

  updateHero(hero: Hero): Promise<Hero> {
    return this.http.put<Hero>(`${this.heroUrl}/${hero.id}`, {
      id: hero.id,
      name: hero.name,
      alias: hero.alias,
      species: hero.species,
      portrayed_by: hero.portrayed_by
    }, httpOptions).toPromise();
  }

  modifyHeroMovies(hero: Hero): Promise<Movie[]> {
    return this.http.put<Movie[]>(`${this.heroUrl}/${hero.id}/movies`, {
      movies: hero.movies
    }, httpOptions).toPromise();
  }

  clearHeroMovies(hero: Hero): Promise<Movie[]> {
    return this.http.put<Movie[]>(`${this.heroUrl}/${hero.id}/movies/clear`, {
    }, httpOptions).toPromise();
  }

  deleteHero(id): Promise<Hero> {
    return this.http.delete<Hero>(`${this.heroUrl}/${id}`, httpOptions).toPromise();
  }

}
