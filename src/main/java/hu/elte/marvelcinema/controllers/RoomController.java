/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hu.elte.marvelcinema.controllers;

import hu.elte.marvelcinema.entities.Projection;
import hu.elte.marvelcinema.entities.Room;
import hu.elte.marvelcinema.repositories.ProjectionRepository;
import hu.elte.marvelcinema.repositories.RoomRepository;
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
@RequestMapping("/rooms")
public class RoomController {
  @Autowired
  private RoomRepository roomRepository;
  
  @Autowired
  private ProjectionRepository projectionRepository;

  @GetMapping("")
  public ResponseEntity<Iterable<Room>> getAll() {
    return ResponseEntity.ok(roomRepository.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Room> get(@PathVariable Integer id) {
    Optional<Room> room = roomRepository.findById(id);
    if (!room.isPresent())
    {
      ResponseEntity.notFound();
    }
    
    return ResponseEntity.ok(room.get());
  }
  
  @GetMapping("/{id}/projections")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Iterable<Projection>> projections(@PathVariable Integer id) {
      Optional<Room> oRoom = roomRepository.findById(id);
      if (oRoom.isPresent()) {
          return ResponseEntity.ok(oRoom.get().getProjections());
      } else {
          return ResponseEntity.notFound().build();
      }
  }
    
  @PostMapping("")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Room> post(@RequestBody Room room) {
    Room newRoom = roomRepository.save(room);
    return ResponseEntity.ok(newRoom);
  }
  
  @PostMapping("/{id}/projections")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Projection> insertProjection(@PathVariable Integer id, @RequestBody Projection projection) {
      Optional<Room> oRoom = roomRepository.findById(id);
      if (oRoom.isPresent()) {
          Room room = oRoom.get();
          projection.setRoom(room);
          return ResponseEntity.ok(projectionRepository.save(projection));
      } else {
          return ResponseEntity.notFound().build();
      }
  }
  
  @PutMapping("/{id}")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity<Room> put(@PathVariable Integer id, @RequestBody Room room) {
    Optional<Room> oldRoom = roomRepository.findById(id);
    if (!oldRoom.isPresent())
    {
      ResponseEntity.notFound();
    }

    room.setId(id);
    return ResponseEntity.ok(roomRepository.save(room));
  }
  
  @DeleteMapping("/{id}")
  @Secured({ "ROLE_ADMIN" })
  public ResponseEntity delete(@PathVariable Integer id) {
    Optional<Room> room = roomRepository.findById(id);
    if (!room.isPresent())
    {
      ResponseEntity.notFound();
    }
    
    roomRepository.delete(room.get());
    
    return ResponseEntity.ok().build();
  }
}