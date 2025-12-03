package com.br.ccps.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.ccps.model.Pessoa;
import com.br.ccps.records.PessoaRecordDto;
import com.br.ccps.service.PessoaService;

@RestController
@RequestMapping("/public")
@CrossOrigin(origins = "http://localhost:5173")
public class PessoaController {
	
	PessoaService pessoaService;
	
	@PostMapping("/cadastro")
	public ResponseEntity<?> cadastrar(@RequestBody PessoaRecordDto dto) {
	    Pessoa novaPessoa = pessoaService.cadastrar(dto);
	    return ResponseEntity.status(HttpStatus.CREATED).body(novaPessoa);
	}


}
