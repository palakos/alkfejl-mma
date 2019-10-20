/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hu.elte.marvelcinema.controllers;

import hu.elte.marvelcinema.entities.Projection;
import hu.elte.marvelcinema.entities.Ticket;
import hu.elte.marvelcinema.repositories.ProjectionRepository;
import hu.elte.marvelcinema.repositories.TicketRepository;
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
@RequestMapping("/projections")
public class ProjectionController {
  @Autowired
  private ProjectionRepository projectionRepository;
  
  @Autowired
  private TicketRepository ticketRepository;

  @GetMapping("")
  public ResponseEntity<Iterable<Projection>> getAll() {
    return ResponseEntity.ok(projectionRepository.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Projection> get(@PathVariable Integer id) {
    Optional<Projection> projection = projectionRepository.findById(id);
    if (!projection.isPresent())
    {
      ResponseEntity.notFound();
    }
    
    return ResponseEntity.ok(projection.get());
  }
  
  @GetMapping("/{id}/tickets")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Iterable<Ticket>> tickets(@PathVariable Integer id) {
      Optional<Projection> oProjection = projectionRepository.findById(id);
      if (oProjection.isPresent()) {
          return ResponseEntity.ok(oProjection.get().getTickets());
      } else {
          return ResponseEntity.notFound().build();
      }
  }
   
  @PostMapping("")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Projection> post(@RequestBody Projection projection) {
    Projection newProjection = projectionRepository.save(projection);
    return ResponseEntity.ok(newProjection);
  }
  
  @PostMapping("/{id}/tickets")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Ticket> insertMessage(@PathVariable Integer id, @RequestBody Ticket ticket) {
      Optional<Projection> oProjection = projectionRepository.findById(id);
      if (oProjection.isPresent()) {
          Projection projection = oProjection.get();
          ticket.setProjection(projection);
          return ResponseEntity.ok(ticketRepository.save(ticket));
      } else {
          return ResponseEntity.notFound().build();
      }
  }
  
  @PutMapping("/{id}")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Projection> put(@PathVariable Integer id, @RequestBody Projection projection) {
    Optional<Projection> oldProjection = projectionRepository.findById(id);
    if (!oldProjection.isPresent())
    {
      ResponseEntity.notFound();
    }

    projection.setId(id);
    return ResponseEntity.ok(projectionRepository.save(projection));
  }
  
  @DeleteMapping("/{id}")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity delete(@PathVariable Integer id) {
    Optional<Projection> projection = projectionRepository.findById(id);
    if (!projection.isPresent())
    {
      ResponseEntity.notFound();
    }
    
    projectionRepository.delete(projection.get());
    
    return ResponseEntity.ok().build();
  }
}