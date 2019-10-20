/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hu.elte.marvelcinema.controllers;

import hu.elte.marvelcinema.entities.Movie;
import hu.elte.marvelcinema.entities.Projection;
import hu.elte.marvelcinema.repositories.MovieRepository;
import hu.elte.marvelcinema.repositories.ProjectionRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
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
@RestController
@RequestMapping("/movies")
public class MovieController {
  @Autowired
  private MovieRepository movieRepository;
  
  @Autowired
  private ProjectionRepository projectionRepository;

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
          projection.setMovie(movie);
          return ResponseEntity.ok(projectionRepository.save(projection));
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
  
  @DeleteMapping("/{id}")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity delete(@PathVariable Integer id) {
    Optional<Movie> movie = movieRepository.findById(id);
    if (!movie.isPresent())
    {
      ResponseEntity.notFound();
    }
    
    movieRepository.delete(movie.get());
    
    return ResponseEntity.ok().build();
  }
}