import actionCreatorFactory from 'typescript-fsa';
import {Dispatch} from "redux";
import {blogCreateComponentFormName} from "../Create/Blogging.create.component";

const actionCreator = actionCreatorFactory();
const type = "BLOGGING/CREATE/SUBMIT";
export const asyncActions = actionCreator.async<{confirmLoading: boolean}, {}, {createInProgress: boolean}>(type);

export default function submitForm(cb: Function) {
    return (dispatch: Dispatch<any>, getState: any) => {
        let formValues = getState().form[blogCreateComponentFormName].values;
        console.log(formValues);

        dispatch(asyncActions.started({confirmLoading: true}));

        setTimeout(() => {
            dispatch(asyncActions.done({ params: {confirmLoading: false}, result: {createInProgress: false} }));
            cb();
        }, 500);
    }
}