import { ContentProgress, ContentProgressData } from './ContentProgress';

type ArticleProgressData = {
    percentage: number;
};

export class ArticleProgress extends ContentProgress {
    private _percentage: number;

    constructor(args: ArticleProgressData & ContentProgressData) {
        super(args);
        this._percentage = args.percentage;
    }

    get percentage() {
        return this._percentage;
    }
    get type() {
        return 'article' as const;
    }

    toJson() {
        return {
            ...super.toJson(),
            percentage: this._percentage,
        };
    }
}
