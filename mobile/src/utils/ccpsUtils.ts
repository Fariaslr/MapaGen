import { db } from "../config/db";
import { eq } from "drizzle-orm";
import { ccpsTable } from "../database/schema"

export async function getCcpsByVeterinario(veterinarioId: string): Promise<any[]> {
  const ccpsListRaw = await db
    .select()
    .from(ccpsTable)
    .where(eq(ccpsTable.veterinarioId, veterinarioId));

  const ccpsList = ccpsListRaw.map((ccps) => ({
    id: ccps.id,
    nomeCcps: ccps.nomeCcps || '',
    cnpj: ccps.cnpj || '',
    cep: ccps.cep || '',
    endereco: ccps.endereco || '',
    cidade: ccps.cidade || '',
    estado: ccps.estado || '',
    codigoAprovado: ccps.codigoAprovado || '',
    dataValidade: ccps.dataValidade || '',
  }));

  return ccpsList;
}
