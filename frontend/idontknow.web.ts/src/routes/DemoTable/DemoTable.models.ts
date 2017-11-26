export interface RandomUserMeResponse {
    results: TestPersonModel[];
}

export interface TestPersonModel {
    name: { first: string; last: string; title: string };
    gender: string;
    email: string;
    registered: string;
}

export interface DemoTableReducerState {
    count: number;
}