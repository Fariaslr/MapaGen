package com.br.ccps.controller;

import com.br.ccps.model.Veterinario;
import com.br.ccps.records.PessoaRecordDto;
import com.br.ccps.service.VeterinarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/veterinarios")
public class VeterinarioController {

    @Autowired
    private VeterinarioService veterinarioService;

    @PostMapping
    public ResponseEntity<Veterinario> adicionar(@RequestBody PessoaRecordDto dto) {
        Veterinario novoVeterinario = veterinarioService.adicionarVeterinario(dto);
        return ResponseEntity.ok(novoVeterinario);
    }

    @GetMapping
    public ResponseEntity<List<Veterinario>> listarTodos() {
        return ResponseEntity.ok(veterinarioService.listarTodosVeterinarios());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Veterinario> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(veterinarioService.buscarVeterinarioPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Veterinario> atualizar(@PathVariable UUID id, @RequestBody PessoaRecordDto dto) {
        return ResponseEntity.ok(veterinarioService.atualizarVeterinario(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        veterinarioService.deletarVeterinario(id);
        return ResponseEntity.noContent().build();
    }
}
