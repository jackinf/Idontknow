import {injectAsyncReducer} from '../../config/store';
import DemoFormReducer from './DemoForm.reducer';

export const REDUCER_KEY__DEMO_FORM = "demo_form";
export default (store: any): any => import('./DemoForm.container').then((component) => {
    injectAsyncReducer(store, REDUCER_KEY__DEMO_FORM, DemoFormReducer);
    return component;
});