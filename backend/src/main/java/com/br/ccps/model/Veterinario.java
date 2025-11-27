package com.br.ccps.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Veterinario {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String nome;

    @Column(length = 20, unique = true)
    private String crmv;
    
    private String cpf;
    
    private LocalDate dataNascimento;

    private String email;
    
    private String senha;

    private String telefone;

    @OneToMany(mappedBy = "veterinario")
    private List<Ccps> ccpsList;
}
