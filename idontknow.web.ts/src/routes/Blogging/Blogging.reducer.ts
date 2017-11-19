export class BlogModel {
    key: number;
    title: string;
    rating: number;
}
export interface BloggingReducerState {
    dataSource: Array<BlogModel>;
    count: number;
}
const testData = [
    {key: 1, title: 'one', rating: 5},
    {key: 2, title: 'two', rating: 2},
    {key: 3, title: 'three', rating: 6},
    {key: 4, title: 'four', rating: 3},
    {key: 5, title: 'five', rating: 1},
    {key: 6, title: 'fix', rating: 8}
];
const defaultState: BloggingReducerState = {dataSource: testData, count: 0};
export default (state: BloggingReducerState = defaultState, action: any) => {
    switch (action.type) {
        default:
            return state;
    }
}