import { ArticleProgress } from './ArticleProgress';

export class ArticleProgressRepository {
    private articleProgress: ArticleProgress[];

    constructor() {
        this.articleProgress = [
            new ArticleProgress({
                userId: '1',
                articleId: '100',
                startedAt: new Date(),
                lastProgressAt: new Date(),
                percentage: 25,
            }),
            new ArticleProgress({
                userId: '1',
                articleId: '101',
                startedAt: new Date(),
                lastProgressAt: new Date(),
                percentage: 75,
            }),
            new ArticleProgress({
                userId: '1',
                articleId: '102',
                startedAt: new Date(),
                lastProgressAt: new Date(),
                percentage: 100,
                completedAt: new Date(),
            }),
        ];
    }

    add(articleProgress: ArticleProgress): void {
        this.articleProgress.push(articleProgress);
    }

    getOne(userId: string, articleId: string): ArticleProgress | null {
        return (
            this.articleProgress.find(
                (a) => a.userId === userId && a.articleId === articleId
            ) ?? null
        );
    }

    getAll(): ArticleProgress[] {
        return [...this.articleProgress];
    }

    update(progress: ArticleProgress): void {
        const index = this.articleProgress.findIndex(
            (a) =>
                a.userId === progress.userId &&
                a.articleId === progress.articleId
        );
        if (!index) {
            throw new Error('No article found');
        }

        this.articleProgress[index] = progress;
    }

    remove(userId: string, articleId: string): void {
        const index = this.articleProgress.findIndex(
            (a) => a.userId === userId && a.articleId === articleId
        );
        if (!index) {
            throw new Error('No article found');
        }
        this.articleProgress.splice(index, 1);
    }
}
