import { eq } from "drizzle-orm";
import { salaTable } from "../database/schema";
import { db } from "../config/db";

export async function atualizarSalaVeterinario(id: string, planta: string, fotos: { foto1: string, foto2: string, foto3: string }, observacao: string) {
  await db
    .update(salaTable)
    .set({
      planta,
      foto1: fotos.foto1,
      foto2: fotos.foto2,
      foto3: fotos.foto3,
      observacaoVeterinario: observacao,
    })
    .where(eq(salaTable.id, id));
}

export async function atualizarSalaMapa(id: string, tipo_Id: string, observacao: string, status: string) {
  await db
    .update(salaTable)
    .set({
      tipoId: tipo_Id,
      observacaoAvaliador: observacao,
      statusValidacao: status,
    })
    .where(eq(salaTable.id, id));
}

export async function listarSalasPorCcps(ccps_Id: string) {
  return await db
    .select()
    .from(salaTable)
    .where(eq(salaTable.ccpsId, ccps_Id));
}

export async function buscarSalaPorId(id: string) {
  const result = await db
    .select()
    .from(salaTable)
    .where(eq(salaTable.id, id));
  return result[0];
}
