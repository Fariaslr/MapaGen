package com.br.ccps.records;

import java.time.LocalDate;

public record PessoaRecordDto(
    String nome,
    String crmv,
    String cpf,
    LocalDate dataNascimento,
    String email,
    String senha,
    String telefone
) {}
