import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';
import { login } from '@kit-platform/user-access';
import * as fs from 'fs';
import gql from 'graphql-tag';
import { GraphQLScalarType, Kind } from 'graphql';
import * as path from 'path';
import {
    ContentProgressRepository,
    initializeArticleProgress,
    initializeQuizProgress,
    isArticleProgress,
    isQuizProgress,
} from './ContentProgress';

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

const contentProgressRepository = new ContentProgressRepository();

// Resolvers
// ---------
const dateTime = new GraphQLScalarType({
    name: 'DateTime',
    description: 'Custom scalar type representing an ISO datestring',
    serialize(value: Date) {
        return value.toISOString();
    },
    parseValue(value: string) {
        return new Date(value);
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value);
        }
        return null;
    },
});

const resolvers = {
    DateTime: dateTime,
    Query: {
        myHistory: async (parent, args, { user }) => {
            const history = await contentProgressRepository.getByUserId(
                user.id
            );
            return history
                .sort(
                    (a, b) =>
                        b.lastProgressAt.getTime() - a.lastProgressAt.getTime()
                )
                .map((p) => p.toJson());
        },
    },
    Mutation: {
        async recordArticleProgress(
            _,
            {
                input: { articleId, percentage },
            }: { input: { articleId: string; percentage: number } },
            { user }
        ) {
            let progress = await contentProgressRepository.getOne(
                'article',
                '1',
                articleId
            );

            if (!progress) {
                const newContentProgress = initializeArticleProgress({
                    articleId,
                    userId: user.id,
                    percentage,
                });
                progress = await contentProgressRepository.add(
                    newContentProgress
                );
            } else if (!isArticleProgress(progress)) {
                return null;
            } else {
                progress.updatePercentage(percentage);
                progress = await contentProgressRepository.update(progress);
            }

            return {
                progress: progress.toJson(),
            };
        },
        async recordQuizProgress(
            _,
            {
                input: { quizId, latestQuestionId },
            }: { input: { quizId: string; latestQuestionId: string } },
            { user }
        ) {
            let progress = await contentProgressRepository.getOne(
                'quiz',
                user.id,
                quizId
            );

            if (!progress) {
                const newContentProgress = initializeQuizProgress({
                    quizId,
                    userId: user.id,
                    latestQuestionId,
                });
                progress = await contentProgressRepository.add(
                    newContentProgress
                );
            } else if (!isQuizProgress(progress)) {
                return null;
            } else {
                progress.updateLatestQuestion(latestQuestionId);
                progress = await contentProgressRepository.update(progress);
            }

            return {
                progress: progress.toJson(),
            };
        },
    },
    ContentProgress: {
        __resolveType(contentProgress) {
            if (contentProgress.type === 'article') return 'ArticleProgress';
            else if (contentProgress.type === 'quiz') return 'QuizProgress';
            return null;
        },
    },
    Article: {
        async __resolveReference(rep, { user }) {
            return {
                id: rep.id,
                myProgress: (
                    await contentProgressRepository.getOne(
                        'article',
                        user.id,
                        rep.id
                    )
                ).toJson(),
            };
        },
    },
    Quiz: {
        async __resolveReference(rep, { user }) {
            const progress = await contentProgressRepository.getOne(
                'quiz',
                user.id,
                rep.id
            );
            if (!isQuizProgress(progress)) {
                return null;
            }

            return {
                id: rep.id,
                myProgress: {
                    ...progress.toJson(),
                    latestQuestion: {
                        id: progress.latestQuestionId,
                    },
                },
            };
        },
    },
    QuizProgress: {
        latestQuestion: (parent) => ({ id: parent.latestQuestionId }),
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
        context: async ({ req }) => {
            // TODO: Parse user id from headers - for example, a user jwt
            // attached by a gateway that uses a session id from a cookie
            // to grab the user profile
            const user = { id: 1 };
            return { user };
        },
    });

    console.log('Activity server ready at:', url);
})();
