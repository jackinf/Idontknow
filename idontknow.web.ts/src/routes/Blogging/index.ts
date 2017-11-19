import {injectAsyncReducer} from '../../config/store';
import BloggingReducer from './Blogging.reducer';

export const REDUCER_KEY__BLOGGING = "blogging";

export default (store: any): any => import('./Blogging.container').then((component) => {
    injectAsyncReducer(store, REDUCER_KEY__BLOGGING, BloggingReducer);
    return component;
});