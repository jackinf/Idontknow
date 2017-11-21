import actionCreatorFactory from 'typescript-fsa';
import {Dispatch} from "redux";
import {SimpleDemoFormName} from "../DemoForm.component";

const actionCreator = actionCreatorFactory();
const type = "DEMO_FORM/FORM_SUBMITTED";
export const submitFormAsyncActions =
    actionCreator.async<{foo: string},   // parameter type
        {bar: string},   // success type
        {code: number}   // error type
        >(type);

export default function submitForm() {
    return (dispatch: Dispatch<any>, getState: any) => {
        const state = getState();
        let formValues = state.form[SimpleDemoFormName].values;

        const startedParams = {foo: formValues.foo || "foo"};
        dispatch(submitFormAsyncActions.started(startedParams));

        setTimeout(() => {

            const result = {bar: formValues.test || "bar"};
            dispatch(submitFormAsyncActions.done({ params: startedParams, result }));

        }, 500);
    }
}