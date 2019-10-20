/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hu.elte.marvelcinema.controllers;

import hu.elte.marvelcinema.entities.Hero;
import hu.elte.marvelcinema.repositories.HeroRepository;
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
@RequestMapping("/heroes")
public class HeroController {
  @Autowired
  private HeroRepository heroRepository;

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
   
  @PostMapping("")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Hero> post(@RequestBody Hero hero) {
    Hero newHero = heroRepository.save(hero);
    return ResponseEntity.ok(newHero);
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
  
  @DeleteMapping("/{id}")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity delete(@PathVariable Integer id) {
    Optional<Hero> hero = heroRepository.findById(id);
    if (!hero.isPresent())
    {
      ResponseEntity.notFound();
    }
    
    heroRepository.delete(hero.get());
    
    return ResponseEntity.ok().build();
  }
}