import { DemoTableReducerState } from './DemoTable.models';

const defaultState: DemoTableReducerState = {count: 0};
export default (state: DemoTableReducerState = defaultState, action: any) => {
    switch (action.type) {
        default:
            return state;
    }
};