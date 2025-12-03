package com.br.ccps.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.br.ccps.model.Administrador;
import com.br.ccps.model.Pessoa;
import com.br.ccps.model.TecnicoMapa;
import com.br.ccps.model.Veterinario;
import com.br.ccps.records.PessoaRecordDto;
import com.br.ccps.repos.PessoaRepository;

import jakarta.transaction.Transactional;

@Service
public class PessoaService {

	@Autowired
	private PessoaRepository pessoaRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Transactional
	public Veterinario cadastrar(PessoaRecordDto dto) {

		if (pessoaRepository.existsByEmail(dto.email())) {
			throw new RuntimeException("E-mail já cadastrado.");
		}

		if (pessoaRepository.existsByCpf(dto.cpf())) {
			throw new RuntimeException("CPF já cadastrado.");
		}

		Veterinario novoVet = new Veterinario();
		novoVet.setNome(dto.nome());
		novoVet.setCrmv(dto.crmv());
		novoVet.setCpf(dto.cpf());
		novoVet.setDataNascimento(dto.dataNascimento());
		novoVet.setEmail(dto.email());
		novoVet.setSenha(passwordEncoder.encode(dto.senha()));
		novoVet.setTelefone(dto.telefone());		
		return pessoaRepository.save(novoVet);
	}

	public Administrador cadastrarAdmin(PessoaRecordDto dto) {
		validar(dto);
		Administrador admin = new Administrador();
		preencherDadosComuns(dto, admin);

		return pessoaRepository.save(admin);
	}

	public Veterinario cadastrarVeterinario(PessoaRecordDto dto) {
		validar(dto);

		if (dto.crmv() == null || dto.crmv().isBlank()) {
			throw new RuntimeException("CRMV é obrigatório para veterinário.");
		}

		Veterinario vet = new Veterinario();
		preencherDadosComuns(dto, vet);
		vet.setCrmv(dto.crmv());

		return pessoaRepository.save(vet);
	}

	public TecnicoMapa cadastrarTecnicoMapa(PessoaRecordDto dto) {
		validar(dto);
		TecnicoMapa tecnico = new TecnicoMapa();
		preencherDadosComuns(dto, tecnico);
		return pessoaRepository.save(tecnico);
	}

	private void validar(PessoaRecordDto dto) {
		if (pessoaRepository.existsByEmail(dto.email())) {
			throw new RuntimeException("Email já cadastrado.");
		}

		if (pessoaRepository.existsByCpf(dto.cpf())) {
			throw new RuntimeException("CPF já cadastrado.");
		}
	}

	private void preencherDadosComuns(PessoaRecordDto dto, Pessoa pessoa) {
		pessoa.setNome(dto.nome());
		pessoa.setCpf(dto.cpf());
		pessoa.setDataNascimento(dto.dataNascimento());
		pessoa.setEmail(dto.email());
		pessoa.setSenha(passwordEncoder.encode(dto.senha()));
		pessoa.setTelefone(dto.telefone());
	}
}
