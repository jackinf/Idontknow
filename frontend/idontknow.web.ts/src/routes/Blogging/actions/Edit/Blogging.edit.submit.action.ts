import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';
import { blogEditComponentFormName } from '../../components/Edit/Blogging.edit.component';
import { BloggingService } from '../../../../api/Blogging.api';

const actionCreator = actionCreatorFactory();
const type = 'BLOGGING/EDIT/SUBMIT';
export const asyncActions = actionCreator.async<{confirmLoading: boolean}, {}, {}>(type);

export default function submitForm(cb: Function) {
    return async (dispatch: Dispatch<{}>, getState: Function) => {
        let formValues = getState().form[blogEditComponentFormName].values;
        console.log(formValues);

        dispatch(asyncActions.started({confirmLoading: true}));
        await new BloggingService().update(-1, formValues);
        dispatch(asyncActions.done({ params: {confirmLoading: false}, result: {} }));
    };
}