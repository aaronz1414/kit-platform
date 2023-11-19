import { ArticleProgress } from './ArticleProgress';
import { ContentProgress, ContentType } from './ContentProgress';
import { QuizProgress } from './QuizProgress';
import { db } from '../../../../../libs/db';
import {
    ContentProgressRow,
    content_progress,
} from '../../../../../libs/databaseSchema';
import { and, eq } from 'drizzle-orm';

export class ContentProgressRepository {
    async add(progress: ContentProgress): Promise<ContentProgress> {
        await db.insert(content_progress).values(progress.toJson()).returning();
        return progress;
    }

    async getOne(
        type: ContentType,
        userId: string,
        contentId: string
    ): Promise<ContentProgress | null> {
        const queryResult = await db
            .select()
            .from(content_progress)
            .where(this.getPrimaryKeyFilter(type, userId, contentId));
        const row = queryResult[0];

        return row ? this.createContentProgress(row) : null;
    }

    async getByUserId(userId: string): Promise<ContentProgress[]> {
        const rows = await db
            .select()
            .from(content_progress)
            .where(eq(content_progress.userId, userId));
        return rows.map((r) => this.createContentProgress(r));
    }

    async update(progress: ContentProgress): Promise<ContentProgress> {
        const queryResult = await db
            .update(content_progress)
            .set(progress.toJson())
            .where(
                this.getPrimaryKeyFilter(
                    progress.type,
                    progress.userId,
                    progress.contentId
                )
            )
            .returning();
        const row = queryResult[0];
        if (!row) {
            throw new Error('Update failed');
        }

        return this.createContentProgress(row);
    }

    private createContentProgress(row: ContentProgressRow) {
        switch (row.type) {
            case 'article':
                return new ArticleProgress(row);
            case 'quiz':
                return new QuizProgress(row);
            default:
                throw new Error('Invalid Row');
        }
    }

    private getPrimaryKeyFilter(
        type: ContentType,
        userId: string,
        contentId: string
    ) {
        return and(
            eq(content_progress.userId, userId),
            eq(content_progress.type, type),
            eq(content_progress.contentId, contentId)
        );
    }
}
