package com.br.ccps.repos;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.ccps.model.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, UUID> {
	boolean existsByEmail(String email);
}
