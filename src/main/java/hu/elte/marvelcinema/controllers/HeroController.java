/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hu.elte.marvelcinema.controllers;

import hu.elte.marvelcinema.entities.Hero;
import hu.elte.marvelcinema.entities.Movie;
import hu.elte.marvelcinema.repositories.HeroRepository;
import hu.elte.marvelcinema.repositories.MovieRepository;
import hu.elte.marvelcinema.security.AuthenticatedUser;
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
@RequestMapping("/heroes")
public class HeroController {
  @Autowired
  private HeroRepository heroRepository;
  
  @Autowired
  private MovieRepository movieRepository;
  
  @Autowired
  private AuthenticatedUser authenticatedUser;


  @GetMapping("")
  public ResponseEntity<Iterable<Hero>> getAll() {
        return ResponseEntity.ok(heroRepository.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Hero> get(@PathVariable Integer id) {
    Optional<Hero> hero = heroRepository.findById(id);
    if (!hero.isPresent())
    {
      ResponseEntity.notFound();
    }
    
    return ResponseEntity.ok(hero.get());
  }
  
  @GetMapping("/{id}/movies")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Iterable<Movie>> movies(@PathVariable Integer id) {
      Optional<Hero> oHero = heroRepository.findById(id);
      if (oHero.isPresent()) {
          return ResponseEntity.ok(oHero.get().getMovies());
      } else {
          return ResponseEntity.notFound().build();
      }
  }
   
  @PostMapping("")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Hero> post(@RequestBody Hero hero) {
    Hero newHero = heroRepository.save(hero);
    return ResponseEntity.ok(newHero);
  }
  
  @PostMapping("/{id}/movies")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Movie> insertMovie(@PathVariable Integer id, @RequestBody Movie movie) {
      Optional<Hero> oHero = heroRepository.findById(id);
      if (oHero.isPresent()) {
          Hero hero = oHero.get();
          if(movie.getId() != null && movieRepository.findById(movie.getId()).isPresent()) {
              Movie existingMovie = movieRepository.findById(movie.getId()).get();
              existingMovie.getHeroes().add(hero);
              movieRepository.save(existingMovie);
              return ResponseEntity.ok(existingMovie);
          }
          movie.getHeroes().add(hero);
          Movie newMovie = movieRepository.save(movie);
          
          return ResponseEntity.ok(newMovie);
      } else {
          return ResponseEntity.notFound().build();
      }
  }
   
  @PutMapping("/{id}")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Hero> put(@PathVariable Integer id, @RequestBody Hero hero) {
    Optional<Hero> oldHero = heroRepository.findById(id);
    if (!oldHero.isPresent())
    {
      ResponseEntity.notFound();
    }

    hero.setId(id);
    return ResponseEntity.ok(heroRepository.save(hero));
  }
  
    @PutMapping("/{id}/movies")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Iterable<Movie>> modifyMovies(@PathVariable Integer id, @RequestBody List<Movie> movies) {
        Optional<Hero> oHero = heroRepository.findById(id);
        Iterable<Movie> oldMovies = movieRepository.findAll();
        if (oHero.isPresent()) {
            Hero hero = oHero.get();
            
            oldMovies.forEach(movie -> {
                movie.removeHero(hero);
            });
            hero.getMovies().clear();

            // if we would like to add new movies as well
            for (Movie movie: movies) {
                movie.addHero(hero);
                movieRepository.save(movie);
            }
            
            heroRepository.save(hero);
            return ResponseEntity.ok(movies);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/movies/clear")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Iterable<Movie>> clearMovies(@PathVariable Integer id) {
        Optional<Hero> oHero = heroRepository.findById(id);
        Iterable<Movie> oldMovies = movieRepository.findAll();
        if (oHero.isPresent()) {
            Hero hero = oHero.get();
            
            oldMovies.forEach(movie -> {
                movie.removeHero(hero);
            });
            hero.getMovies().clear();
            
            heroRepository.save(hero);
            return ResponseEntity.ok( hero.getMovies());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
  
  @DeleteMapping("/{id}")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity delete(@PathVariable Integer id) {
    Optional<Hero> hero = heroRepository.findById(id);
    Iterable<Movie> movies = movieRepository.findAll();
    if (!hero.isPresent())
    {
      ResponseEntity.notFound();
    }
    
    movies.forEach(movie -> {
        movie.removeHero(hero.get());
    });
            
    hero.get().getMovies().clear();
    
    heroRepository.delete(hero.get());
    
    return ResponseEntity.ok().build();
  }
}