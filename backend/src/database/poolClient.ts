import { Pool as PgPool, PoolConfig } from 'pg';

const pool = ():PgPool => {
  const opt:PoolConfig = {
    connectionString: process.env.DATABASE_URL,
  };

  return new PgPool(opt);
};

export default pool;
