/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hu.elte.marvelcinema.controllers;

import hu.elte.marvelcinema.entities.Hero;
import hu.elte.marvelcinema.entities.Movie;
import hu.elte.marvelcinema.entities.Projection;
import hu.elte.marvelcinema.repositories.HeroRepository;
import hu.elte.marvelcinema.repositories.MovieRepository;
import hu.elte.marvelcinema.repositories.ProjectionRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Zsár Ádám Ottó
 */
@CrossOrigin
@RestController
@RequestMapping("/movies")
public class MovieController {
  @Autowired
  private MovieRepository movieRepository;
  
  @Autowired
  private ProjectionRepository projectionRepository;
  
  @Autowired
  private HeroRepository heroRepository;

  @GetMapping("")
  public ResponseEntity<Iterable<Movie>> getAll() {
    return ResponseEntity.ok(movieRepository.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Movie> get(@PathVariable Integer id) {
    Optional<Movie> movie = movieRepository.findById(id);
    if (!movie.isPresent())
    {
      ResponseEntity.notFound();
    }
    
    return ResponseEntity.ok(movie.get());
  }
  
  @GetMapping("/{id}/projections")
  @Secured({ "ROLE_USER", "ROLE_ADMIN" })
  public ResponseEntity<Iterable<Projection>> projections(@PathVariable Integer id) {
      Optional<Movie> oMovie = movieRepository.findById(id);
      if (oMovie.isPresent()) {
          return ResponseEntity.ok(oMovie.get().getProjections());
      } else {
          return ResponseEntity.notFound().build();
      }
  }
  
  @GetMapping("/{id}/heroes")
  @Secured({ "ROLE_USER", "ROLE_ADMIN" })
  public ResponseEntity<Iterable<Hero>> heroes(@PathVariable Integer id) {
      Optional<Movie> oMovie = movieRepository.findById(id);
      if (oMovie.isPresent()) {
          return ResponseEntity.ok(oMovie.get().getHeroes());
      } else {
          return ResponseEntity.notFound().build();
      }
  }
   
  @PostMapping("")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Movie> post(@RequestBody Movie movie) {
    Movie newMovie = movieRepository.save(movie);
    return ResponseEntity.ok(newMovie);
  }
  
  @PostMapping("/{id}/projections")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Projection> insertProjection(@PathVariable Integer id, @RequestBody Projection projection) {
      Optional<Movie> oMovie = movieRepository.findById(id);
      if (oMovie.isPresent()) {
          Movie movie = oMovie.get();
          if( projection.getId() != null && projectionRepository.findById(projection.getId()).isPresent() ) {
              Projection existingProjection = projectionRepository.findById(projection.getId()).get();
              existingProjection.setMovie(movie);
              return ResponseEntity.ok(projectionRepository.save(existingProjection));
          }
          projection.setMovie(movie);
          return ResponseEntity.ok(projectionRepository.save(projection));
      } else {
          return ResponseEntity.notFound().build();
      }
  }
  
    
  @PostMapping("/{id}/heroes")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Hero> insertHero(@PathVariable Integer id, @RequestBody Hero hero) {
      Optional<Movie> oMovie = movieRepository.findById(id);
      if (oMovie.isPresent()) {
          Movie movie = oMovie.get();
          if( hero.getId() != null && heroRepository.findById(hero.getId()).isPresent() ) {
              Hero existingHero = heroRepository.findById(hero.getId()).get();
              if(!movie.getHeroes().contains(existingHero))
                movie.getHeroes().add(existingHero);  
              else
                return ResponseEntity.badRequest().build();
              movieRepository.save(movie);
              return ResponseEntity.ok(existingHero);
          }
          Hero newHero = heroRepository.save(hero);
          movie.getHeroes().add(newHero);
          movieRepository.save(movie);
          return ResponseEntity.ok(newHero);
      } else {
          return ResponseEntity.notFound().build();
      }
  }
  
  
  @PutMapping("/{id}")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Movie> put(@PathVariable Integer id, @RequestBody Movie movie) {
    Optional<Movie> oldMovie = movieRepository.findById(id);
    if (!oldMovie.isPresent())
    {
      ResponseEntity.notFound();
    }

    movie.setId(id);
    return ResponseEntity.ok(movieRepository.save(movie));
  }
  
  @PutMapping("/{id}/projections")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Iterable<Projection>> modifyProjections(@PathVariable Integer id, @RequestBody List<Projection> projections) {
      Optional<Movie> oMovie = movieRepository.findById(id);
      Iterable<Projection> oldProjections = projectionRepository.findAll();
      if (oMovie.isPresent()) {
          Movie movie = oMovie.get();
          
          oldProjections.forEach(projection -> {
              projection.setMovie(null);
          });
          movie.getProjections().clear();
           // if we would like to add new labels as well
          for (Projection projection: projections) {
              projection.setMovie(movie);
              projectionRepository.save(projection);
          }
          movieRepository.save(movie);
          return ResponseEntity.ok(projections);
      } else {
          return ResponseEntity.notFound().build();
      }
  }
  
  @PutMapping("/{id}/projections/clear")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Iterable<Projection>> clearProjections(@PathVariable Integer id) {
      Optional<Movie> oMovie = movieRepository.findById(id);
      Iterable<Projection> oldProjections = projectionRepository.findAll();
      if (oMovie.isPresent()) {
          Movie movie = oMovie.get();
          
          oldProjections.forEach(projection -> {
              projection.setMovie(null);
          });

          movieRepository.save(movie);
          return ResponseEntity.ok(movie.getProjections());
      } else {
          return ResponseEntity.notFound().build();
      }
  }
  
  @PutMapping("/{id}/heroes")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Iterable<Hero>> modifyHeroes(@PathVariable Integer id, @RequestBody List<Hero> heroes) {
      Optional<Movie> oMovie = movieRepository.findById(id);
      Iterable<Hero> oldHeroes = heroRepository.findAll();
      if (oMovie.isPresent()) {
          Movie movie = oMovie.get();
          
          oldHeroes.forEach(hero -> {
              hero.removeMovie(movie);
          });
          movie.getHeroes().clear();
           // if we would like to add new labels as well
          for (Hero hero: heroes) {
              hero.addMovie(movie);
              heroRepository.save(hero);
          }
          movieRepository.save(movie);
          return ResponseEntity.ok(heroes);
      } else {
          return ResponseEntity.notFound().build();
      }
  }
  
  @PutMapping("/{id}/heroes/clear")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Iterable<Hero>> clearHeroes(@PathVariable Integer id) {
      Optional<Movie> oMovie = movieRepository.findById(id);
      Iterable<Hero> oldHeroes = heroRepository.findAll();
      if (oMovie.isPresent()) {
          Movie movie = oMovie.get();
          
          oldHeroes.forEach(hero -> {
              hero.removeMovie(movie);
          });
          movie.getHeroes().clear();

          movieRepository.save(movie);
          return ResponseEntity.ok(movie.getHeroes());
      } else {
          return ResponseEntity.notFound().build();
      }
  }
  
  @DeleteMapping("/{id}")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity delete(@PathVariable Integer id) {
    Optional<Movie> oMovie = movieRepository.findById(id);
    if (!oMovie.isPresent())
    {
      ResponseEntity.notFound();
    }
    Movie movie = oMovie.get();
    Iterable<Projection> projections = projectionRepository.findAll();
    
    projections.forEach(projection -> {
        if( projection.getMovie() != null && projection.getMovie().getId() == movie.getId() ) {
            projection.setMovie(null);
        }
    });
    
    movieRepository.delete(movie);
    
    return ResponseEntity.ok().build();
  }
}