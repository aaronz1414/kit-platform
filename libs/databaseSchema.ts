import {
    integer,
    pgEnum,
    pgTable,
    primaryKey,
    text,
    timestamp,
} from 'drizzle-orm/pg-core';

export const contentTypeEnum = pgEnum('content_type', [
    'article',
    'quiz',
    'video',
]);

export type ContentProgressRow = typeof content_progress.$inferSelect;

export const content_progress = pgTable(
    'content_progress',
    {
        userId: text('user_id').notNull(),
        contentId: text('content_id').notNull(),
        type: contentTypeEnum('type').notNull(),
        startedAt: timestamp('started_at', { withTimezone: true }).notNull(),
        lastProgressAt: timestamp('last_progress_at', {
            withTimezone: true,
        }).notNull(),
        completedAt: timestamp('completed_at', { withTimezone: true }),
        percentage: integer('percentage'),
        latestQuestionId: text('latest_question_id'),
    },
    (table) => {
        return {
            pk: primaryKey({
                columns: [table.userId, table.type, table.contentId],
            }),
        };
    }
);
