import actionCreatorFactory from 'typescript-fsa';
import {Dispatch} from "redux";
import {initialize} from "redux-form";
import {blogEditComponentFormName} from "../../components/Edit/Blogging.edit.component";

const actionCreator = actionCreatorFactory();
const type = "BLOGGING/EDIT/START";
export const asyncActions = actionCreator.async<{confirmLoading: boolean}, {id: number}, {}>(type);

export default function submitForm(cb: Function) {
    return (dispatch: Dispatch<any>, getState: any) => {
        dispatch(asyncActions.started({confirmLoading: true}));

        initialize(blogEditComponentFormName, {});

        setTimeout(() => {
            dispatch(asyncActions.done({ params: {confirmLoading: false}, result: {id: 999} }));
            cb();
        }, 500);
    }
}