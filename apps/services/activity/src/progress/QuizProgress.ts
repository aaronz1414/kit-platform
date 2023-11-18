import { ContentProgress, ContentProgressData } from './ContentProgress';

type QuizProgressData = {
    latestQuestionId: string;
};

export class QuizProgress extends ContentProgress {
    private _latestQuestionId: string;

    constructor(args: QuizProgressData & ContentProgressData) {
        super(args);
        this._latestQuestionId = args.latestQuestionId;
    }

    get latestQuestionId() {
        return this._latestQuestionId;
    }
    get type() {
        return 'quiz' as const;
    }

    toJson() {
        return {
            ...super.toJson(),
            latestQuestionId: this._latestQuestionId,
        };
    }
}
