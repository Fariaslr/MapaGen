import { Ccps } from "./Ccps";

  export type Usuario = {
    id: string;
    nome: string;
    cpf?: string | null;
    crmv?: string | null;
    data_nascimento?: string | null;
    email: string;
    senha: string;
    telefone?: string | null;
    tipo_usuario: "VETERINARIO" | "MAPA"; 
    ccpsList: Ccps[];
  };