import { ArticleProgress } from './ArticleProgress';
import { ContentProgress } from './ContentProgress';
import { QuizProgress } from './QuizProgress';

export { ContentProgressRepository } from './ContentProgressRepository';

export function isQuizProgress(c: ContentProgress): c is QuizProgress {
    return c.type === 'quiz';
}

export function isArticleProgress(c: ContentProgress): c is ArticleProgress {
    return c.type === 'article';
}

export function initializeArticleProgress(args: {
    userId: string;
    articleId: string;
    percentage: number;
}) {
    return new ArticleProgress({
        userId: args.userId,
        contentId: args.articleId,
        percentage: args.percentage,
        startedAt: new Date(),
        lastProgressAt: new Date(),
    });
}

export function initializeQuizProgress(args: {
    userId: string;
    quizId: string;
    latestQuestionId: string;
}) {
    return new QuizProgress({
        userId: args.userId,
        contentId: args.quizId,
        latestQuestionId: args.latestQuestionId,
        startedAt: new Date(),
        lastProgressAt: new Date(),
    });
}
