import { Ccps } from "./Ccps";
import { Tipo } from "./Tipo";

export interface Sala {
    id: string;
    ccps: Ccps;
    tipo: Tipo; 
    planta: string;
    foto1: string;
    foto2: string;
    foto3: string;
    observacaoVeterinario: string;
    observacaoAvaliador: string;
    statusValidacao: 'SUBMETIDO' | 'EM_AVALIACAO' | 'EM_DILIGENCIA' | 'APROVADO' | 'REPROVADO';
    dataUltimaValidacao: string;
    codigoAprovado: string;
  }