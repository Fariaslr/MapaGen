package com.br.ccps.service;

import com.br.ccps.model.Veterinario;
import com.br.ccps.records.VeterinarioRecordDto;
import com.br.ccps.repos.VeterinarioRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VeterinarioService {

    @Autowired
    private VeterinarioRepository veterinarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public Veterinario adicionarVeterinario(VeterinarioRecordDto dto) {
        if (veterinarioRepository.existsByCrmv(dto.crmv())) {
            throw new IllegalArgumentException("CRMV já cadastrado");
        }
        if (veterinarioRepository.existsByEmail(dto.email())) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        Veterinario vet = new Veterinario();
        vet.setNome(dto.nome());
        vet.setEmail(dto.email());
        vet.setCpf(dto.cpf());
        vet.setCrmv(dto.crmv());
        vet.setUfCrmv(dto.ufCrmv());
        vet.setTelefone(dto.telefone());

        vet.setSenha(passwordEncoder.encode(dto.senha()));
        return veterinarioRepository.save(vet);
    }

    public List<Veterinario> listarTodosVeterinarios() {
        return veterinarioRepository.findAll();
    }

    public Veterinario buscarVeterinarioPorId(UUID id) {
        return veterinarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Veterinário não encontrado"));
    }

    @Transactional
    public Veterinario atualizarVeterinario(UUID id, VeterinarioRecordDto dto) {
        Veterinario existente = buscarVeterinarioPorId(id);        
        existente.setNome(dto.nome());
        existente.setTelefone(dto.telefone());
        return veterinarioRepository.save(existente);
    }

    public void deletarVeterinario(UUID id) {
        veterinarioRepository.deleteById(id);
    }
}
