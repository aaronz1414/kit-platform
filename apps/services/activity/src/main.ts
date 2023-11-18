import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';
import * as fs from 'fs';
import gql from 'graphql-tag';
import * as path from 'path';

// Schema
// ------
const typeDefs = gql(
    fs.readFileSync(
        path.resolve('./dist/apps/services/activity/schema.graphql'),
        {
            encoding: 'utf8',
        }
    )
);

// Resolvers
// ---------
const resolvers = {
    Article: {
        __resolveReference(rep) {
            return {
                id: rep.id,
                testField: 'I am an article',
            };
        },
    },
    Quiz: {
        __resolveReference(rep) {
            return {
                id: rep.id,
                testField: 'I am a quiz',
            };
        },
    },
    Video: {
        __resolveReference(rep) {
            return {
                id: rep.id,
                testField: 'I am a video',
            };
        },
    },
};

const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: parseInt(process.env.ACTIVITY_SERVICE_PORT) || 6130 },
    });

    console.log('Activity server ready at:', url);
})();
