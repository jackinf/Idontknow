import {injectAsyncReducer} from '../../config/store';
import DemoTableReducer from './DemoTable.reducer';

export const REDUCER_KEY__DEMO_TABLE = "demo_table";

export default (store: any): any => import('./DemoTable.container').then((component) => {
    injectAsyncReducer(store, REDUCER_KEY__DEMO_TABLE, DemoTableReducer);
    return component;
});