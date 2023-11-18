type ArticleProgressData = {
    userId: string;
    articleId: string;
    startedAt: Date;
    lastProgressAt: Date;
    completedAt?: Date | null;
    percentage: number;
};

export class ArticleProgress {
    private _userId: string;
    private _articleId: string;
    private _startedAt: Date;
    private _lastProgressAt: Date;
    private _completedAt: Date | null;
    private _percentage: number;

    constructor(args: ArticleProgressData) {
        this._userId = args.userId;
        this._articleId = args.articleId;
        this._startedAt = args.startedAt;
        this._lastProgressAt = args.lastProgressAt;
        this._completedAt = args.completedAt ?? null;
        this._percentage = args.percentage;
    }

    get userId() {
        return this._userId;
    }
    get articleId() {
        return this._articleId;
    }
    get startedAt() {
        return this._startedAt;
    }
    get lastProgressAt() {
        return this._lastProgressAt;
    }
    get completedAt() {
        return this._completedAt;
    }
    get percentage() {
        return this._percentage;
    }
}
