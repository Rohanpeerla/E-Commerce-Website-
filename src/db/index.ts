import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
  __arenaNextJsDrizzleDb?: NodePgDatabase<typeof schema>;
};

export function getPool(): Pool {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is required. Please set the DATABASE_URL environment variable in your Vercel project settings or .env file."
    );
  }

  if (!globalForDb.__arenaNextJsPostgresqlPool) {
    const isLocal =
      databaseUrl.includes("localhost") || databaseUrl.includes("127.0.0.1");

    globalForDb.__arenaNextJsPostgresqlPool = new Pool({
      connectionString: databaseUrl,
      ssl: isLocal ? false : { rejectUnauthorized: false },
    });
  }

  return globalForDb.__arenaNextJsPostgresqlPool;
}

export function getDb(): NodePgDatabase<typeof schema> {
  if (!globalForDb.__arenaNextJsDrizzleDb) {
    const p = getPool();
    globalForDb.__arenaNextJsDrizzleDb = drizzle(p, { schema });
  }
  return globalForDb.__arenaNextJsDrizzleDb;
}

// Proxies delay database initialization until actual queries run.
// This prevents `next build` from failing when DATABASE_URL is not yet configured during build.
export const pool = new Proxy({} as Pool, {
  get(_target, prop) {
    const p = getPool();
    const value = (p as any)[prop];
    return typeof value === "function" ? value.bind(p) : value;
  },
});

export const db = new Proxy({} as NodePgDatabase<typeof schema>, {
  get(_target, prop) {
    const d = getDb();
    const value = (d as any)[prop];
    return typeof value === "function" ? value.bind(d) : value;
  },
});

