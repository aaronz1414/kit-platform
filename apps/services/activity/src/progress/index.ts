import { ContentProgress } from './ContentProgress';
import { QuizProgress } from './QuizProgress';

export { ArticleProgress } from './ArticleProgress';
export { QuizProgress } from './QuizProgress';
export * from './ContentProgress';
export * from './ContentProgressRepository';

export function isQuizProgress(c: ContentProgress): c is QuizProgress {
    return c.type === 'quiz';
}
