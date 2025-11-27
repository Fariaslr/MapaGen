import { eq } from "drizzle-orm";
import { operacaoTable } from "../database/schema";
import { db } from "../config/db";

export async function getOperacaoByCcpsId(ccpsId: string) {
  const result = await db
    .select()
    .from(operacaoTable)
    .where(eq(operacaoTable.idCcps, ccpsId));
    console.log("Operação encontrada:", result); 

  return result[0]; 
}
