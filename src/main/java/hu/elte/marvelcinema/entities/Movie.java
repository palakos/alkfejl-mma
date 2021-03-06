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
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
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
    
    @Column(columnDefinition = "varchar(1000)")
    @NotNull
    private String desc;
    
    @Column
    @NotNull
    private Integer phase;
        
    @Column
    @NotNull
    private Integer order_num;
    
    @Column
    @NotNull
    private Float rate;
    
    @Column
    @NotNull
    private Integer length;
    
    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Projection> projections = new ArrayList<>();
       
    @ManyToMany
    @JoinTable
    private List<Hero> heroes = new ArrayList<>();
    
    public void addHero(Hero hero) {
        this.heroes.add(hero);
        hero.getMovies().add(this);
    }
    
    public void removeHero(Hero hero) {
        this.heroes.remove(hero);
        hero.getMovies().remove(this);
    }
            
}
