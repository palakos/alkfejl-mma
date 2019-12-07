/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hu.elte.marvelcinema.controllers;

import hu.elte.marvelcinema.entities.Ticket;
import hu.elte.marvelcinema.entities.User;
import hu.elte.marvelcinema.repositories.TicketRepository;
import hu.elte.marvelcinema.security.AuthenticatedUser;
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
@RequestMapping("/tickets")
public class TicketController {
  @Autowired
  private TicketRepository ticketRepository;
  
  @Autowired 
  private AuthenticatedUser authenticatedUser;
  
  @GetMapping("")
  @Secured({ "ROLE_USER", "ROLE_ADMIN" })
  public ResponseEntity<Iterable<Ticket>> getAll() {
    User user = authenticatedUser.getUser();
    User.Role role = user.getRole();
    if (role.equals(User.Role.ROLE_ADMIN)) {
        return ResponseEntity.ok(ticketRepository.findAll());
    } else {
        return ResponseEntity.ok(ticketRepository.findAllByUser(user));
    }
  }

  @GetMapping("/{id}")
  @Secured({ "ROLE_ADMIN", "ROLE_USER" })
  public ResponseEntity<Ticket> get(@PathVariable Integer id) {
    Optional<Ticket> ticket = ticketRepository.findById(id);
    if (!ticket.isPresent())
    {
      ResponseEntity.notFound();
    }
    
    return ResponseEntity.ok(ticket.get());
  }
     
  @PostMapping("")
  @Secured({ "ROLE_ADMIN", "ROLE_USER" })
  public ResponseEntity<Ticket> post(@RequestBody Ticket ticket) {
    Ticket newTicket = ticketRepository.save(ticket);
    return ResponseEntity.ok(newTicket);
  }
  
  @PutMapping("/{id}")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Ticket> put(@PathVariable Integer id, @RequestBody Ticket ticket) {
    Optional<Ticket> oldTicket = ticketRepository.findById(id);
    if (!oldTicket.isPresent())
    {
      ResponseEntity.notFound();
    }

    ticket.setId(id);
    return ResponseEntity.ok(ticketRepository.save(ticket));
  }
  
  @DeleteMapping("/{id}")
  @Secured({ "ROLE_ADMIN", "ROLE_USER" })
  public ResponseEntity delete(@PathVariable Integer id) {
    Optional<Ticket> ticket = ticketRepository.findById(id);
    if (!ticket.isPresent())
    {
      ResponseEntity.notFound();
    }
    
    ticketRepository.delete(ticket.get());
    
    return ResponseEntity.ok().build();
  }
  
}