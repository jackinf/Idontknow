import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';
import { REDUCER_KEY__BLOGGING } from '../index';
import { BlogModel } from '../Blogging.models';

const actionCreator = actionCreatorFactory();
const type = 'BLOGGING/FETCH';
export const asyncActions = actionCreator.async<{loading: boolean}, {}, {data: BlogModel[], pagination: {}}>(type);

export default function fetchAsync() {
    return (dispatch: Dispatch<{}>, getState: Function) => {
        const state = getState();
        const currentState = state[REDUCER_KEY__BLOGGING];

        asyncActions.started({loading: true});

        try {
            // Here goes real action
            const pagination = {total: 200, ...currentState.pagination};
            asyncActions.done({params: {loading: false}, result: { data: [], pagination }});
        } catch (error) {
            asyncActions.failed({params: {loading: false}, error: error});
        }
    };
}