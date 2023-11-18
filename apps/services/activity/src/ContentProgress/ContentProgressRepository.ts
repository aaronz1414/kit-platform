import { ArticleProgress } from './ArticleProgress';
import { ContentProgress, ContentType } from './ContentProgress';
import { QuizProgress } from './QuizProgress';

export class ContentProgressRepository {
    private allContentProgress: ContentProgress[];

    constructor() {
        this.allContentProgress = [
            new QuizProgress({
                userId: '1',
                contentId: '1',
                startedAt: new Date(),
                lastProgressAt: new Date(),
                latestQuestionId: '2',
            }),
            new ArticleProgress({
                userId: '1',
                contentId: '100',
                startedAt: new Date(),
                lastProgressAt: new Date(),
                percentage: 25,
            }),
            new ArticleProgress({
                userId: '1',
                contentId: '101',
                startedAt: new Date(),
                lastProgressAt: new Date(),
                percentage: 75,
            }),
            new ArticleProgress({
                userId: '1',
                contentId: '102',
                startedAt: new Date(),
                lastProgressAt: new Date(),
                percentage: 100,
                completedAt: new Date(),
            }),
        ];
    }

    add(progress: ContentProgress): void {
        this.allContentProgress.push(progress);
    }

    getOne(
        type: ContentType,
        userId: string,
        contentId: string
    ): ContentProgress | null {
        return (
            this.allContentProgress.find((p) =>
                this.matchesContentProgress(type, userId, contentId, p)
            ) ?? null
        );
    }

    getByUserId(userId: string): ContentProgress[] {
        return this.allContentProgress.filter((p) => p.userId === userId);
    }

    update(progress: ContentProgress): void {
        const index = this.allContentProgress.findIndex((p) =>
            this.matchesContentProgress(
                progress.type,
                progress.userId,
                progress.contentId,
                p
            )
        );
        if (index < 0) {
            throw new Error('No content progress found');
        }

        this.allContentProgress[index] = progress;
    }

    private matchesContentProgress(
        type: ContentType,
        userId: string,
        contentId: string,
        progress: ContentProgress
    ) {
        return (
            progress.type === type &&
            progress.userId === userId &&
            progress.contentId === contentId
        );
    }
}