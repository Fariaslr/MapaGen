import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { SQLiteTable } from "drizzle-orm/sqlite-core";
import { openDatabaseSync } from "expo-sqlite";
import { DATABASE_NAME } from "./schema";

const DZSQLiteConnect = (dbname: string) => {
  const db = openDatabaseSync(dbname);
  return drizzle(db);
};

export async function DZSQLiteInsert<T extends {}>(
  table: SQLiteTable,
  data: T,
  dbname: string = DATABASE_NAME
) {
  const conn = DZSQLiteConnect(dbname);
  await conn.insert(table).values(data).run();
}

export async function DZSQLiteSelect<T extends {}>(
  table: SQLiteTable,
  dbname: string = DATABASE_NAME
): Promise<T[]> {
  const conn = DZSQLiteConnect(dbname);
  const result = await conn.select().from(table).all();
  return result as T[];
}

export async function DZSQLiteUpdate<T extends {}>(
  table: SQLiteTable,
  {
    set,
    where,
    dbname = DATABASE_NAME,
  }: {
    set: Partial<T>;
    where: ReturnType<typeof eq>;
    dbname?: string;
  }
) {
  const conn = DZSQLiteConnect(dbname);
  await conn.update(table).set(set).where(where).run();
}

export async function DZSQLiteDelete(
  table: SQLiteTable,
  {
    where,
    dbname = DATABASE_NAME,
  }: {
    where: ReturnType<typeof eq>;
    dbname?: string;
  }
) {
  const conn = DZSQLiteConnect(dbname);
  await conn.delete(table).where(where).run();
}