package com.br.ccps.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("Veterinario")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Veterinario extends Pessoa {
	
	private static final long serialVersionUID = 1L;

    @Column(length = 20, unique = true)
    private String crmv;    
   
    @OneToMany(mappedBy = "veterinario")
    private List<Ccps> ccpsList;
}
