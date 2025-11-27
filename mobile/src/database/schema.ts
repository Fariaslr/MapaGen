import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const DATABASE_NAME = "ccps.db";

export const usuarioTable = sqliteTable("usuario", {
  id: text("id").primaryKey(),
  nome: text("nome").notNull(),
  cpf: text("cpf"),
  crmv: text("crmv").unique(),
  dataNascimento: text("data_nascimento"),
  email: text("email").notNull().unique(),
  senha: text("senha").notNull(),
  telefone: text("telefone"),
  tipoUsuario: text("tipo_usuario").notNull(), 
});

export const ccpsTable = sqliteTable("ccps", {
  id: text("id").primaryKey(),
  nomeCcps: text("nome_ccps"),
  cnpj: text("cnpj"),
  cep: text("cep"),
  endereco: text("endereco"),
  cidade: text("cidade"),
  estado: text("estado"),
  veterinarioId: text("veterinario_id").references(() => usuarioTable.id, { onDelete: "set null" }),
  codigoAprovado: text("codigo_aprovado").unique(),
  dataValidade: text("data_validade"),
});

export const tipoTable = sqliteTable("tipo", {
  id: text("id").primaryKey(),
  nomeTipo: text("nome_tipo"),
});

export const salaTable = sqliteTable("sala", {
  id: text("id").primaryKey(),
  ccpsId: text("ccps_id").notNull().references(() => ccpsTable.id, { onDelete: "cascade" }),
  tipoId: text("tipo_id").notNull().references(() => tipoTable.id, { onDelete: "cascade" }),
  planta: text("planta"),
  foto1: text("foto1"),
  foto2: text("foto2"),
  foto3: text("foto3"),
  observacaoVeterinario: text("observacao_veterinario"),
  observacaoAvaliador: text("observacao_avaliador"),
  statusValidacao: text("status_validacao").notNull(),
  dataUltimaValidacao: text("data_ultima_validacao"),
  codigoAprovado: text("codigo_aprovado").unique(),
});

export const operacaoTable = sqliteTable("operacao", {
  id: text("id").primaryKey(),
  idCcps: text("id_ccps").notNull().references(() => ccpsTable.id, { onDelete: "cascade" }),

  cercaPerimetralDataAprovacao: text("cerca_perimetral_data_aprovacao"),
  cercaPerimetralValidado: integer("cerca_perimetral_validado"),
  localizacaoLivreAlagamentoDataAprovacao: text("localizacao_livre_alagamento_data_aprovacao"),
  localizacaoLivreAlagamentoValidado: integer("localizacao_livre_alagamento_validado"),
  salaManipulacaoSemenDataAprovacao: text("sala_manipulacao_semen_data_aprovacao"),
  salaManipulacaoSemenValidado: integer("sala_manipulacao_semen_validado"),
  salaLavagemEsterilizacaoDataAprovacao: text("sala_lavagem_esterilizacao_data_aprovacao"),
  salaLavagemEsterilizacaoValidado: integer("sala_lavagem_esterilizacao_validado"),
  areaColetaSemenDataAprovacao: text("area_coleta_semen_data_aprovacao"),
  areaColetaSemenValidado: integer("area_coleta_semen_validado"),
  alojamentoDadoresDataAprovacao: text("alojamento_dadores_data_aprovacao"),
  alojamentoDadoresValidado: integer("alojamento_dadores_validado"),
  instalacaoAdministrativaDataAprovacao: text("instalacao_administrativa_data_aprovacao"),
  instalacaoAdministrativaValidado: integer("instalacao_administrativa_validado"),
  vestiariosBanheirosDataAprovacao: text("vestiarios_banheiros_data_aprovacao"),
  vestiariosBanheirosValidado: integer("vestiarios_banheiros_validado"),
  armazenamentoSemenDataAprovacao: text("armazenamento_semen_data_aprovacao"),
  armazenamentoSemenValidado: integer("armazenamento_semen_validado"),

  dataUltimaAtualizacao: text("data_ultima_atualizacao"),
});