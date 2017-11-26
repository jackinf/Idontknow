import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';
import { blogCreateComponentFormName } from '../../components/Create/Blogging.create.component';
import { BloggingService } from '../../../../api/Blogging.api';

const actionCreator = actionCreatorFactory();
const type = 'BLOGGING/CREATE/SUBMIT';
export const asyncActions = actionCreator.async<{confirmLoading: boolean}, {}, {}>(type);

export default function submitForm(cb: Function) {
    return async (dispatch: Dispatch<{}>, getState: Function) => {
        let formValues = getState().form[blogCreateComponentFormName].values;
        console.log(formValues);

        dispatch(asyncActions.started({confirmLoading: true}));
        await new BloggingService().add(formValues);
        dispatch(asyncActions.done({ params: {confirmLoading: false}, result: {} }));
    };
}