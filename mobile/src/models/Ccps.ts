import { Usuario } from "./Usuario";

export interface Ccps {
  id: string;
  nomeCcps: string;
  cnpj: string;
  cep: string;
  endereco: string;
  cidade: string;
  estado: string;
  veterinario: Usuario; // A propriedade veterinario deve ser do tipo Usuario
  codigoAprovado: string;
  dataValidade: string;
}
