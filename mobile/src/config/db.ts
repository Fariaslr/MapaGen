import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';
import { operacaoTable } from '../database/schema';

const sqliteDb = SQLite.openDatabaseSync('ccps.db'); 

export const db = drizzle(sqliteDb, { schema: { operacaoTable } });
