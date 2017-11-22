export interface RandomUserMeResponse {
    results: BlogModel[];
}

export class BlogModel {
    key: string;
    title: string;
    rating: number;
}

export interface BloggingReducerState {
    data: BlogModel[];
    count: number;
}