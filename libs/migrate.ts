import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, dbClient } from './db';

async function run() {
    await migrate(db, {
        migrationsFolder: './migrations',
    });

    await dbClient.end();
}

run().catch((error) => {
    console.log(error);
});
