import { eq } from 'drizzle-orm';
import { ccpsTable } from '../database/schema'; 
import { db } from '../config/db';

export async function getCcpsById(id: string) {
  const result = await db.select().from(ccpsTable).where(eq(ccpsTable.id, id));
  return result.length > 0 ? result[0] : null; 
}

export async function createCcps(data: typeof ccpsTable.$inferInsert) {
  await db.insert(ccpsTable).values(data);
  return data.id; 
}


export async function updateCcps(id: string, data: Partial<typeof ccpsTable.$inferInsert>) {
  const existingCcps = await getCcpsById(id);
  if (!existingCcps) {
    throw new Error(`CCPS com ID ${id} não encontrado.`);
  }

  await db.update(ccpsTable).set(data).where(eq(ccpsTable.id, id));
  return { ...existingCcps, ...data }; // Retorna o CCPS atualizado, se desejado
}

