export interface RandomUserMeResponse {
    results: TestPersonModel[];
}

export interface TestPersonModel {
    name: { first: string; last: string; title: string };
    gender: string;
    email: string;
    registered: string;
}

export class BlogModel {
    key: string;
    title: string;
    rating: number;
}

export interface BloggingReducerState {
    dataSource: Array<BlogModel>;
    count: number;
}