/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hu.elte.marvelcinema.repositories;

import hu.elte.marvelcinema.entities.Projection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Zsár Ádám Ottó
 */
@Repository
public interface ProjectionRepository extends CrudRepository<Projection, Integer> {

}
