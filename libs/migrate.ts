import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, dbClient } from './db';

async function run() {
    // Not an ideal solution, but sleeps a few seconds to give the postgres
    // service time to start up
    await sleep(3000);

    await migrate(db, {
        migrationsFolder: './migrations',
    });

    await dbClient.end();
}

async function sleep(ms) {
    return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}

run().catch((error) => {
    console.log(error);
});
