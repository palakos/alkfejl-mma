/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hu.elte.marvelcinema.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 *
 * @author PáldiÁkos
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Hero implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
       
    @Column
    @NotNull
    private String name;
    
    @Column
    @NotNull
    private String alias;
    
    @Column
    @NotNull
    private String species;
    
    @Column
    @NotNull
    private String portrayed_by;
        
    @ManyToMany(mappedBy = "heroes")
    @JsonIgnore
    private List<Movie> movies = new ArrayList<>();
    
    public void addMovie(Movie movie) {
        this.movies.add(movie);
        movie.getHeroes().add(this);
    }
    
    public void removeMovie(Movie movie) {
        this.movies.remove(movie);
        movie.getHeroes().remove(this);
    }
            
}
