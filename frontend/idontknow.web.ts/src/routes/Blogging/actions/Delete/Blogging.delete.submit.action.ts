import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';
import { BloggingService } from '../../../../api/Blogging.api';

const actionCreator = actionCreatorFactory();
const type = 'BLOGGING/DELETE/SUBMIT';
export const asyncActions = actionCreator.async<{confirmLoading: boolean}, {}, {}>(type);

export default function submitForm(cb: Function) {
    return async (dispatch: Dispatch<{}>, getState: {}) => {
        dispatch(asyncActions.started({confirmLoading: true}));
        await new BloggingService().remove(-1);
        dispatch(asyncActions.done({ params: {confirmLoading: false}, result: {} }));
    };
}