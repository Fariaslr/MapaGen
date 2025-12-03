package com.br.ccps.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@DiscriminatorValue("TecnicoMapa")
public class TecnicoMapa extends Pessoa {

	private static final long serialVersionUID = 1L;

	@Column(length = 50)
	private String matriculaMapa;

	private String areaAtuacao;
}