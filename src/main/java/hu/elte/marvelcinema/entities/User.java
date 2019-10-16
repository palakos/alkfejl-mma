/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hu.elte.marvelcinema.entities;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author PáldiÁkos
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column()
    @NotNull
    private String name;
    
    @Column(unique=true)
    @NotNull
    private String email;
    
    @Column()
    @NotNull
    private String pass;
       
    @Column()
    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;
    
    @OneToMany(mappedBy = "user")
    private List<Ticket> tickets;
    
    public enum Role {
        ROLE_GUEST, ROLE_USER, ROLE_ADMIN
    }
}