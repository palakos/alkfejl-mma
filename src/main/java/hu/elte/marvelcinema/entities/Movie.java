/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hu.elte.marvelcinema.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
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
public class Movie implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column
    @NotNull
    private String title_hu;
    
    @Column
    @NotNull
    private String title_en;
    
    @Column
    @NotNull
    private Integer year;
   
    @Column
    @NotNull
    private String desc;
    
    @Column
    @NotNull
    private Integer phase;
        
    @Column
    @NotNull
    private Integer order;
    
    @Column
    @NotNull
    private Float rate;
        
    @Column
    @NotNull
    private Integer length;
    
    @OneToMany(mappedBy = "movie")
    private List<Projection> projections;
    
    @JsonIgnore
    @ManyToMany(mappedBy = "movies")
    private List<Hero> heroes;
}