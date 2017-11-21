import {Action} from 'redux';
import {isType} from 'typescript-fsa';
import {submitFormAsyncActions} from './actions/DemoForm.submit';

export interface DemoFormState {
    type: string;
    haha: string;
}
const defaultDemoFormState = {type: "", haha: "no data"};

export default (state: DemoFormState = defaultDemoFormState, action: Action): DemoFormState => {
    if (isType(action, submitFormAsyncActions.started)) {
        return {type: action.type, haha: action.payload.foo};
    }

    if (isType(action, submitFormAsyncActions.done)) {
        return {type: action.type, haha: action.payload.params.foo + action.payload.result.bar};
    }

    if (isType(action, submitFormAsyncActions.failed)) {
        return {type: action.type, haha: action.payload.params.foo + action.payload.error.code};
    }

    return {type: "", haha: state.haha};
}