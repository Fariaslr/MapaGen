export interface Operacao {
  id: string;
  idCcps: string;

  cercaPerimetralDataAprovacao: string | null;
  cercaPerimetralValidado: boolean;

  localizacaoLivreAlagamentoDataAprovacao: string | null;
  localizacaoLivreAlagamentoValidado: boolean;

  salaManipulacaoSemenDataAprovacao: string | null;
  salaManipulacaoSemenValidado: boolean;

  salaLavagemEsterilizacaoDataAprovacao: string | null;
  salaLavagemEsterilizacaoValidado: boolean;

  areaColetaSemenDataAprovacao: string | null;
  areaColetaSemenValidado: boolean;

  alojamentoDadoresDataAprovacao: string | null;
  alojamentoDadoresValidado: boolean;

  instalacaoAdministrativaDataAprovacao: string | null;
  instalacaoAdministrativaValidado: boolean;

  vestiariosBanheirosDataAprovacao: string | null;
  vestiariosBanheirosValidado: boolean;

  armazenamentoSemenDataAprovacao: string | null;
  armazenamentoSemenValidado: boolean;

  dataUltimaAtualizacao: string | null;
}
