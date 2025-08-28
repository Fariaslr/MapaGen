// Enums
export const StatusValidacao = {
  PENDENTE: 'PENDENTE',
  APROVADO: 'APROVADO',
  REJEITADO: 'REJEITADO',
  EM_DELIGENCIA: 'EM_DELIGENCIA'
};

// Tipos baseados nos modelos Java
export const createCcps = () => ({
  id: null,
  nome: '',
  cnpj: '',
  cep: '',
  endereco: '',
  cidade: '',
  estado: '',
  veterinario: null,
  codigoAprovado: '',
  dataValidade: null
});

export const createVeterinario = () => ({
  id: null,
  nome: '',
  crmv: '',
  cpf: '',
  dataNascimento: null,
  email: '',
  telefone: '',
  ccpsList: []
});

export const createTipo = () => ({
  id: null,
  nomeTipo: ''
});

export const createSala = () => ({
  id: null,
  ccps: null,
  tipo: null,
  planta: '',
  foto1: '',
  foto2: '',
  foto3: '',
  observacaoVeterinario: '',
  observacaoAvaliador: '',
  statusValidacao: StatusValidacao.PENDENTE,
  dataUltimaValidacao: null,
  codigoAprovado: ''
});

export const createOperacao = () => ({
  id: null,
  ccps: null,
  arquivosProcessosTecnologicos: false,
  dataAprovacaoArquivos: null,
  fluxoOperacionalDefinido: false,
  dataAprovacaoFluxo: null,
  medidasHigienicoSanitariasFuncionarios: false,
  dataAprovacaoHigieneFunc: null,
  medidasHigienicoSanitariasVisitantes: false,
  dataAprovacaoHigieneVisit: null,
  controlePragas: false,
  dataAprovacaoControlePragas: null,
  sistemaEscoamento: false,
  dataAprovacaoEscoamento: null
});

