import {injectAsyncReducer} from '../../config/store';
import CounterReducer from './DemoForm.reducer';

export default (store: any): any => import('./DemoForm.container').then((component) => {
    injectAsyncReducer(store, 'counter', CounterReducer);
    return component;
});