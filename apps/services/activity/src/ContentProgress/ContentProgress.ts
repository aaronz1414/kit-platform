export type ContentType = 'article' | 'quiz' | 'video';

export type ContentProgressData = {
    userId: string;
    contentId: string;
    startedAt: Date;
    lastProgressAt: Date;
    completedAt?: Date | null;
};

export abstract class ContentProgress {
    private _userId: string;
    private _contentId: string;
    protected _startedAt: Date;
    protected _lastProgressAt: Date;
    protected _completedAt: Date | null;

    constructor(args: ContentProgressData) {
        this._userId = args.userId;
        this._contentId = args.contentId;
        this._startedAt = args.startedAt;
        this._lastProgressAt = args.lastProgressAt;
        this._completedAt = args.completedAt ?? null;
    }

    get userId() {
        return this._userId;
    }
    get contentId() {
        return this._contentId;
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

    abstract get type(): ContentType;

    protected recordProgress() {
        this._lastProgressAt = new Date();
    }

    protected recordCompletion() {
        this._completedAt = new Date();
    }

    toJson() {
        return {
            userId: this._userId,
            contentId: this._contentId,
            startedAt: this._startedAt,
            lastProgressAt: this._lastProgressAt,
            completedAt: this._completedAt,
            type: this.type,
        };
    }
}
