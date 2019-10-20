/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hu.elte.marvelcinema.controllers;

import hu.elte.marvelcinema.entities.Ticket;
import hu.elte.marvelcinema.entities.User;
import hu.elte.marvelcinema.repositories.TicketRepository;
import hu.elte.marvelcinema.repositories.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
public class UserController {
  @Autowired
  private UserRepository userRepository;
  
  @Autowired
  private TicketRepository ticketRepository;
  
  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  @GetMapping("/users")
  public ResponseEntity<Iterable<User>> getAll() {
    return ResponseEntity.ok(userRepository.findAll());
  }

  @GetMapping("/users/{id}")
  public ResponseEntity<User> get(@PathVariable Integer id) {
    Optional<User> user = userRepository.findById(id);
    if (!user.isPresent())
    {
      ResponseEntity.notFound();
    }
    
    return ResponseEntity.ok(user.get());
  }
  
  @GetMapping("/users/{id}/tickets")
  public ResponseEntity<Iterable<Ticket>> tickets(@PathVariable Integer id) {
      Optional<User> oUser = userRepository.findById(id);
      if (oUser.isPresent()) {
          return ResponseEntity.ok(oUser.get().getTickets());
      } else {
          return ResponseEntity.notFound().build();
      }
  }
     
  @PostMapping("register")
  public ResponseEntity<User> register(@RequestBody User user) {
    Optional<User> oUser = userRepository.findByEmail(user.getEmail());
    if (oUser.isPresent()) {
        return ResponseEntity.badRequest().build();
    }
    user.setPass(passwordEncoder.encode(user.getPass()));
    user.setEnabled(true);
    user.setRole(User.Role.ROLE_USER);
    return ResponseEntity.ok(userRepository.save(user));
  }
  
  @PostMapping("login")
  public ResponseEntity login(@RequestBody User user) {
    return ResponseEntity.ok().build();
  } 
  
  @PostMapping("/users/{id}/tickets")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Ticket> insertTicket(@PathVariable Integer id, @RequestBody Ticket ticket) {
      Optional<User> oUser = userRepository.findById(id);
      if (oUser.isPresent()) {
          User user = oUser.get();
          ticket.setUser(user);
          return ResponseEntity.ok(ticketRepository.save(ticket));
      } else {
          return ResponseEntity.notFound().build();
      }
  }
  
  @PutMapping("/users/{id}")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<User> put(@PathVariable Integer id, @RequestBody User user) {
    Optional<User> oldUser = userRepository.findById(id);
    if (!oldUser.isPresent())
    {
      ResponseEntity.notFound();
    }

    user.setId(id);
    return ResponseEntity.ok(userRepository.save(user));
  }
  
  @DeleteMapping("/users/{id}")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity delete(@PathVariable Integer id) {
    Optional<User> user = userRepository.findById(id);
    if (!user.isPresent())
    {
      ResponseEntity.notFound();
    }
    
    userRepository.delete(user.get());
    
    return ResponseEntity.ok().build();
  }
  
}
