package com.br.ccps.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.ccps.records.PessoaRecordDto;
import com.br.ccps.service.PessoaService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private PessoaService pessoaService;

    @PostMapping("/register")
    public ResponseEntity<?> registrarVet(@RequestBody PessoaRecordDto dto) {
        return ResponseEntity.ok(pessoaService.cadastrarVeterinario(dto));
    }

    @PostMapping("/register/admin")
    public ResponseEntity<?> registrarAdmin(@RequestBody PessoaRecordDto dto) {
        return ResponseEntity.ok(pessoaService.cadastrarAdmin(dto));
    }

    @PostMapping("/register/tecnico")
    public ResponseEntity<?> registrarTecnico(@RequestBody PessoaRecordDto dto) {
        return ResponseEntity.ok(pessoaService.cadastrarTecnicoMapa(dto));
    }
}
