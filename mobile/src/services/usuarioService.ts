import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../config/db";
import { eq } from "drizzle-orm";
import { usuarioTable } from "../database/schema";
import { getCcpsByVeterinario } from "../utils/ccpsUtils";

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
  ccpsList: any[];
};

// Função de login
export async function login(email: string, senha: string): Promise<Usuario | null> {
  const usuario = await db
    .select()
    .from(usuarioTable)
    .where(eq(usuarioTable.email, email))
    .limit(1);

  if (usuario.length > 0 && usuario[0].senha === senha) {
    const ccpsList = await getCcpsByVeterinario(usuario[0].id);

    const usuarioCompleto: Usuario = {
      id: usuario[0].id,
      nome: usuario[0].nome,
      cpf: usuario[0].cpf,
      crmv: usuario[0].crmv,
      data_nascimento: usuario[0].dataNascimento,
      email: usuario[0].email,
      senha: usuario[0].senha,
      telefone: usuario[0].telefone,
      tipo_usuario: usuario[0].tipoUsuario as "VETERINARIO" | "MAPA",
      ccpsList: ccpsList || [],
    };

    await saveUsuarioLogado(usuarioCompleto.id);
    return usuarioCompleto;
  }

  return null;
}

// Salvar ID do usuário logado
async function saveUsuarioLogado(id: string) {
  await AsyncStorage.setItem("usuario", id);
}

// Função de logout
export async function logout() {
  await AsyncStorage.removeItem("usuario");
}

// Buscar usuário por ID
export async function getUsuarioById(id: string): Promise<Usuario | null> {
  const result = await db
    .select()
    .from(usuarioTable)
    .where(eq(usuarioTable.id, id))
    .limit(1);

  if (result.length === 0) return null;

  const usuario = result[0];

  return {
    id: usuario.id,
    nome: usuario.nome,
    cpf: usuario.cpf || '',
    crmv: usuario.crmv || '',
    data_nascimento: usuario.dataNascimento || '',
    email: usuario.email,
    senha: usuario.senha,
    telefone: usuario.telefone || '',
    tipo_usuario: usuario.tipoUsuario as 'VETERINARIO' | 'MAPA',
    ccpsList: [], // Pode buscar aqui também se quiser completar
  };
}
