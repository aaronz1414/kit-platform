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

    updateLatestQuestion(latestQuestionId: string) {
        this.recordProgress();
        this._latestQuestionId = latestQuestionId;
    }

    toJson() {
        return {
            ...super.toJson(),
            latestQuestionId: this._latestQuestionId,
        };
    }
}
