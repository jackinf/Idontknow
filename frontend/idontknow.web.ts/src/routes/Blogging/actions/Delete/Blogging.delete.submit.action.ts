import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';

const actionCreator = actionCreatorFactory();
const type = 'BLOGGING/DELETE/SUBMIT';
export const asyncActions = actionCreator.async<{confirmLoading: boolean}, {}, {}>(type);

export default function submitForm(cb: Function) {
    return (dispatch: Dispatch<{}>, getState: {}) => {
        dispatch(asyncActions.started({confirmLoading: true}));

        setTimeout(() => {
            dispatch(asyncActions.done({ params: {confirmLoading: false}, result: {} }));
            cb();
        },         500);
    };
}