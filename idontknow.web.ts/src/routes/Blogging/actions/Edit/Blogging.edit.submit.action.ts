import actionCreatorFactory from 'typescript-fsa';
import {Dispatch} from "redux";
import {blogEditComponentFormName} from "../../components/Edit/Blogging.edit.component";

const actionCreator = actionCreatorFactory();
const type = "BLOGGING/EDIT/SUBMIT";
export const asyncActions = actionCreator.async<{confirmLoading: boolean}, {}, {}>(type);

export default function submitForm(cb: Function) {
    return (dispatch: Dispatch<any>, getState: any) => {
        let formValues = getState().form[blogEditComponentFormName].values;
        console.log(formValues);

        dispatch(asyncActions.started({confirmLoading: true}));

        setTimeout(() => {
            dispatch(asyncActions.done({ params: {confirmLoading: false}, result: {} }));
            cb();
        }, 500);
    }
}