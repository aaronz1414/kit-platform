import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const dbUser = process.env.DB_USER ?? 'postgres';
const dbPassword = process.env.DB_PASSWORD ?? 'password';
const dbHost = process.env.DB_HOST ?? '127.0.0.1';
const dbPort = process.env.DB_PORT ?? 5432;
const dbName = process.env.DB_NAME ?? 'user_activity';

export const dbClient = postgres(
    `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`,
    { max: 1 }
);

export const db = drizzle(dbClient);
