package com.br.ccps.repos;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.ccps.model.Veterinario;

public interface VeterinarioRepository extends JpaRepository<Veterinario, UUID> {
    boolean existsByCrmv(String crmv);
    boolean existsByEmail(String email);
}
