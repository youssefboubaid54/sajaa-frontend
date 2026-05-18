import { Pool, PoolClient } from "pg";

const DATABASE_URL = process.env.DATABASE_URL;

const globalPool = globalThis as typeof globalThis & { __pgPool?: Pool };

function getPool(): Pool {
  if (!DATABASE_URL) {
    throw new Error(
      "[db] DATABASE_URL is not set. " +
      "Add DATABASE_URL=postgresql://user:pass@host:5432/dbname to .env.local"
    );
  }

  if (!globalPool.__pgPool) {
    globalPool.__pgPool = new Pool({
      connectionString: DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });

    globalPool.__pgPool.on("error", (err) => {
      console.error("[db] Pool background error:", err.message);
    });

    console.log(
      `[db] Pool created → ${DATABASE_URL.replace(/\/\/.*@/, "//***@")}`
    );
  }
  return globalPool.__pgPool;
}

export async function withTransaction<T>(
  fn: (client: PoolClient) => Promise<T>
): Promise<T> {
  let pool: Pool;
  try {
    pool = getPool();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[db] Cannot get pool:", msg);
    throw new Error(`Database not configured: ${msg}`);
  }

  let client: PoolClient;
  try {
    client = await pool.connect();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[db] Connection failed:", msg);
    throw new Error(
      `Cannot connect to PostgreSQL. ` +
      `Verify DATABASE_URL is reachable. Error: ${msg}`
    );
  }

  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    throw err;
  } finally {
    client.release();
  }
}
