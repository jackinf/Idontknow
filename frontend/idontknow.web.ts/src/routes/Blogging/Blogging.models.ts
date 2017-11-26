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
    loading: boolean;
    confirmLoading: boolean;
    pagination: { total: number, current: number, pageSize: number };
    createInProgress: boolean;
    editInProgress: boolean;
    deleteInProgress: boolean;
}