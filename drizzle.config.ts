import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
    schema: './libs/databaseSchema.ts',
    out: './migrations',
    driver: 'pg',
    dbCredentials: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres',
        database: 'user_activity',
    },
} satisfies Config;
